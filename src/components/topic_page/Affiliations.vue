<template>
  <div v-if="results.length">
    <div class="gallery-component">
      <div class="toolbar">
        <h1 class="header-title">{{ $t('topic_page.Affiliations.headerTitle') }}</h1>
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
      <div class="intro">{{ $t('topic_page.Affiliations.intro') }}</div>
      <div v-if="gallery" class="gallery">
        <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
        <router-link
          tag="div"
          v-for="item in results"
          :key="item.id"
          :to="getItemURL(item.aff.value)"
          class="gallery-item"
        >
          <img :src="getImageLink(item.image)" class="gallery-image">
          <div class="thumb-image-info">
            <div class="thumb-credit over">{{ item.inLabel }}</div>
            <div class="gallery-title">{{ item.aff.label }}</div>
            <div class="thumb-credit">{{ item.outLabel }}</div>
            <!-- <div class="thumb-credit">{{ item.typeLabel }} {{ item.time}}</div> -->
          </div>
        </router-link>
      </div>
      <div v-else class="list">
        <div v-for="item in results" :key="item.id" class="listrow">
          <a :href="getItemURL(item.aff.value)">
            <span v-if="item.inLabel">{{ item.inLabel }} </span><b>{{ item.aff.label }}</b><span v-if="item.outLabel"> <i> {{ item.outLabel }}</i></span>
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
const DEFAULT_SORT = ["aff.label"];

let fullResults, currentSort, currentDisplay;

export default {
  name: "Affiliations",
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
SELECT ?aff ?affLabel (GROUP_CONCAT(DISTINCT ?inLabel_; separator=", ") as ?inLabel) (GROUP_CONCAT(DISTINCT ?outLabel_; separator=", ") as ?outLabel) (SAMPLE(?image) AS ?image) WHERE {
  {
    ?aff wdt:P414|wdt:P991|wdt:P112|wdt:P169|wdt:P466|wdt:P710|wdt:P488|wdt:P463|wdt:P6|wdt:P5769 wd:Q29021 .
    ?aff ?rel_out wd:Q29021 .
    ?out wikibase:directClaim ?rel_out .
    OPTIONAL { ?out rdfs:label ?outLabel_ .
    FILTER(LANG(?outLabel_)="fi")  }
    }
  UNION
  {
    wd:Q29021 wdt:P414|wdt:P127|wdt:P6379|wdt:P84|wdt:P1830|wdt:P1344|wdt:P108|wdt:P463|wdt:P69|wdt:P102|wdt:P241|wdt:P1532|wdt:P118|wdt:P54|wdt:P647|wdt:P1344|wdt:P607 ?aff .
    wd:Q29021 ?rel_in ?aff .
    ?in wikibase:directClaim ?rel_in .
    OPTIONAL { ?in rdfs:label ?inLabel_ .
    FILTER(LANG(?inLabel_)="fi")  }
  }
  MINUS { ?aff wdt:P31 wd:Q5 .}
  OPTIONAL {?aff wdt:P18 ?image .}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi,sv,en,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }
  }
GROUP BY ?aff ?affLabel
        `.replace(/Q29021/g, this.$store.state.wikidocumentaries.wikidataId)
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
          currentSort = ["aff.label"];
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
