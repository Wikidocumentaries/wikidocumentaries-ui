<template>
    <div class="images-component">
        <div class="toolbar">
            <h1 class="header-title">{{ title }}</h1>
        </div>
        <div class="facets">
            <div class="facet" v-for="property in Object.keys(facetValues)" :key="property">
                <h2 v-if="facetValues[property].length">{{ labels[property.split(":")[1]] || property }}</h2>
                <div class="value-list">
                    <button
                        v-for="value in facetValues[property]"
                        :key="value.objectValue"
                        :class="isFilterActive(property, value.objectValue) ? 'selected' : ''"
                        @click="chooseValue(property, value.objectValue)">
                        <div class="label">{{ value.label || value.objectValue || "-" }}</div>
                        <div class="count">&nbsp;{{ value.count }}</div>
                    </button>
                </div>
            </div>
        </div>
        <div class="intro">
             <div v-if="status === 'LOADING'">Searching for images...</div>
             <div v-if="status === 'SUCCESS' && !results.length">No images with matching depiction statements found in {{useSDC ? "Structured Data on Commons" : "Wikidata" }}.</div>
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

const prefixes =
    `
PREFIX schema: <http://schema.org/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    `.trim().split("\n");

function buildQuery({ topicItem, useSDC, selectVars, filterTriples, optionalStatements, modifiers }) {
    // ?image refers to the URL that can be fetched and rendered
    // ?file refers to what is filtered
    // ?item refers to what is depicted
    let imageFileAndItemTriples;
    if (useSDC) {
        imageFileAndItemTriples =
            `
?file a schema:ImageObject .
?file schema:url ?image .

# depicts | exhibition history
?file (wdt:P180|wdt:P608) ?item .
            `.trim().split("\n");
    } else {
        imageFileAndItemTriples =
            `
# what is depicted and what is filtered are the same in Wikidata
BIND(?item AS ?file)

?file (wdt:P18) ?image . # image XXX: alternative properties
            `.trim().split("\n");
    }
    return `
${prefixes.join("\n")}

SELECT ${selectVars.join(" ")} {

    ${imageFileAndItemTriples.join("\n    ")}

    ${useSDC ? 'SERVICE <https://qlever.cs.uni-freiburg.de/api/wikidata> ' : ''}{
        {
            VALUES ?item { ${topicItem} }
        }
        UNION
        {
            ?item wdt:P171+ ${topicItem} . # parent taxon
        }
        UNION
        {
            # depicts | exhibition history | discovery location
            ?item (wdt:P180|wdt:P608|wdt:P189) ${topicItem} .
        }
    }

    ${filterTriples.join("\n    ")}

    ${optionalStatements.join("\n    ")}
}
${modifiers.join("\n")}
    `.trim();
}

function buildFacetQuery(topicItem, useSDC, filterTriples, facetProperty) {
    return buildQuery({
        useSDC: useSDC,
        topicItem: topicItem,
        selectVars: [
            "?objectValue",
            "(SAMPLE(?label_) AS ?label)",
            "(COUNT(DISTINCT ?image) AS ?count)"
        ],
        filterTriples: filterTriples,
        optionalStatements:
            `
OPTIONAL {
    ?file ${facetProperty} ?objectValue .
    OPTIONAL {
        ?objectValue rdfs:label ?label_ .
        FILTER (LANG(?label_) = "en") .
    }
}
            `.trim().split("\n"),
        modifiers: [
            "GROUP BY ?objectValue",
            "ORDER BY DESC(?count)",
            "LIMIT 20"
        ]
    });
}

function buildImageQuery(topicItem, useSDC, filterTriples) {
    return buildQuery({
        useSDC: useSDC,
        topicItem: topicItem,
        selectVars: [
            "?file",
            "?image",
            "?caption",
            "(MAX(?commonsQualityAssessment) AS ?quality_)"
        ],
        filterTriples: filterTriples,
        optionalStatements: [
            "OPTIONAL { ?file wdt:P6731 ?commonsQualityAssessment . }",
            ...`
OPTIONAL {
    ?file schema:caption ?caption .
    FILTER (LANG(?caption) = "en") .
}
            `.trim().split("\n")
        ],
        modifiers: [
            "GROUP BY ?file ?image ?caption",
            "ORDER BY DESC(?quality_)",
            "LIMIT 200"
        ]
    });
}

const defaultFacets = [
    'wdt:P6731', // Commons quality assessment
    'wdt:P180', // depicts
    'wdt:P195' // collection
];

