<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.Works.headerTitle') }}</div>
            <DisplayMenu></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.Works.sortMenuTooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Works.sortMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div v-if="imageitems.length" class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in imageitems" :key="item.id" :to="getItemURL(item.work.value)" class="gallery-item">
                <img :src="item.image" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ item.work.label }}</div>
                    <div class="thumb-credit">{{ item.type.label }} {{ item.creation_year}} {{ item.publishing_year}} {{ item.copyrightLabel}}</div>
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
            <a :href="getItemURL(item.work.value)" >
            <span class="thumb-title">{{ item.work.label }}</span> {{ item.type.label }} {{ item.creation_year}} {{ item.publishing_year}} {{ item.copyrightLabel}}
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
    SORT_DIST: 2,
    SORT_REV: 3,
    SHOW_CLEAR: 4
}

export default {
    name: 'Works',
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
                text: 'topic_page.Works.sortMenuOptionTime'
            },
            {
                id: MENU_ACTIONS.SORT_ALPHA,
                text: 'topic_page.Works.sortMenuOptionAlpha'
            },
            {
                id: MENU_ACTIONS.SORT_DIST,
                text: 'topic_page.Works.sortMenuOptionDist'
            },
            {
                id: MENU_ACTIONS.SORT_REV,
                text: 'topic_page.Works.sortMenuOptionRev'
            },
            {
                id: MENU_ACTIONS.SORT_CLEAR,
                text: 'topic_page.Works.sortMenuOptionClear'
            },
            ],
        };
    },
    mounted() {
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements
        let sparql;
        sparql = `
SELECT ?work ?workLabel ?image ?creation_year ?publishing_year ?desc_url ?type ?typeLabel ?collection ?copyrightLabel ?publisherLabel ?coordinates ?address ?municipality WHERE {

    ?pi wdt:P1647* wd:P170 .
    ?pi wikibase:directClaim ?p . 
    ?work ?p wd:Q216904.
    OPTIONAL { ?work wdt:P18 ?image. }
    OPTIONAL { ?work wdt:P973 ?desc_url. }
    OPTIONAL { ?work wdt:P31 ?type. }
    OPTIONAL { ?work wdt:P195 ?collection. }
    OPTIONAL { ?work wdt:P571 ?creation_date. 
             BIND(STR(YEAR(?creation_date)) AS ?creation_year)}
    OPTIONAL { ?work wdt:P577 ?publishing_date. 
             BIND(STR(YEAR(?publishing_date)) AS ?publishing_year)}
    OPTIONAL { ?work wdt:P6216 ?copyright. }
    OPTIONAL { ?work wdt:P123 ?publisher. }
    OPTIONAL { ?work wdt:P625 ?coordinates. }
    OPTIONAL { ?work wdt:P6375 ?address. }
    OPTIONAL { ?work wdt:P131* ?municipality.
              ?municipality (wdt:P31/wdt:P279) wd:Q13221722. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,it,es,no,et,nl,ru,ca,se,sms". }

}
ORDER BY ?creation_date ?publishing_date
        `.replace(/Q216904/g, this.$store.state.wikidocumentaries.wikidataId);
        const [url, body] = wdk.sparqlQuery(sparql).split('?');
        axios
            .post(url, body)
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