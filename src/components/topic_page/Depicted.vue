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
        <div v-if="gallery" class="gallery">
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.depicted.value)" class="gallery-item">
                <img :src="item.image" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ item.depicted.label }}</div>
                    <div class="thumb-credit">{{ item.type.label }} {{ item.time }} </div>
                </div>
                <div class="thumb-image-header">
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
            <a :href="getItemURL(item.depicted.value)" >
            <b>{{ item.depicted.label }} {{ item.time }}</b>
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
SELECT ?depicted ?depictedLabel ?image ?time ?desc_url ?type ?typeLabel ?collection ?copyrightLabel ?publisherLabel WHERE {
    ?depicted wdt:P180|wdt:P921|wdt:P1740|wdt:P915|wdt:P840 wd:Q1757 .
    OPTIONAL { ?depicted wdt:P18 ?image. }
    OPTIONAL { ?depicted wdt:P973 ?desc_url. }
    OPTIONAL { ?depicted wdt:P31 ?type. }
    OPTIONAL { ?depicted wdt:P195 ?collection. }
    OPTIONAL { ?depicted wdt:P571 ?creation_date. }
    OPTIONAL { ?depicted wdt:P577 ?publishing_date. }
    OPTIONAL { ?depicted wdt:P6216 ?copyright. }
    OPTIONAL { ?depicted wdt:P123 ?publisher. }
		BIND(STR(YEAR(COALESCE(?creation_date, ?publishing_date))) AS ?time)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,it,es,no,et,nl,ru,ca,se,sms". }
}
LIMIT 1000
        `.replace(/Q1757/g, this.$store.state.wikidocumentaries.wikidataId);
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
						this.results = fullResults.sort(sortResults(currentSort)).slice(0,MAX_ITEMS_TO_VIEW);
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

.gallery {
    height: 35vh;
    display: flex;
    padding-left: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.gallery-item {
    height: 100%;
    margin-right: 10px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
}

.gallery-item *{
    opacity:1;
}

.gallery-item > img {
    height: 100%;
}

.gallery-item:hover * {
    transition: opacity 80ms ease-in;
}

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
