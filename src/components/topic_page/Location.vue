<template>
  <div v-if="results.length">
    <div class="gallery-component">
      <div class="toolbar">
        <h1 class="header-title">{{ $t('topic_page.Location.headerTitle') }}</h1>
        <DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
        <ToolbarMenu
          icon="wikiglyph-funnel"
          :tooltip="$t('menus.sortMenu.tooltip')"
          :items="toolbarActionMenuItems"
          @doMenuItemAction="onDoMenuItemAction"
        >
          <div slot="menu-title">{{ $t('menus.sortMenu.title') }}</div>
        </ToolbarMenu>
      </div>
      <div class="intro">{{ $t('topic_page.Location.intro') }}</div>
      <div v-if="gallery" class="gallery">
        <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
        <router-link
          tag="div"
          v-for="item in results"
          :key="item.id"
          :to="getItemURL(item.item.value)"
          class="gallery-item"
        >
          <img :src="getImageLink(item.image)" class="gallery-image">
          <div class="thumb-image-info">
            <div class="thumb-credit over">{{ item.relation }}</div>
            <div class="gallery-title">{{ item.item.label }} {{ item.startdate }}<span v-if="item.startdate || item.enddate">–</span>{{ item.enddate }}</div>
            <div class="thumb-credit">{{ item.typeLabel }}</div>
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
          <a :href="getItemURL(item.item.value)">
            <span v-if="item.relation">{{ item.relation }} </span><b>{{ item.item.label }}</b> 
            {{ item.typeLabel }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolbarMenu from "@/components/menu/ToolbarMenu";
import { sortResults } from "@/common/utils";
import axios from "axios";
import wdk from "wikidata-sdk";
import DisplayMenu from "@/components/menu/DisplayMenu";

const SORT_ACTIONS = {
  BY_LABEL: 0,
  BY_TIME: 1,
  SORT_REVERSE: 2,
  SORT_CLEAR: 3
};

const DISPLAY_ACTIONS = {
  GALLERY: 0,
  LIST: 1
};

const MAX_ITEMS_TO_VIEW = 50;
const DEFAULT_SORT = ["item.label"];

let fullResults, currentSort, currentDisplay;

export default {
  name: "Location",
  components: {
    ToolbarMenu,
    DisplayMenu
  },
  data() {
    return {
      results: [],
      gallery: true,
      toolbarActionMenuItems: [
        {
          id: SORT_ACTIONS.BY_LABEL,
          text: "menus.sortMenu.optionAlpha"
        },
        {
          id: SORT_ACTIONS.BY_TIME,
          text: "menus.sortMenu.optionTime"
        },
        {
          id: SORT_ACTIONS.SORT_REVERSE,
          text: "menus.sortMenu.optionRev"
        },
        {
          id: SORT_ACTIONS.SORT_CLEAR,
          text: "menus.sortMenu.optionClear"
        }
      ]
    };
  },
  mounted() {
    currentSort = DEFAULT_SORT.slice();
    currentDisplay = DISPLAY_ACTIONS.GALLERY;
    var title = this.$store.state.wikidocumentaries.title;
    const statements = this.$store.state.wikidocumentaries.wikidata.statements;
    let sparql;
    sparql = `
SELECT ?item ?itemLabel (GROUP_CONCAT(DISTINCT ?piLabel; separator=", ") AS ?relation) (GROUP_CONCAT(DISTINCT ?typeLabel_; separator=", ") as ?typeLabel) (SAMPLE(?image) AS ?image) (SAMPLE(DISTINCT ?startdate) as ?startdate) (SAMPLE(DISTINCT ?enddate) as ?enddate) (GROUP_CONCAT(DISTINCT ?creatorLabel_; separator=", ") as ?creatorLabel) WHERE {
  { 
    { ?pi wdt:P31 wd:Q18615777. }
    UNION
    { ?pi wdt:P31 wd:Q18635217. }
    UNION
    { ?pi wdt:P1647* wd:276 . }
   }
  ?pi wikibase:directClaim ?p .
  ?pi wikibase:propertyType wikibase:WikibaseItem .
  ?pi rdfs:label ?piLabel .
  FILTER(LANG(?piLabel)="fi") .
  wd:Q55261337 ?p ?item .
  OPTIONAL { ?item wdt:P31 ?type .
            ?type rdfs:label ?typeLabel_ .
              FILTER(LANG(?typeLabel_)="fi") }
  OPTIONAL { ?item wdt:P18 ?image. }
  OPTIONAL { ?item wdt:P580 ?date.
           BIND(STR(YEAR(?startdate)) AS ?startdate) .}
  OPTIONAL { ?item wdt:P582 ?date.
           BIND(STR(YEAR(?enddate)) AS ?enddate) .}
  OPTIONAL { ?item wdt:P170|wdt:P84 ?creator.
           ?creator rdfs:label ?creatorLabel_ .
           FILTER(LANG(?creatorLabel_)="fi")}
  MINUS { ?item wdt:P31 wd:Q5 .}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi,sv,en,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }
}
GROUP BY ?item ?itemLabel
LIMIT 1000
        `.replace(/Q55261337/g, this.$store.state.wikidocumentaries.wikidataId)
        .replace(/fi/g, this.$i18n.locale);
    const [url, body] = wdk.sparqlQuery(sparql).split("?");
    axios
      .post(url, body)
      .then(response => {
        fullResults = wdk.simplify.sparqlResults(response.data);
        this.results = selectResults(this.$i18n.locale);
        this.gallery = currentDisplay === DISPLAY_ACTIONS.GALLERY;
      })
      .catch(error => console.log(error));
  },
  computed: {
    wikidocumentaries() {
      return this.$store.state.wikidocumentaries;
    }
  },
  watch: {},
  methods: {
    onDoMenuItemAction(menuItem) {
      switch (menuItem.id) {
        case SORT_ACTIONS.BY_LABEL:
          currentSort = ["item.label"];
          break;
        case SORT_ACTIONS.BY_TIME:
          currentSort = ["time", "item.label"];
          break;
        case SORT_ACTIONS.SORT_REVERSE:
          if (currentSort[0].charAt(0) == "-")
            currentSort[0] = currentSort[0].substr(1);
          else currentSort[0] = "-" + currentSort[0];
          break;
        case SORT_ACTIONS.SORT_CLEAR:
          currentSort = DEFAULT_SORT.slice();
          break;
      }
      this.results = selectResults(this.$i18n.locale);
    },
    onDisplayChange(menuItem) {
      switch (menuItem.id) {
        case DISPLAY_ACTIONS.GALLERY:
          currentDisplay = DISPLAY_ACTIONS.GALLERY;
          break;
        case DISPLAY_ACTIONS.LIST:
          currentDisplay = DISPLAY_ACTIONS.LIST;
          break;
      }
      this.results = selectResults(this.$i18n.locale);
      this.gallery = currentDisplay === DISPLAY_ACTIONS.GALLERY;
    },
    fitTitle(title) {
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
      return value.replace(/\s/g, _) + "?width=500";
    }
  }
};

const selectResults = lcl => {
  let filteredResults = fullResults;
  if (currentSort[0].includes("time"))
    filteredResults = filteredResults.filter(x => x.time);
  if (currentDisplay === DISPLAY_ACTIONS.GALLERY) {
    if (filteredResults.find(x => x.image)) {
      // If GALLERY and at least one image
      filteredResults = filteredResults.filter(x => x.image); // select only results with an image
    } else {
      currentDisplay = DISPLAY_ACTIONS.LIST; // GALLERY with no images => change to LIST
    }
  }
  return filteredResults
    .sort(sortResults(currentSort, lcl))
    .slice(0, MAX_ITEMS_TO_VIEW);
};
</script>

<style scoped>
</style>
