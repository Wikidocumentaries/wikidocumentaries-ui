<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.Works.headerTitle') }}</div>
						<DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.Works.sortMenuTooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Works.sortMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="intro">{{ $t('topic_page.Works.intro') }}</div>
        <div v-if="gallery" class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.work.value)" class="gallery-item">
                <img :src="getImageLink(item.image)" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-credit over">{{ item.relation }}</div>
                    <div class="gallery-title">{{ item.work.label }}</div>
                    <div class="thumb-credit">{{ item.typeLabel }} {{ item.time }} {{ item.copyrightLabel}}</div>
                </div>
            </router-link>
        </div>
        <div v-else class="list">
            <div v-for="item in results" :key="item.id" class="listrow">
            <a :href="getItemURL(item.work.value)" >
            <span v-if="item.relation">{{ item.relation }} </span><b>{{ item.work.label }}</b> {{ item.typeLabel }} {{ item.time}} {{ item.copyrightLabel}}
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
    // SORT_DIST: 2,
    SORT_REVERSE: 3,
    SORT_CLEAR: 4
}

const DISPLAY_ACTIONS = {
	GALLERY: 0,
	LIST: 1,
}

const MAX_ITEMS_TO_VIEW = 50;
const DEFAULT_SORT = ["work.label"];

let fullResults, currentSort, currentDisplay;

export default {
    name: 'Works',
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
	              text: 'topic_page.Works.sortMenuOptionAlpha'
	          },
            {
                id: SORT_ACTIONS.BY_TIME,
                text: 'topic_page.Works.sortMenuOptionTime'
            },
            // {
            //     id: SORT_ACTIONS.SORT_DIST,
            //     text: 'topic_page.Works.sortMenuOptionDist'
            // },
            {
                id: SORT_ACTIONS.SORT_REVERSE,
                text: "menus.sortMenu.optionRev"
            },
            {
                id: SORT_ACTIONS.SORT_CLEAR,
                text: 'topic_page.Works.sortMenuOptionClear'
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
SELECT ?work ?workLabel (GROUP_CONCAT(DISTINCT ?piLabel; separator=", ") AS ?relation) (SAMPLE(?image) as ?image) (GROUP_CONCAT(DISTINCT ?time_; separator="/") as ?time) (GROUP_CONCAT(DISTINCT ?typeLabel_; SEPARATOR=", ") as ?typeLabel) (GROUP_CONCAT(?collectionLabel_) as ?collectionLabel) (SAMPLE(?copyrightLabel) as ?copyrightLabel) (SAMPLE(?publisherLabel) as ?publisherLabel) (SAMPLE(?coordinates) as ?coordinates) (GROUP_CONCAT(?address_) as ?address) (GROUP_CONCAT(DISTINCT ?municipalityLabel_) as ?municipalityLabel) WHERE {
{
  {
    ?work ?p wd:Q216904.
    ?pi wdt:P1647* wd:P170 .
    ?pi wikibase:directClaim ?p .
    ?pi rdfs:label ?piLabel .
   }
  UNION
  { wd:Q216904 wdt:P800 ?work .
    }
  }
  FILTER(LANG(?piLabel)="fi") .
    OPTIONAL { ?work wdt:P18 ?image. }
    OPTIONAL { ?work wdt:P31 ?type. 
             ?type rdfs:label ?typeLabel_ .
              FILTER(LANG(?typeLabel_)="fi") }
    OPTIONAL { ?work wdt:P195 ?collection. 
             ?collection rdfs:label ?collectionLabel_ .
              FILTER(LANG(?collectionLabel_)="fi") }
    OPTIONAL { ?work wdt:P571 ?creation_date. }
    OPTIONAL { ?work wdt:P577 ?publishing_date. }
    OPTIONAL { ?work wdt:P6216 ?copyright.
             ?copyright rdfs:label ?copyrightLabel .
              FILTER(LANG(?copyrightLabel)="fi") }
    OPTIONAL { ?work wdt:P123 ?publisher. 
             ?publisher rdfs:label ?publisherLabel .
              FILTER(LANG(?publisherLabel)="fi") }
    OPTIONAL { ?work wdt:P625 ?coordinates. }
    OPTIONAL { ?work wdt:P6375 ?address_. }
    OPTIONAL { ?work wdt:P131* ?municipality.
              ?municipality (wdt:P31/wdt:P279) wd:Q13221722. 
              ?municipality rdfs:label ?municipalityLabel_ .
              FILTER(LANG(?municipalityLabel)="fi") }
		BIND(STR(YEAR(COALESCE(?creation_date, ?publishing_date))) AS ?time_)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,it,es,no,et,nl,ru,ca,se,sms". }
}
GROUP BY ?work ?workLabel
LIMIT 1000
        `.replace(/Q216904/g, this.$store.state.wikidocumentaries.wikidataId)
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
								currentSort = ["work.label"];
	              break;
            case SORT_ACTIONS.BY_TIME:
								currentSort = ["time", "work.label"];
                break;
            // case SORT_ACTIONS.SORT_DIST:
            //     break;
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
