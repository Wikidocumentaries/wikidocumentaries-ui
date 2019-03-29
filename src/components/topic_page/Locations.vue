<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.Locations.headerTitle') }}</div>
            <DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.Locations.sortMenu.tooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Locations.sortMenu.title') }}</div>
            </ToolbarMenu>
        </div>
        <div v-if="gallery" class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.location.value)" class="gallery-item">
                <img :src="item.image" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ item.location.label }}</div>
                    <div class="thumb-credit">{{ item.location.typeLabel }} {{ item.time}}</div>
                </div>
                <!--div class="thumb-image-header"-->
                <div>
                    <div class="left-align">
                        <!--ImagesActionMenu></ImagesActionMenu-->
                    </div>
                    <div class="right-align">
                        <!--ImagesRemoveMenu></ImagesRemoveMenu-->
                    </div>
                </div>
            </router-link>
        </div>
        <div v-else class="list">
            <div v-for="item in results" :key="item.id" class="listrow">
            <a :href="getItemURL(item.location.value)" >
            <span class="thumb-title">{{ item.location.label }}</span> {{ item.location.label }} {{ item.time}}
            </a>
            </div>
        </div>
	</div>
</div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'
import {sortResults} from '@/common/utils'
import axios from 'axios'
import wdk from 'wikidata-sdk'
import DisplayMenu from '@/components/menu/DisplayMenu'

const SORT_ACTIONS = {
		BY_LABEL: 0,
    BY_TIME: 1,
    SORT_REVERSE: 2,
    SORT_CLEAR: 3
}

const DISPLAY_ACTIONS = {
	GALLERY: 0,
	LIST: 1,
}

const MAX_ITEMS_TO_VIEW = 50;
const DEFAULT_SORT = ["location.label"];

let fullResults, currentSort, currentDisplay;

export default {
    name: 'Locations',
    components: {
        ToolbarMenu,
        DisplayMenu
    },
    data () {
        return {
            results: [],
						gallery: true,
            toolbarActionMenuItems: [
						{
	              id: SORT_ACTIONS.BY_LABEL,
	              text: 'topic_page.Locations.sortMenu.optionAlpha'
	          },
            {
                id: SORT_ACTIONS.BY_TIME,
                text: 'topic_page.Locations.sortMenu.optionTime'
            },
            {
                id: SORT_ACTIONS.SORT_REVERSE,
                text: 'topic_page.Locations.sortMenu.optionRev'
            },
            {
                id: SORT_ACTIONS.SORT_CLEAR,
                text: 'topic_page.Locations.sortMenu.optionClear'
            },
            ],
        };
    },
    mounted() {
				currentSort = DEFAULT_SORT.slice();
				currentDisplay = DISPLAY_ACTIONS.GALLERY;
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements
        let sparql;
        sparql = `
SELECT ?location ?locationLabel (GROUP_CONCAT(?typeLabel; separator=", ") as ?typeLabel) (SAMPLE(?image) AS ?image) (SAMPLE(?address) as ?address) (GROUP_CONCAT(?dated; separator="/") as ?time) (GROUP_CONCAT(?creatorLabel; separator=", ") as ?creatorLabel) WHERE {
  ?pi wdt:P1647* wd:P276 .
  ?pi wikibase:directClaim ?p .
  ?location ?p wd:Q1772186.
  OPTIONAL { ?location wdt:P31 ?type .
            ?type rdfs:label ?typeLabel .
              FILTER(LANG(?typeLabel)="fi") }
  OPTIONAL { ?location wdt:P18 ?image. }
  OPTIONAL { ?location wdt:P6375 ?address. }
  OPTIONAL { ?location wdt:P571 ?date.
           BIND(STR(YEAR(?date)) AS ?dated)}
  OPTIONAL { ?location wdt:P170|wdt:P84 ?creator.
           ?creator rdfs:label ?creatorLabel.
           FILTER(LANG(?creatorLabel)="fi")}
  MINUS { ?location wdt:P31 wd:Q5 .}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru". }
}
GROUP BY ?location ?locationLabel
LIMIT 1000
        `.replace(/Q1772186/g, this.$store.state.wikidocumentaries.wikidataId);
        const [url, body] = wdk.sparqlQuery(sparql).split('?');
        axios
            .post(url, body)
            .then(response => {
							fullResults = wdk.simplify.sparqlResults(response.data);
							this.results = selectResults();
							this.gallery = (currentDisplay === DISPLAY_ACTIONS.GALLERY);
						})
            .catch(error => console.log(error));
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        }
    },
    watch: {
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
							case SORT_ACTIONS.BY_LABEL:
									currentSort = ["location.label"];
	                break;
            	case SORT_ACTIONS.BY_TIME:
									currentSort = ["time", "location.label"];
                	break;
            	case SORT_ACTIONS.SORT_REVERSE:
									if (currentSort[0].charAt(0)=='-') currentSort[0]=currentSort[0].substr(1);
									else currentSort[0] = '-' + currentSort[0];
                	break;
            	case SORT_ACTIONS.SORT_CLEAR:
									currentSort = DEFAULT_SORT.slice();
                	break;
            }
						this.results = selectResults();
        },
				onDisplayChange (menuItem) {
					switch (menuItem.id) {
						case DISPLAY_ACTIONS.GALLERY:
							currentDisplay = DISPLAY_ACTIONS.GALLERY;
							break;
						case DISPLAY_ACTIONS.LIST:
							currentDisplay = DISPLAY_ACTIONS.LIST;
							break;
					}
					this.results = selectResults();
					this.gallery = (currentDisplay === DISPLAY_ACTIONS.GALLERY);
				},
        fitTitle (title) {
            var newTitle = title;
            return newTitle;
        },
        // getCredits (item) {
        //     var newAuthors = (item.authors != "" ? (item.authors + ', ') : '');
        //     var newYear = (item.year != "" ? (item.year) + ". " : '');
        //     var newInstitutions = (item.institutions != "" ? (item.institutions + ', ') : '');
        //     var newLicense = (item.license != "" ? (item.license + ', ') : '');

        //     var credits = newAuthors + newYear + newInstitutions + newLicense;

        //     if (credits.length > 0 && credits.slice(-2) == ", ") {
        //         credits = credits.substr(0, credits.length - 2);
        //     }

        //     return credits;
        // },
        navigate(target) {
            this.$router.push({ target });
        },
        getItemURL(value) {
            return "/" + value + "?language=" + this.$i18n.locale;
        }
    }
}

const selectResults = () => {
	let filteredResults = fullResults;
	if (currentSort[0].includes("time")) filteredResults = filteredResults.filter(x => x.time);
	if (currentDisplay === DISPLAY_ACTIONS.GALLERY) {
		if (filteredResults.find(x => x.image)) { // If GALLERY and at least one image
			filteredResults = filteredResults.filter(x => x.image); // select only results with an image
		} else {
			currentDisplay = DISPLAY_ACTIONS.LIST; // GALLERY with no images => change to LIST
		}
	}
	return filteredResults.sort(sortResults(currentSort)).slice(0,MAX_ITEMS_TO_VIEW);
}

</script>

<style scoped>

.thumb-title {
    font-family: barlow condensed;
    text-transform: uppercase;
    font-size: 1.2em;
    padding-bottom: 2px;
}

.noimage {
    background: var(--main-modal-color);
    height: 35vh;
    width: 150px;
}

.list {
    columns: 300px 3;
}

.listrow {
    margin-left:20px;
}

</style>
