<template>
  <div v-if="results.length">
    <div class="gallery-component">
      <div class="toolbar">
        <h1 class="header-title">{{ $t('topic_page.Teams.headerTitle') }}</h1>
        <DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
        <ToolbarMenu
          icon="wikiglyph-sort"
          :tooltip="$t('menus.sortMenu.tooltip')"
          :items="toolbarActionMenuItems"
          @doMenuItemAction="onDoMenuItemAction"
        >
          <div slot="menu-title">{{ $t('menus.sortMenu.title') }}</div>
        </ToolbarMenu>
      </div>
      <div class="intro">{{ $t('topic_page.Teams.intro') }}</div>
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
            <div v-if="item.item.label" class="gallery-title">Gallery</div>
          </div>
        </router-link>
      </div>
      <div v-else class="list">
        <router-link 
          tag="div"
          v-for="item in results" 
          :key="item.id" 
          :to="getItemURL(item.item.value)"
          class="listrow listblock">
            <div class="icon">
              <img v-if="item.logo" :src="getImageLink(item.logo)" class="icon-image">
            </div>
            <div class="content">
              <div v-if="item.item.label" class="gallery-title">{{ item.item.label }}</div>
              <div v-if="item.cupLabel" class="thumb-credit">{{ item.cupLabel }}</div>
              <div v-if="item.games" class="thumb-credit">Games: {{ item.games }}</div>
              <div v-if="item.wins" class="thumb-credit">Wins: {{ item.wins }}</div>
              <div v-if="item.losses" class="thumb-credit">Losses: {{ item.losses }}</div>
              <div v-if="item.ties" class="thumb-credit">Ties: {{ item.ties }}</div>
              <div v-if="item.ranking" class="thumb-credit">Ranking: {{ item.ranking }}</div>
              <div v-if="item.scored" class="thumb-credit">Scored: {{ item.scored }}</div>
              <div v-if="item.conceded" class="thumb-credit">Conceded: {{ item.conceded }}</div>
            </div>
          </router-link>
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
  name: "Teams",
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
SELECT ?item ?itemLabel ?games ?wins ?losses ?ties ?ranking ?scored ?conceded ?logo WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fi,en,sv,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }
  wd:Q3957513 p:P1923 ?clubstatement.
  ?clubstatement ps:P1923 ?item.
  OPTIONAL { ?clubstatement pq:P1350 ?games. }
  OPTIONAL { ?clubstatement pq:P1355 ?wins. }
  OPTIONAL { ?clubstatement pq:P1356 ?losses. }
  OPTIONAL { ?clubstatement pq:P1356 ?ties. }
  OPTIONAL { ?clubstatement pq:P1352 ?ranking. }
  OPTIONAL { ?clubstatement pq:P1351 ?scored. }
  OPTIONAL { ?clubstatement pq:P1359 ?conceded. }
  OPTIONAL { ?item wdt:P154 ?logo. }
}
        `.replace(/Q3957513/g, this.$store.state.wikidocumentaries.wikidataId)
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
        // case SORT_ACTIONS.BY_TIME:
        //   currentSort = ["time", "aff.label"];
        //   break;
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
  // if (currentSort[0].includes("time"))
  //   filteredResults = filteredResults.filter(x => x.time);
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
