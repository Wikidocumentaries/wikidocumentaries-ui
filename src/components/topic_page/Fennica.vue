<template>
  <div v-if="results.length">
    <div class="gallery-component">
      <div class="toolbar">
        <div class="header-title">Fennica</div>
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
      <div class="list">
        <div v-for="item in results" :key="item.id" class="listrow">
          <a :href="getItemURL(item.depicted.value)">
            <b>{{ item.depicted.label }} {{ item.time }}</b>
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
const DEFAULT_SORT = ["depicted.label"];

let fullResults, currentSort, currentDisplay;

export default {
  name: "Depicts",
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
          text: "general.menus.sortMenuOptionAlpha"
        },
        {
          id: SORT_ACTIONS.BY_TIME,
          text: "general.menus.sortMenuOptionTime"
        },
        {
          id: SORT_ACTIONS.SORT_REVERSE,
          text: "general.menus.sortMenuOptionRev"
        },
        {
          id: SORT_ACTIONS.SORT_CLEAR,
          text: "general.menus.sortMenuOptionClear"
        }
      ]
    };
  },
  mounted() {
    currentSort = DEFAULT_SORT.slice();
    currentDisplay = DISPLAY_ACTIONS.GALLERY;
      var searchterm = this.$store.state.wikidocumentaries.title;
        var part = searchterm;
        // if the topic is a person
        if (this.$store.state.wikidocumentaries.wikidata.instance_of.id == "Q5") {
            // switch name to format "Lastname, Firstname"
            searchterm = searchterm.replace(/([^ ]+) ([^ ]+ )*([^ ]+)/, "$3, $1");
            part = searchterm.split(", ")[1];
        }
        const statements = this.$store.state.wikidocumentaries.wikidata.statements

        let sparql = `
PREFIX schema: <http://schema.org/>
PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
SELECT DISTINCT ?work ?workTitle ?creatorName ?issn ?lang 
WHERE 
{
  {
  ?work a schema:CreativeWork, bf:Work .
  ?work schema:author ?author .
  ?author schema:name "Kivi, Aleksis" .
  ?work schema:name ?workTitle .
  } UNION {
  ?work a schema:CreativeWork, bf:Work .
  ?work schema:subject ?subject .
  ?subject schema:name "Kivi, Aleksis" .
  ?work schema:name ?workTitle .
  }
  OPTIONAL { ?work schema:inLanguage ?lang } .
  OPTIONAL { ?work schema:issn ?issn } .
  ?work schema:author ?creator .
  ?creator schema:name ?creatorName
}
ORDER BY ?workTitle
        `.replace(/"Kivi, Aleksis"/g, JSON.stringify(searchterm));
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
          currentSort = ["depicted.label"];
          break;
        case SORT_ACTIONS.BY_TIME:
          currentSort = ["time"];
          break;
        case SORT_ACTIONS.SORT_REVERSE:
          if (currentSort[0].charAt(0) == '-') currentSort[0] = currentSort[0].substr(1);
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
      this.gallery = (currentDisplay === DISPLAY_ACTIONS.GALLERY);
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

const selectResults = (lcl) => {
  let filteredResults = fullResults;
  if (currentSort[0].includes("time")) filteredResults = filteredResults.filter(x => x.time);
  if (currentDisplay === DISPLAY_ACTIONS.GALLERY) {
    if (filteredResults.find(x => x.image)) {
      // If GALLERY and at least one image
      filteredResults = filteredResults.filter(x => x.image); // select only results with an image
    } else {
      currentDisplay = DISPLAY_ACTIONS.LIST; // GALLERY with no images => change to LIST
    }
  }
  return filteredResults.sort(sortResults(currentSort, lcl)).slice(0, MAX_ITEMS_TO_VIEW);
};

</script>

<style scoped>
</style>
