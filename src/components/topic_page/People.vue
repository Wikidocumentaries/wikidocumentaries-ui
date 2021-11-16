<template>
<div v-if="results.length">
	<div class="gallery-component">
		<div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.People.headerTitle') }}</h1>
      <DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
      <ToolbarMenu icon="wikiglyph-sort" :tooltip="$t('topic_page.People.sortMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
          <div slot="menu-title">{{ $t('topic_page.People.sortMenuTitle') }}</div>
      </ToolbarMenu>
    </div>
    <div class="intro">{{ $t('topic_page.People.intro') }}</div>
    <div v-if="gallery" class="gallery">
      <router-link tag="div" v-for="item in results" :key="item.id" :to="getItemURL(item.person.value)" class="gallery-item">
        <img v-if="item.image" :src="getImageLink(item.image)" class="gallery-image"/>
        <div v-else class="noimage"></div>
        <div :class="(item.image ? 'thumb-image-info' : 'thumb-image-info-plain')">
          <div v-if="item.inLabel" class="thumb-credit disappearing over">{{ item.inLabel }}</div>
          <div v-else class="thumb-credit disappearing over">{{ item.outLabel }}</div>
          <div class="gallery-title">{{ item.person.label }}</div>
          <div class="thumb-credit appearing">{{ item.nationality }} {{ item.professionLabel }} {{ item.p }} {{ item.birth_year }}–{{ item.death_year }}</div>
        </div>
      </router-link>
    </div>
    <div v-else class="list">
      <div v-for="item in results" :key="item.id" class="listrow">
        <a :href="getItemURL(item.person.value)" >
          <span v-if="item.inLabel">{{ item.inLabel }} </span><b>{{ item.person.label }}</b><span v-if="item.outLabel && !item.inLabel"><i> {{ item.outLabel }}</i></span><span v-if="item.professionLabel">, {{ item.professionLabel }}</span> <span v-if="item.birth_year || item.death_year">({{ item.birth_year }}–{{ item.death_year }})</span>
        </a>
      </div>
    </div>
    <div v-if="wikidocumentaries.wikidata.instance_of.id == 'Q5'">
    <div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.Familytree.headerTitle') }}</h1>
    </div>
    <div>
      <iframe :src="entitreeLink" width="100%" height="500" style="border:none;"></iframe>
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
    BY_LASTNAME: 1,
    BY_BIRTH: 2,
    BY_DEATH: 3,
    SORT_REVERSE: 4,
    SORT_CLEAR: 5
}

const DISPLAY_ACTIONS = {
	GALLERY: 0,
	LIST: 1,
}

const MAX_ITEMS_TO_VIEW = 1000;
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
                id: SORT_ACTIONS.BY_LASTNAME,
                text: 'topic_page.People.sortMenuOptionLast'
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
                text: "menus.sortMenu.optionRev"
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
SELECT ?person ?personLabel ?sexLabel (SAMPLE(?lastnameLabel) AS ?lastnameLabel) (GROUP_CONCAT(DISTINCT ?inLabel_; separator = ", ") as ?inLabel) (GROUP_CONCAT(DISTINCT ?outLabel_; separator = ", ") as ?outLabel) (SAMPLE(?image) as ?image) (SAMPLE(?birth_year) AS ?birth_year) (SAMPLE(?death_year) AS ?death_year) (GROUP_CONCAT(DISTINCT ?professionLabel_; separator=", ") as ?professionLabel) (SAMPLE(?nationality) AS ?nationality) WHERE {

    ?person wdt:P31 wd:Q5.
    {
      { 
        ?out wikibase:directClaim ?rel_out .
        ?person ?rel_out wd:Q314595 .
        ?out rdfs:label ?outLabel_ .
        FILTER(LANG(?outLabel_)="fi")
      }
      UNION
      { 
        ?in wikibase:directClaim ?rel_in .
        wd:Q314595 ?rel_in ?person .
        ?in rdfs:label ?inLabel_ .
        FILTER(LANG(?inLabel_)="fi")
      }
    }
    OPTIONAL { ?person wdt:P21 ?sex. 
              ?sex rdfs:label ?sexLabel .
              FILTER(LANG(?sexLabel)="fi") }
    OPTIONAL { ?person wdt:P18 ?image. }
    OPTIONAL { ?person wdt:P734 ?lastname. 
              ?lastname rdfs:label ?lastnameLabel .
              FILTER(LANG(?lastnameLabel)="fi") }
    OPTIONAL { ?person wdt:P569 ?birth.
              BIND(STR(YEAR(?birth)) AS ?birth_year)}
    OPTIONAL { ?person wdt:P570 ?death.
              BIND(STR(YEAR(?death)) AS ?death_year)}
    OPTIONAL { ?person wdt:P106 ?profession.
              ?profession rdfs:label ?professionLabel_ .
              FILTER(LANG(?professionLabel_)="fi") }
    OPTIONAL { ?person wdt:P27 ?country.
              ?country wdt:P1549 ?nationality .
              FILTER(LANG(?nationality)="fi") }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi,sv,en,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }

}
GROUP BY ?person ?personLabel ?sexLabel
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
        },
        entitreeLink () {
          let entitreeLink = 
          "https://www.entitree.com/" +
          this.$i18n.locale +
          "/family_tree/" +
          this.$store.state.wikidocumentaries.wikidataId;
          return entitreeLink;
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
						case SORT_ACTIONS.BY_LASTNAME:
								currentSort = ["lastnameLabel"];
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
	if (currentSort[0].includes("lastnameLabel")) filteredResults = filteredResults.filter(x => x.lastnameLabel);
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
