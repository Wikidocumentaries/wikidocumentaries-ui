<template>
    <div class="images-component">
        <div class="toolbar">
            <h1 class="header-title">Depictions from Wikimedia Commons</h1>
        </div>
        <div class="facets">
            <div class="facet" v-for="property in Object.keys(facetValues)" :key="property">
                <h2 v-if="facetValues[property].length">{{ labels[property.split(":")[1]] }}</h2>
                <div class="value-list">
                    <button
                        v-for="value in facetValues[property]"
                        :key="value.objectValue"
                        :class="filters.find(item => item.property === property && item.value === 'wd:'+value.objectValue) ? 'selected' : ''"
                        @click="chooseValue(property, value.objectValue)">
                        <div class="label">{{ value.label || value.objectValue || "-" }}</div>
                        <div class="count">&nbsp;{{ value.count }}</div>
                    </button>
                </div>
            </div>
        </div>
        <div class="intro">
             <div v-if="status === 'LOADING'">Searching for images...</div>
             <div v-if="status === 'SUCCESS' && !results.length">No images with matching depiction statements found in Structured Data on Commons.</div>
             <div v-if="status === 'ERROR'">{{ error }}</div>
        </div>
        <div :class="isExpanded ? 'expanded' : ''" class="imagegrid-container">
            <ImageGrid v-if="results.length" class="image-grid" :items="results" @showItemGeolocation="showImageOnMap" />
            <div v-if="results.length" class="haze">
                <div class="toolbar-item block">
                    <a @click="isExpanded = !isExpanded" class="toolbar-item-a">
                        <i
                            class="wikiglyph"
                            :class="isExpanded ? 'wikiglyph-caret-up' : 'wikiglyph-caret-down'"
                            />
                    </a>
                    <span v-if="!isExpanded" class="tooltip">{{ $t('general.expand') }}</span>
                    <span v-else class="tooltip">{{ $t('general.collapse') }}</span>
                </div>
            </div>
        </div>
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
            status: "LOADING",
            error: "",
            facetValues: {},
            filters: [],
            labels: {
                P180: "Depicts",
                P195: "Collection",
                P6731: "Assessment"
            },
            isExpanded: false
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
        OPTIONAL {
            ?objectValue rdfs:label ?label_ .
            FILTER (LANG(?label_) = "en") .
        }
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
    OPTIONAL {
        ?file wdt:P180 ?objectValue .
        OPTIONAL {
            ?objectValue rdfs:label ?label_ .
            FILTER (LANG(?label_) = "en") .
        }
    }
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
        OPTIONAL {
            ?objectValue rdfs:label ?label_ .
            FILTER (LANG(?label_) = "en") .
        }
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

            return axios.post(
                "https://qlever.cs.uni-freiburg.de/api/wikimedia-commons",
                body
            ).catch(error => {
                if (error.response) {
                    const data = error.response.data;
                    try {
                        console.error(
                            data.exception,
                            `\n\nLine ${data.metadata.line}, column ${data.metadata.positionInLine}`,
                            `\n\n${data.metadata.query}`
                        );
                    } catch(_error2) {
                        console.error(error.response.data);
                    }
                }
                throw error;
            });
        },

        fetchPossibleValues(property) {
            this.fetchSparql({ property: property }).then(response => {
                this.facetValues = { ...this.facetValues,
                    [property]: wdk.simplify.sparqlResults(response.data)
                };
            }).catch(error => {
                console.error(error);
                this.facetValues = {
                    ...this.facetValues,
                    [property]: [{ objectValue: null, label: "Query failed" }]
                };
            });
        },

        fetchImages() {
            this.fetchSparql().then(response => {
                this.status = "SUCCESS";
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
                console.log("SDC images", this.results)
            }).catch(error => {
                console.error(error);
                this.status = "ERROR";
                this.error = "Failed to fetch search results."
                this.results = [];
            });
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

.imagegrid-container {
    position: relative;
}

.image-grid {
    width: 100%;
    max-height: 100vh;
    overflow-y: hidden;
}

.expanded .image-grid {
    max-height: initial;
}

.expanded .haze {
    position: initial;
}

.thumb-image-glyph {
    color: white;
}

.intro {
    padding: 0 20px 10px 20px;
}

.facets {
    display: flex;
    flex-direction: row;
    padding: 0 10px 0px 10px;
    gap: 1em;
}
.facet {
    flex-shrink: 0;
    min-width: auto;
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
    max-height: 30vh;
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
    max-width: 30vw;
}

.facet button.selected, .facet button:hover { 
    background: var(--main-red);
    color: white; 
}

.facet button.selected:hover {
    background:#333;
}

.facet button .label {
    flex-grow: 1;
    text-align: left;
}
.facet button .count {
    padding-left: 2px;
}
</style>
