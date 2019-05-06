<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.Depicted.headerTitle') }}</div>
						<DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.Depicted.sortMenu.tooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Depicted.sortMenu.title') }}</div>
            </ToolbarMenu>
        </div>
        <div class="intro">{{ $t('topic_page.Depicted.intro') }}</div>
        <div v-if="gallery" class="gallery">
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.depicted.value)" class="gallery-item">
                <img :src="getImageLink(item.image)" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="gallery-title">{{ item.depicted.label }}</div>
                    <div class="thumb-credit">{{ item.creatorLabel }} {{ item.time }} </div>
                </div>
            </router-link>
        </div>
        <div v-else class="list">
            <div v-for="item in results" :key="item.id" class="listrow">
            <a :href="getItemURL(item.depicted.value)" >
            <b>{{ item.depicted.label }}</b> {{ item.typeLabel }} {{ item.time}}
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
const DEFAULT_SORT = ["depicted.label"];

let fullResults, currentSort, currentDisplay;

export default {
    name: 'Depicted',
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
	              text: 'topic_page.Depicted.sortMenuOptionAlpha'
	          },
            {
                id: SORT_ACTIONS.BY_TIME,
                text: 'topic_page.Depicted.sortMenuOptionTime'
            },
            {
                id: SORT_ACTIONS.SORT_REVERSE,
                text: 'topic_page.Depicted.sortMenuOptionRev'
            },
            {
                id: SORT_ACTIONS.SORT_CLEAR,
                text: 'topic_page.Depicted.sortMenuOptionClear'
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
SELECT ?depicted ?depictedLabel (GROUP_CONCAT(DISTINCT ?creatorLabel; separator=", ") as ?creatorLabel) (sample(?image) as ?image) (GROUP_CONCAT(DISTINCT ?time; separator="/") AS ?time) (GROUP_CONCAT(DISTINCT ?typeLabel; separator=", ") as ?typeLabel) WHERE {
  {
      {
        ?depicted wdt:P180|wdt:P921|wdt:P1740|wdt:P915|wdt:P840 wd:Q72 .
      }
      UNION
      {
        wd:Q72 wdt:P1343 ?depicted .
      }
    }
    OPTIONAL { ?pi wdt:P1647* wd:P170 .
              ?pi wikibase:directClaim ?p .
              ?depicted ?p ?creator. 
              ?creator rdfs:label ?creatorLabel .
              FILTER(LANG(?creatorLabel)="fi") }
    OPTIONAL { ?depicted wdt:P18 ?image. }
    OPTIONAL { ?depicted wdt:P31 ?type.  
             ?type rdfs:label ?typeLabel .
              FILTER(LANG(?typeLabel)="fi") }
    OPTIONAL { ?depicted wdt:P571 ?creation_date. }
    OPTIONAL { ?depicted wdt:P577 ?publishing_date. }
		BIND(STR(YEAR(COALESCE(?creation_date, ?publishing_date))) AS ?time)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,it,es,no,et,nl,ru,ca,se,sms". }
}
GROUP BY ?depicted ?depictedLabel
LIMIT 1000
        `.replace(/Q72/g, this.$store.state.wikidocumentaries.wikidataId)
        .replace(/fi/g, this.$i18n.locale);
        const [url, body] = wdk.sparqlQuery(sparql).split('?');
        axios
            .post(url, body)
            .then(response => {
							fullResults = wdk.simplify.sparqlResults(response.data);
							this.results = selectResults(this.$i18n.locale);
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
								currentSort = ["depicted.label"];
	              break;
            case SORT_ACTIONS.BY_TIME:
								currentSort = ["time"];
                break;
            case SORT_ACTIONS.SORT_REVERSE:
								if (currentSort[0].charAt(0)=='-') currentSort[0]=currentSort[0].substr(1);
								else currentSort[0] = '-' + currentSort[0];
                break;
            case SORT_ACTIONS.SORT_CLEAR:
								currentSort = DEFAULT_SORT.slice();
                break;
            }
						this.results = selectResults(this.$i18n.locale);
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
					this.results = selectResults(this.$i18n.locale);
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
        },
        getImageLink(value) {
            return value.replace(/\s/g, _) + '?width=500';
        }
    }
}

const selectResults = (lcl) => {
	let filteredResults = fullResults;
	if (currentSort[0].includes("time")) filteredResults = filteredResults.filter(x => x.time);
	if (currentDisplay === DISPLAY_ACTIONS.GALLERY) {
		if (filteredResults.find(x => x.image)) { // If GALLERY and at least one image
			filteredResults = filteredResults.filter(x => x.image); // select only results with an image
		} else {
			currentDisplay = DISPLAY_ACTIONS.LIST; // GALLERY with no images => change to LIST
		}
	}
	return filteredResults.sort(sortResults(currentSort, lcl)).slice(0,MAX_ITEMS_TO_VIEW);
}

</script>

<style scoped>

</style>
