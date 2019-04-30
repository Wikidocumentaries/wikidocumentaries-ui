<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.People.headerTitle') }}</div>
						<DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
            <ToolbarMenu icon="wikiglyph-funnel" :tooltip="$t('topic_page.People.sortMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.People.sortMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="intro">{{ $t('topic_page.People.intro') }}</div>
        <div v-if="gallery" class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.person.value)" class="gallery-item">
                <img v-if="item.image" :src="getImageLink(item.image)" class="gallery-image"/>
                <div v-else class="noimage"></div>
                <div :class="(item.image ? 'thumb-image-info' : 'thumb-image-info-plain')">
                    <div v-if="item.inLabel" class="thumb-credit disappearing">{{ item.inLabel }}</div>
                    <div v-else class="thumb-credit disappearing">{{ item.outLabel }}</div>
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
				<div v-else class="list">
            <div v-for="item in results" :key="item.id" class="listrow">
            <a :href="getItemURL(item.person.value)" >
            	<b>{{ item.person.label }}</b> (<span v-if="item.inLabel">{{ item.inLabel }}</span><span v-else><i>{{ item.outLabel }}</i></span>) {{ item.professionLabel }} {{ item.birth_year }}–{{ item.death_year }}
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
    BY_BIRTH: 1,
    BY_DEATH: 2,
    SORT_REVERSE: 3,
    SORT_CLEAR: 4
}

const DISPLAY_ACTIONS = {
	GALLERY: 0,
	LIST: 1,
}

const MAX_ITEMS_TO_VIEW = 50;
const DEFAULT_SORT = ["person.label"];

let fullResults, currentSort, currentDisplay;

export default {
    name: 'People',
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
	              text: 'topic_page.People.sortMenuOptionName'
	          },
            {
                id: SORT_ACTIONS.BY_BIRTH,
                text: 'topic_page.People.sortMenuOptionBirth'
            },
            {
                id: SORT_ACTIONS.BY_DEATH,
                text: 'topic_page.People.sortMenuOptionDeath'
            },
            {
                id: SORT_ACTIONS.SORT_REVERSE,
                text: 'topic_page.People.sortMenuOptionRev'
            },
            {
                id: SORT_ACTIONS.SORT_CLEAR,
                text: 'topic_page.People.sortMenuOptionClear'
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
SELECT ?person ?personLabel (SAMPLE(?lastnameLabel) AS ?lastnameLabel) (GROUP_CONCAT(DISTINCT ?inLabel) as ?inLabel) (GROUP_CONCAT(DISTINCT ?outLabel) as ?outLabel) (SAMPLE(?image) as ?image) (SAMPLE(?birth_year) AS ?birth_year) (SAMPLE(?death_year) AS ?death_year) (GROUP_CONCAT(DISTINCT ?professionLabel; separator=", ") as ?professionLabel) (SAMPLE(?nationality) AS ?nationality) WHERE {

    ?person wdt:P31 wd:Q5.
    {
      { 
        ?out wikibase:directClaim ?rel_out .
        ?person ?rel_out wd:Q314595 .
        ?out rdfs:label ?outLabel .
        FILTER(LANG(?outLabel)="fi")
      }
      UNION
      { 
        ?in wikibase:directClaim ?rel_in .
        wd:Q314595 ?rel_in ?person .
        ?in rdfs:label ?inLabel .
        FILTER(LANG(?inLabel)="fi")
      }
    }
    OPTIONAL { ?person wdt:P18 ?image. }
    OPTIONAL { ?person wdt:P734 ?lastname. 
              ?lastname rdfs:label ?lastnameLabel .
              FILTER(LANG(?lastnameLabel)="fi") }
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
LIMIT 1000
        `.replace(/Q314595/g, this.$store.state.wikidocumentaries.wikidataId)
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
								currentSort = ["person.label"];
	              break;
            case SORT_ACTIONS.BY_BIRTH:
								currentSort = ["birth_year", "person.label"];
                break;
            case SORT_ACTIONS.BY_DEATH:
								currentSort = ["death_year", "person.label"];
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
	if (currentSort[0].includes("birth_year")) filteredResults = filteredResults.filter(x => x.birth_year);
	if (currentSort[0].includes("death_year")) filteredResults = filteredResults.filter(x => x.death_year);
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

.thumb-title {
    font-family: barlow condensed;
    text-transform: uppercase;
    font-size: 1.2em;
	padding-bottom: 2px;
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
