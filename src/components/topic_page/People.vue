<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.People.headerTitle') }}</div>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.People.sortMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.People.sortMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.person.value)" class="gallery-item">
                <img v-if="item.image" :src="item.image" class="gallery-image"/>
                <div v-else class="noimage"></div>
                <div :class="(item.image ? 'thumb-image-info' : 'thumb-image-info-plain')">
                    <div class="thumb-title">{{ item.person.label }}</div>
                    <div class="thumb-credit appearing">{{ item.nationality }} {{ item.professionLabel }} {{ item.p }} {{ item.birth_year }}–{{ item.death_year }}</div>
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
	</div>
</div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'
import axios from 'axios'
import wdk from 'wikidata-sdk'

const MENU_ACTIONS = {
    SORT_BIRTH: 0,
    SORT_DEATH: 1,
    SORT_FIRST: 2,
    SORT_LAST: 3,
    SORT_REV: 4,
    SHOW_CLEAR: 5
}

export default {
    name: 'People',
    components: {
        ToolbarMenu
    },
    data () {
        return {
            results: [],
            toolbarActionMenuItems: [
            {
                id: MENU_ACTIONS.SORT_BIRTH,
                text: 'topic_page.People.sortMenuOptionBirth'
            },
            {
                id: MENU_ACTIONS.SORT_DEATH,
                text: 'topic_page.People.sortMenuOptionDeath'
            },
            {
                id: MENU_ACTIONS.SORT_FIRST,
                text: 'topic_page.People.sortMenuOptionFirst'
            },
            {
                id: MENU_ACTIONS.SORT_LAST,
                text: 'topic_page.People.sortMenuOptionLast'
            },
            {
                id: MENU_ACTIONS.SORT_REV,
                text: 'topic_page.People.sortMenuOptionLast'
            },
            {
                id: MENU_ACTIONS.SORT_CLEAR,
                text: 'topic_page.People.sortMenuOptionRev'
            },
            ],
        };
    },
    mounted() {
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements
        let sparql;
        sparql = `
SELECT ?person ?personLabel (SAMPLE(?image) as ?image) (SAMPLE(?birth_year) AS ?birth_year) (SAMPLE(?death_year) AS ?death_year) (GROUP_CONCAT(DISTINCT ?professionLabel; separator=", ") as ?professionLabel) (SAMPLE(?nationality) AS ?nationality) WHERE {

    ?person wdt:P31 wd:Q5.
    {
      { ?person ?rel_out wd:Q314595 .}
      UNION
      { wd:Q314595 ?rel_in ?person .}
    }
    OPTIONAL { ?person wdt:P18 ?image. }
    OPTIONAL { ?person wdt:P569 ?birth.
              BIND(STR(YEAR(?birth)) AS ?birth_year)}
    OPTIONAL { ?person wdt:P570 ?death.
              BIND(STR(YEAR(?death)) AS ?death_year)}
    OPTIONAL { ?person wdt:P106 ?profession. 
              ?profession rdfs:label ?professionLabel .
              FILTER(LANG(?professionLabel)="fi") }
    OPTIONAL { ?person wdt:P27 ?country. 
              ?country wdt:P1549 ?nationality .
              FILTER(LANG(?nationality)="fi") }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,sv,en,fr,no,se,et,nl,de,ru,es,it,ca". }

}
GROUP BY ?person ?personLabel
ORDER BY ?birth_year ?death_year
LIMIT 50
        `.replace(/Q314595/g, this.$store.state.wikidocumentaries.wikidataId)
         .replace(/fi/g, this.$i18n.locale);
        const [url, body] = wdk.sparqlQuery(sparql).split('?');
        axios
            .post(url, body)
            .then(response => (this.results = wdk.simplify.sparqlResults(response.data)))
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
    background: var(--main-blue);
}

.gallery-item * {
    opacity:1;
    transition: opacity 80ms ease-in;
}

.gallery-item > img {
    height: 100%;
}

/* .gallery-item:hover * {
    transition: opacity height 80ms ease-in;
} */

.gallery-item:hover .gallery-image {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 0.5;
}

.thumb-title {
    font-family: barlow condensed;
    text-transform: uppercase;
    font-size: 1.2em;
}

.thumb-title {
    font-family: barlow condensed;
    text-transform: uppercase;
    font-size: 1.2em;
}

.appearing {
    height: 0;
    opacity: 0;
    transition: height 80ms ease-in;
}

.gallery-item:hover .appearing {
    height:unset;
    opacity: 1;
}

.noimage {
    background: var(--main-blue);
    height: 35vh;
    width: 150px;
}

</style>