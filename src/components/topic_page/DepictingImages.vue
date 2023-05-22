<template>
    <div v-if="results.length" class="images-component">
        <div class="toolbar">
            <h1 class="header-title">Depictions from Wikimedia Commons</h1>
        </div>
        <div class="facets">
            <div class="facet" v-for="property in Object.keys(facetValues)" :key="property">
                <h2>{{ property.split(":")[1] }}</h2>
                <div class="value-list">
                    <button
                        v-for="value in facetValues[property]"
                        :key="value.objectValue"
                        :class="filters.find(item => item.property === property && item.value === 'wd:'+value.objectValue) ? 'selected' : ''"
                        @click="chooseValue(property, value.objectValue)">
                        <div class="label">{{ value.label }}</div>
                        <div class="count">{{ value.count }}</div>
                    </button>
                </div>
            </div>
        </div>
        <ImageGrid class="image-grid" :items="results" @showItemGeolocation="showImageOnMap">
        </ImageGrid>
    </div>
</template>

<script>
import axios from "axios";
import wdk from "wikidata-sdk";

import ImageGrid from '@/components/ImageGrid'

export default {
    name: 'DepictingImages',
    data () {
	return {
            results: [],
            facetValues: {},
            filters: []
        };
    },
    methods: {
        showImageOnMap(image) {
            //console.log("showImageOnMap", image);
            this.$store.commit('setImagesShownOnMap', [image]);
            this.$emit('showImagesOnMap');
        },
        chooseValue(property, facetValue) {
	    const clear = !facetValue || this.filters.find((item) =>
		item.property === property && item.value === 'wd:' + facetValue
	    );
	    this.filters = this.filters.filter((item) => item.property !== property);
	    if (!clear) {
		this.filters = [ ...this.filters, {
		    property: property,
		    value: 'wd:' + facetValue
		}];
	    }

	    Object.keys(this.facetValues).forEach((property) => this.fetchPossibleValues(property));
	    this.fetchImages();
        },
        fetchSparql({property: property} = {}) {
	    const filterTriples = this.filters
		.filter(filter => filter.property !== property)
		.map(({property, value}) => `?file ${property} ${value} .`)
		.join("\n");
	    const prefixes = `
PREFIX schema: <http://schema.org/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            `
	    let sparql;
	    if (property === "wdt:P6731") {
		sparql = `
${prefixes}
SELECT ?objectValue (SAMPLE(?label_) AS ?label) (COUNT(DISTINCT ?file) AS ?count) {
    ?file a schema:ImageObject .
    ?file schema:url ?image .
    ?file wdt:P180 ?item .
    SERVICE <https://qlever.cs.uni-freiburg.de/api/wikidata> {
        {
            VALUES ?item { wd:Q42 }
        }
        UNION
        {
            ?item wdt:P171+ wd:Q42 . # parent taxon
        }
    }
    ${filterTriples}
    OPTIONAL {
	?file wdt:P6731 ?objectValue .
        ?objectValue rdfs:label ?label_ .
        FILTER (LANG(?label_) = "en") .
    }
}
GROUP BY ?objectValue
ORDER BY DESC(?count)
                `;
            } else if(property === "wdt:P180") {
                sparql = `
${prefixes}
SELECT ?objectValue (SAMPLE(?label_) AS ?label) (COUNT(DISTINCT ?file) AS ?count) {
    ?file a schema:ImageObject .
    ?file schema:url ?image .
    ?file wdt:P180 ?item .
    SERVICE <https://qlever.cs.uni-freiburg.de/api/wikidata> {
        {
            VALUES ?item { wd:Q42 }
        }
        UNION
        {
            ?item wdt:P171+ wd:Q42 . # parent taxon
        }
    }
    ${filterTriples}
#    OPTIONAL {
#	?file wdt:P180 ?objectValue .
        BIND(?item AS ?objectValue) .
        ?objectValue rdfs:label ?label_ .
        FILTER (LANG(?label_) = "en") .
#    }
}
GROUP BY ?objectValue
ORDER BY DESC(?count)
LIMIT 20
                `;
	    } else if (property) {
                sparql = `
${prefixes}
SELECT ?objectValue (SAMPLE(?label_) AS ?label) (COUNT(DISTINCT ?file) AS ?count) {
    ?file a schema:ImageObject .
    ?file schema:url ?image .
    ?file wdt:P180 ?item .
    SERVICE <https://qlever.cs.uni-freiburg.de/api/wikidata> {
        {
            VALUES ?item { wd:Q42 }
        }
        UNION
        {
            ?item wdt:P171+ wd:Q42 . # parent taxon
        }
    }
    ${filterTriples}
    OPTIONAL {
        ?file wdt:P195 ?objectValue .
        ?objectValue rdfs:label ?label_ .
        FILTER (LANG(?label_) = "en") .
    }
}
GROUP BY ?objectValue
ORDER BY DESC(?count)
LIMIT 20
                `.replace(/wdt:P195/g, property);
            } else {
	        sparql = `
${prefixes}
SELECT ?file ?image ?caption (SAMPLE(?commonsQualityAssessment) AS ?quality_) {
    ?file a schema:ImageObject .
    ?file schema:url ?image .
    ?file wdt:P180 ?item .
    SERVICE <https://qlever.cs.uni-freiburg.de/api/wikidata> {
        {
            VALUES ?item { wd:Q42 }
        }
        UNION
        {
            ?item wdt:P171+ wd:Q42 . # parent taxon
        }
    }
    ${filterTriples}
    OPTIONAL { ?file wdt:P6731 ?commonsQualityAssessment . }
    OPTIONAL {
        ?file schema:caption ?caption.
        FILTER (LANG(?caption) = "en") .
    }
}
GROUP BY ?file ?image ?caption
ORDER BY DESC(?quality_)
LIMIT 200
                `;
	    }
	    sparql = sparql
		.replace(/Q42/g, this.$store.state.wikidocumentaries.wikidataId)
	    const [url, body] = wdk.sparqlQuery(sparql).split("?");
	    return axios
		.post("https://qlever.cs.uni-freiburg.de/api/wikimedia-commons", body);
	},
	fetchPossibleValues(property) {
	    this.fetchSparql({ property: property }).then(response => {
		this.facetValues = { ...this.facetValues,
		    [property]: wdk.simplify.sparqlResults(response.data)
		};
	    });
	},
	fetchImages() {
	    this.fetchSparql()
	    .then(response => {
		const results = wdk.simplify.sparqlResults(response.data);
		this.results = results.map((result => ({
		    id: result.file,
		    infoURL: result.file,
		    imageURL: result.image,
		    thumbURL: result.image+"?width=500",
		    title: result.caption ? [ result.caption ] : undefined,
		    source: "Wikimedia Commons",
		    institutions: "",
		    license: "",
		    creators: "",
		    geoLocations: [],
		})));
		console.log(this.results)
	    })
	    .catch(error => console.log(error));
	},
    },
    mounted() {
	this.fetchPossibleValues('wdt:P6731');
	this.fetchPossibleValues('wdt:P180');
	this.fetchPossibleValues('wdt:P195');
	this.fetchImages();
    },
    components: {
        ImageGrid
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.image-grid {
    width: 100%;
}
.thumb-image-glyph {
    color: white;
}
.facets {
    display: flex;
    flex-direction: row;
    max-height: 30vh;
    padding: 0 10px 10px 10px;
}
.facet {
    width: 30%;
    max-height: 100%;
}
.facet h2 {
    padding-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.1em;
}
.facet .value-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 100%;
}
.facet button {
    display: flex;
    align-items: center;
    background: white;
    color: black;
    border: none;
    border-radius: 1em;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 0.25em;
}
.facet button:hover { background: pink; }
.facet button.selected { background: red; }
.facet button .label {
    flex-grow: 1;
    text-align: left;
}
.facet button .count {
    padding-left: 2px;
}
</style>
