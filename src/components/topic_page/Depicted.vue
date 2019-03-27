<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.Depicted.headerTitle') }}</div>
            <DisplayMenu></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.Depicted.sortMenu.tooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Depicted.sortMenu.title') }}</div>
            </ToolbarMenu>
        </div>
        <div v-if="imageitems.length" class="gallery">
            <router-link tag="div" v-for="item in imageitems" :key="item.id" :to="getItemURL(item.depicted.value)" class="gallery-item">
                <img :src="item.image" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ item.depicted.label }}</div>
                    <div class="thumb-credit">{{ item.depicted.typeLabel }} </div>
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
            <span class="thumb-title">{{ item.depicted.label }}</span>
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

const MENU_ACTIONS = {
    SORT_TIME: 0,
    SORT_LABEL: 1,
    SORT_REV: 2,
    SORT_CLEAR: 3
}

const MAX_ITEMS_TO_VIEW = 50;
const DEFAULT_SORT = ["creation_year", "publishing_year"];

let fullResults;
let currentSort = DEFAULT_SORT.slice();

export default {
    name: 'Depicted',
    components: {
        ToolbarMenu,
        DisplayMenu
    },
    data () {
        return {
            results: [],
            toolbarActionMenuItems: [
            {
                id: MENU_ACTIONS.SORT_TIME,
                text: 'topic_page.Depicted.sortMenuOptionTime'
            },
            {
                id: MENU_ACTIONS.SORT_LABEL,
                text: 'topic_page.Depicted.sortMenuOptionAlpha'
            },
            {
                id: MENU_ACTIONS.SORT_REV,
                text: 'topic_page.Depicted.sortMenuOptionRev'
            },
            {
                id: MENU_ACTIONS.SORT_CLEAR,
                text: 'topic_page.Depicted.sortMenuOptionClear'
            },
            ],
        };
    },
    mounted() {
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements
        let sparql;
        sparql = `
SELECT ?depicted ?depictedLabel ?image ?creation_year ?publishing_year ?desc_url ?type ?typeLabel ?collection ?copyrightLabel ?publisherLabel WHERE {
    ?depicted wdt:P180|wdt:P921|wdt:P1740|wdt:P915|wdt:P840 wd:Q1757 .
    OPTIONAL { ?depicted wdt:P18 ?image. }
    OPTIONAL { ?depicted wdt:P973 ?desc_url. }
    OPTIONAL { ?depicted wdt:P31 ?type. }
    OPTIONAL { ?depicted wdt:P195 ?collection. }
    OPTIONAL { ?depicted wdt:P571 ?creation_date.
             BIND(STR(YEAR(?creation_date)) AS ?creation_year)}
    OPTIONAL { ?depicted wdt:P577 ?publishing_date.
             BIND(STR(YEAR(?publishing_date)) AS ?publishing_year)}
    OPTIONAL { ?depicted wdt:P6216 ?copyright. }
    OPTIONAL { ?depicted wdt:P123 ?publisher. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,it,es,no,et,nl,ru,ca,se,sms". }
}
LIMIT 50
        `.replace(/Q1757/g, this.$store.state.wikidocumentaries.wikidataId);
        const [url, body] = wdk.sparqlQuery(sparql).split('?');
        axios
            .post(url, body)
            .then(response => {
							fullResults = wdk.simplify.sparqlResults(response.data).sort(sortResults(currentSort));
							this.results = fullResults.slice(0,MAX_ITEMS_TO_VIEW);
						})
            .catch(error => console.log(error));
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        imageitems: function() {
            return this.results.filter(function(u) {
                return u.image;
            })
        }
    },
    watch: {
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case MENU_ACTIONS.SORT_TIME:
								currentSort = ["creation_year", "publishing_year"];
                break;
            case MENU_ACTIONS.SORT_LABEL:
								currentSort = ["depicted.label"];
                break;
            case MENU_ACTIONS.SORT_REV:
								for (let i in currentSort) {
									if (currentSort[i].charAt(0)=='-') currentSort[i]=currentSort[i].substr(1);
									else currentSort[i] = '-' + currentSort[i];
								}
                break;
            case MENU_ACTIONS.SORT_CLEAR:
								currentSort = DEFAULT_SORT.slice();
                break;
            }
						this.results = fullResults.sort(sortResults(currentSort)).slice(0,MAX_ITEMS_TO_VIEW);
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
