<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <h1 class="header-title">{{ $t('topic_page.Instances.headerTitle') }}</h1>
						<DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-sort" :tooltip="$t('topic_page.People.sortMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.People.sortMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="intro">{{ $t('topic_page.Instances.intro') }}</div>
        <div v-if="gallery" class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.instance.value)" class="gallery-item">
                <img v-if="item.image" :src="getImageLink(item.image)" class="gallery-image"/>
                <div v-else class="noimage"></div>
                <div :class="(item.image ? 'thumb-image-info' : 'thumb-image-info-plain')">
                    <div class="gallery-title">{{ item.instance.label }}</div>
                    <div class="thumb-credit disappearing">{{ item.instance.description }}</div>
                </div>
            </router-link>
        </div>
				<div v-else class="list">
            <div v-for="item in results" :key="item.id" class="listrow">
            <a :href="getItemURL(item.instance.value)"><b>{{ item.instance.label }}</b><i> {{ item.instance.description }}</i>
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
    SORT_REVERSE: 1,
    SORT_CLEAR: 2
}

const DISPLAY_ACTIONS = {
	GALLERY: 0,
	LIST: 1,
}

const MAX_ITEMS_TO_VIEW = 1000;
const DEFAULT_SORT = ["instance.label"];

let fullResults, currentSort, currentDisplay;

export default {
    name: 'heritage',
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
	            text: 'menus.sortMenu.optionTitle'
	        },
            {
                id: SORT_ACTIONS.SORT_REVERSE,
                text: 'menus.sortMenu.optionRev'
            },
            {
                id: SORT_ACTIONS.SORT_CLEAR,
                text: 'menus.sortMenu.optionClear'
            },
            ],
        };
    },
    mounted() {
				currentSort = DEFAULT_SORT.slice();
				currentDisplay = DISPLAY_ACTIONS.GALLERY;
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements;
        let sparql;
        sparql = `
SELECT ?instance ?instanceLabel ?instanceDescription (SAMPLE(?image) AS ?image) (SAMPLE(?coordinates) AS ?coordinates) WHERE {
    ?instance wdt:P1435 wd:Q38896738.
    OPTIONAL { ?instance wdt:P18 ?image. }
    OPTIONAL { ?instance wdt:P625 ?coordinates. }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi,sv,en,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }
}
GROUP BY ?instance ?instanceLabel ?instanceDescription
LIMIT 1000
        `.replace(/Q38896738/g, this.$store.state.wikidocumentaries.wikidataId)
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
				currentSort = ["instance.label"];
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
						// console.log("currentSort: ", currentSort);
						// console.log("results: ", this.results);
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
	// if (currentSort[0].includes("birth_year")) filteredResults = filteredResults.filter(x => x.birth_year);
	// if (currentSort[0].includes("death_year")) filteredResults = filteredResults.filter(x => x.death_year);
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
