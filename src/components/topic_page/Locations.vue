<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.Locations.headerTitle') }}</div>
            <DisplayMenu></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.Locations.sortMenu.tooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Locations.sortMenu.title') }}</div>
            </ToolbarMenu>
        </div>
        <div v-if="imageitems.length" class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in imageitems" :key="item.id" :to="getItemURL(item.location.value)" class="gallery-item">
                <img :src="item.image" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ item.location.label }}</div>
                    <div class="thumb-credit">{{ item.location.typeLabel }} {{ item.dated}}</div>
                </div>
                <!--div class="thumb-image-header"-->
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
            <a :href="getItemURL(item.location.value)" >
            <span class="thumb-title">{{ item.location.label }}</span> {{ item.location.label }} {{ item.dated}}
            </a>
            </div>
        </div>
	</div>
</div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'
import axios from 'axios'
import wdk from 'wikidata-sdk'
import DisplayMenu from '@/components/menu/DisplayMenu'

const MENU_ACTIONS = {
    SORT_TIME: 0,
    SORT_ALPHA: 1,
    SORT_REV: 2,
    SHOW_CLEAR: 3
}

export default {
    name: 'Locations',
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
                text: 'topic_page.Locations.sortMenu.optionTime'
            },
            {
                id: MENU_ACTIONS.SORT_ALPHA,
                text: 'topic_page.Locations.sortMenu.optionAlpha'
            },
            {
                id: MENU_ACTIONS.SORT_REV,
                text: 'topic_page.Locations.sortMenu.optionRev'
            },
            {
                id: MENU_ACTIONS.SORT_CLEAR,
                text: 'topic_page.Locations.sortMenu.optionClear'
            },
            ],
        };
    },
    mounted() {
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements
        let sparql;
        sparql = `
SELECT ?location ?locationLabel (GROUP_CONCAT(?typeLabel; separator=", ") as ?typeLabel) (SAMPLE(?image) AS ?image) (SAMPLE(?address) as ?address) (GROUP_CONCAT(?dated; separator="/") as ?dated) (GROUP_CONCAT(?creatorLabel; separator=", ") as ?creatorLabel) WHERE {
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
ORDER BY ?dated
LIMIT 50
        `.replace(/Q1772186/g, this.$store.state.wikidocumentaries.wikidataId);
        const url = wdk.sparqlQuery(sparql);
        axios
            .get(url)
            .then(response => (this.results = wdk.simplify.sparqlResults(response.data)))
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
                break;
            case MENU_ACTIONS.SORT_ALPHA:
                break;
            case MENU_ACTIONS.SORT_DIST:
                break;
            case MENU_ACTIONS.SORT_REV:
                break;
            case MENU_ACTIONS.SORT_CLEAR:
                break;
            }
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