export default {
    name: 'DepictingImages',
    props: {
        topic: String,
        title: {
            type: String,
            default: "Depictions from Wikimedia Commons"
        },
        facets: {
            type: Array,
            default: () => defaultFacets
        },
        useSDC: {
            type: Boolean,
            default: true,
        }
    },
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
                P6731: "Assessment",
                P170: "Creator",
                P189: "Location of discovery",
                P127: "Owned by",
                encodingFormat: "File format",
                P31: "Type",
                P276: "Current location",
                P186: "Material",
                P366: "Use"
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

        isFilterActive(property, objectValue) {
            // XXX at this point we don't know if objectValue is url or literal
            const url = "wd:" + objectValue;
            const literal = JSON.stringify(objectValue);
            return this.filters.find((item) => (
                item.property === property && (
                    item.value === url || item.value === literal
                )
            ));
        },

        chooseValue(property, facetValue) {
            const clear =
                !facetValue || this.isFilterActive(property, facetValue);
            this.filters = this.filters.filter((item) => item.property !== property);
            if (!clear) {
                const filter = {
                    property: property,
                    value: facetValue.match(/^Q[0-9]+$/)
                        ? 'wd:' + facetValue
                        : JSON.stringify(facetValue)
                };
                this.filters = [ ...this.filters, filter ]
            }

            Object.keys(this.facetValues).forEach((property) => this.fetchPossibleValues(property));
            this.fetchImages();
        },

        fetchSparql({facetProperty: facetProperty, backoff: backoff = 0} = {}) {
            const topicItem =
                  "wd:" + this.topic;
            const filterTriples = this.filters
                .filter(filter => filter.property !== facetProperty)
                .map(({property, value}) => `?file ${property} ${value} .`);
            let sparql;
            if (facetProperty) {
                // Build a query for the values of the given facet property
                sparql = buildFacetQuery(topicItem, this.useSDC, filterTriples, facetProperty);
            } else {
                // Build a query to fetch the result images
                sparql = buildImageQuery(topicItem, this.useSDC, filterTriples);
            }

            const [url, body] = wdk.sparqlQuery(sparql).split("?");

            return axios.post(
                this.useSDC
                    ? "https://qlever.cs.uni-freiburg.de/api/wikimedia-commons"
                    : "https://query.wikidata.org/sparql",
                body
            ).catch(error => {
                if (error.response && (error.response.status === 429 || error.response.status === 400)) {
                    // Too many requests - sleep a while and retry
                    const delay = (Math.random() * this.facets.length + 1) * 1000 * 2 ** backoff;
                    console.log(`Retrying in ${ delay / 1000 } seconds`);
                    setTimeout(() => this.fetchSparql({ facetProperty, backoff: backoff + 1 }), delay);
                }
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
            this.fetchSparql({ facetProperty: property }).then(response => {
                const values = wdk.simplify.sparqlResults(response.data);
                const nonEmptyValues = values
                      .filter(value => value.objectValue);

                // Merge unknown and missing values
                const emptyCount = values
                      .filter(value => !value.objectValue)
                      .map(value => value.count)
                      .reduce(((a, b) => -(-a) + -(-b)), 0);

                // Create an empty value only if we got some
                const emptyValueOrNothing = !emptyCount ? [] : [{
                    objectValue: undefined,
                    label: undefined,
                    count: emptyCount
                }];

                const cleanedUpValues = [
                    ...emptyValueOrNothing,
                    ...nonEmptyValues
                ];

                // Don't create a new entry if we only got empty values
                if (this.facetValues[property] || nonEmptyValues.length) {
                    this.facetValues = {
                        ...this.facetValues,
                        [property]: cleanedUpValues
                    };
                    console.log(property, JSON.parse(JSON.stringify(this.facetValues[property])));
                } else {
                    console.log(property, "- didn't create an empty facet");
                }
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
                    id: result.image,
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
        this.facets.forEach((facet, i) => {
            setTimeout(() => this.fetchPossibleValues(facet), (i+1) * 1000);
        });
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

/* Less padding between the facets shadow and the image grid */
.intro {
    padding-bottom: 8px;
}

.facets {
    display: flex;
    flex-direction: row;
    padding: 0 10px 0px 10px;
    gap: 1em;
    box-shadow: var(--main-shadow);
    position: relative;
}

/* Hide the the box shadow of the top edge */
.facets:before {
    content: "";
    display: block;
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    background: white;
    height: 6px;
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

.facet .value-list {
    scrollbar-color: var(--main-red) transparent;
    scrollbar-width: 7px;
    -webkit-overflow-scrolling: auto;
}

::-webkit-scrollbar {
    -webkit-appearance: none;
}

::-webkit-scrollbar:vertical {
    width: 7px;
}

::-webkit-scrollbar:horizontal {
    height: 7px;
}

::-webkit-scrollbar-thumb {
    background-color: var(--main-red);
    border-radius: 7px;
}

::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 7px;
}

</style>
