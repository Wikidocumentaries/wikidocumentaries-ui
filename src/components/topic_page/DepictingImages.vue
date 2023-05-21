<template>
    <div v-if="results.length" class="images-component">
        <div class="toolbar">
            <h1 class="header-title">Depictions from Wikimedia Commons</h1>
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
	    results: []
        };
    },
    methods: {
        showImageOnMap(image) {
            //console.log("showImageOnMap", image);
            this.$store.commit('setImagesShownOnMap', [image]);
            this.$emit('showImagesOnMap');
        },
    },
    mounted() {
	let sparql;
	sparql = `
PREFIX schema: <http://schema.org/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
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
    { ?file wdt:P6731 ?commonsQualityAssessment . }
    OPTIONAL {
        ?file schema:caption ?caption.
        FILTER (LANG(?caption) = "en") .
    }
}
GROUP BY ?file ?image ?caption
ORDER BY DESC(?quality_)
LIMIT 4
        `.replace(/Q42/g, this.$store.state.wikidocumentaries.wikidataId)
	const [url, body] = wdk.sparqlQuery(sparql).split("?");
	axios
	    .post("https://qlever.cs.uni-freiburg.de/api/wikimedia-commons", body)
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
</style>
