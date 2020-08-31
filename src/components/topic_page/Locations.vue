<template>
  <div v-if="results.length">
    <div class="gallery-component">
      <div class="toolbar">
        <h1 class="header-title">{{ $t('topic_page.Locations.headerTitle') }}</h1>
        <DisplayMenu @doDisplayChange="onDisplayChange"></DisplayMenu>
        <ToolbarMenu
          icon="wikiglyph-funnel"
          :tooltip="$t('topic_page.Locations.sortMenu.tooltip')"
          :items="toolbarActionMenuItems"
          @doMenuItemAction="onDoMenuItemAction"
        >
          <div slot="menu-title">{{ $t('topic_page.Locations.sortMenu.title') }}</div>
        </ToolbarMenu>
      </div>
      <div class="intro">{{ $t('topic_page.Locations.intro') }}</div>
      <div v-if="viewMode === VIEW_MODES.GALLERY" class="gallery">
        <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
        <router-link
          tag="div"
          v-for="item in results"
          :key="item.id"
          :to="getItemURL(item.location.value)"
          class="gallery-item"
        >
          <img :src="getImageLink(item.image)" class="gallery-image" />
          <div class="thumb-image-info">
            <div class="thumb-credit over">{{ item.creatorLabel }}</div>
            <div class="gallery-title">{{ item.location.label }}</div>
            <div class="thumb-credit">{{ item.typeLabel }} {{ item.time}}</div>
          </div>
        </router-link>
      </div>
      <div v-else-if="viewMode === VIEW_MODES.LIST" class="list">
        <div v-for="item in results" :key="item.id" class="listrow">
          <a :href="getItemURL(item.location.value)">
            <b>{{ item.location.label }}</b>
            {{ item.typeLabel }} {{ item.time}}
          </a>
        </div>
      </div>
      <div v-else-if="viewMode === VIEW_MODES.MAP" id="LocationsMapContainer" class="basemap"></div>
    </div>
  </div>
</template>

<script>
import ToolbarMenu from "@/components/menu/ToolbarMenu";
import { sortResults } from "@/common/utils";
import { MAPBOX_AT } from "@/common/tokens";
import axios from "axios";
import wdk from "wikidata-sdk";
import DisplayMenu from "@/components/menu/ComponentViewModeMenu";
import { VIEW_MODES } from "@/components/menu/ComponentViewModeMenu";
import mapboxgl from "mapbox-gl";

const SORT_ACTIONS = {
  BY_LABEL: 0,
  BY_TIME: 1,
  SORT_REVERSE: 2,
  SORT_CLEAR: 3,
};

const MAX_ITEMS_TO_VIEW = 200;
const DEFAULT_SORT = ["location.label"];

let fullResults, currentSort, currentDisplay, myMap;

export default {
  name: "Locations",
  created() {
    this.VIEW_MODES = VIEW_MODES; // Export for use in template
  },
  components: {
    ToolbarMenu,
    DisplayMenu,
  },
  data() {
    return {
      results: [],
      viewMode: VIEW_MODES.GALLERY,
      toolbarActionMenuItems: [
        {
          id: SORT_ACTIONS.BY_LABEL,
          text: "menus.sortMenu.optionAlpha",
        },
        {
          id: SORT_ACTIONS.BY_TIME,
          text: "menus.sortMenu.optionTime",
        },
        {
          id: SORT_ACTIONS.SORT_REVERSE,
          text: "menus.sortMenu.optionRev",
        },
        {
          id: SORT_ACTIONS.SORT_CLEAR,
          text: "menus.sortMenu.optionClear",
        },
      ],
    };
  },
  mounted() {
    currentSort = DEFAULT_SORT.slice();
    currentDisplay = VIEW_MODES.GALLERY;
    var title = this.$store.state.wikidocumentaries.title;
    const statements = this.$store.state.wikidocumentaries.wikidata.statements;
    mapboxgl.accessToken = MAPBOX_AT;
    let sparql;
    sparql = `
SELECT ?location ?locationLabel (GROUP_CONCAT(DISTINCT ?relLabel; separator=", ") AS ?relation) (GROUP_CONCAT(DISTINCT ?typeLabel_; separator=", ") as ?typeLabel) (SAMPLE(?image) AS ?image) (SAMPLE(?coordinates) AS ?coordinates)(SAMPLE(?address) as ?address) (GROUP_CONCAT(DISTINCT ?dated; separator="/") as ?time) (GROUP_CONCAT(DISTINCT ?creatorLabel_; separator=", ") as ?creatorLabel) WHERE {
  ?pi wdt:P1647* wd:P276 .
  ?pi wikibase:directClaim ?p .
  OPTIONAL { ?pi wdt:P7087 ?rel .
  ?rel rdfs:label ?relLabel .
  FILTER(LANG(?relLabel)="fi") . }
  ?location ?p wd:Q1772186.
  OPTIONAL { ?location wdt:P31 ?type .
            ?type rdfs:label ?typeLabel_ .
              FILTER(LANG(?typeLabel_)="fi") }
  OPTIONAL { ?location wdt:P18 ?image. }
  OPTIONAL { ?location wdt:P625 ?coordinates .}
  OPTIONAL { ?location wdt:P6375 ?address. }
  OPTIONAL { ?location wdt:P571 ?date.
           BIND(STR(YEAR(?date)) AS ?dated)}
  OPTIONAL { ?location wdt:P170|wdt:P84 ?creator.
           ?creator rdfs:label ?creatorLabel_ .
           FILTER(LANG(?creatorLabel_)="fi")}
  MINUS { ?location wdt:P31 wd:Q5 .}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi,sv,en,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }
}
GROUP BY ?location ?locationLabel
LIMIT 1000
        `
      .replace(/Q1772186/g, this.$store.state.wikidocumentaries.wikidataId)
      .replace(/fi/g, this.$i18n.locale);
    const [url, body] = wdk.sparqlQuery(sparql).split("?");
    axios
      .post(url, body)
      .then((response) => {
        fullResults = wdk.simplify.sparqlResults(response.data);
        this.results = selectResults(this.$i18n.locale);
        this.viewMode = currentDisplay;
      })
      .catch((error) => console.log(error));
  },
  computed: {
    wikidocumentaries() {
      return this.$store.state.wikidocumentaries;
    },
  },
  watch: {},
  methods: {
    onDoMenuItemAction(menuItem) {
      switch (menuItem.id) {
        case SORT_ACTIONS.BY_LABEL:
          currentSort = ["location.label"];
          break;
        case SORT_ACTIONS.BY_TIME:
          currentSort = ["time", "location.label"];
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
      currentDisplay = menuItem.id;
      if (currentDisplay == VIEW_MODES.MAP) {
        this.viewMode = currentDisplay;
        const lat = this.$store.state.wikidocumentaries.wikidata.geo.lat;
        const lon = this.$store.state.wikidocumentaries.wikidata.geo.lon;

        this.$nextTick(function () {
          myMap = new mapboxgl.Map({
            container: "LocationsMapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lon, lat],
            zoom: 12,
          });

          this.results.forEach(function (item) {
            let popupHtml = "";
            let koord;
            if (item.coordinates) {
              koord = item.coordinates.split("(")[1].split(")")[0].split(" ");
              popupHtml =
              '<a href="#"><div class="popup-body">' +
                //(item.image
                //  ? '<img src="' + item.image + '" class="popup-image">'
                //  : '') +
                '<div class="popup-txt"><div class="thumb-credit over">' +
                item.creatorLabel +
                '</div><div class="gallery-title">' +
                item.location.label +
                "</div>" +
                '<div class="thumb-credit">' +
                (item.typeLabel ? item.typeLabel : "") +
                (item.time ? " " + item.time : "") +
                "</div></div></div></a>";
              console.log(
                "Setting a marker to: ",
                koord,
                "with html: ",
                popupHtml
              );
              var marker = new mapboxgl.Marker()
                .setLngLat(koord)
                .setPopup(
                  new mapboxgl.Popup() // add popups
                    .setMaxWidth("300px")
                    .setHTML(popupHtml)
                )
                .addTo(myMap);
            }
          });
        });
      } else {
        if (myMap) {
          myMap.remove();
          myMap = null;
        }
        this.results = selectResults(this.$i18n.locale);
        this.viewMode = currentDisplay;
      }
      // console.log("ViewMode changed to: ", this.viewMode);
      // console.log("VIEW_MODES: ", VIEW_MODES);
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
    },
  },
};

const selectResults = (lcl) => {
  let filteredResults = fullResults;
  if (currentSort[0].includes("time"))
    filteredResults = filteredResults.filter((x) => x.time);
  if (currentDisplay === VIEW_MODES.GALLERY) {
    if (filteredResults.find((x) => x.image)) {
      // If GALLERY and at least one image
      filteredResults = filteredResults.filter((x) => x.image); // select only results with an image
    } else {
      currentDisplay = VIEW_MODES.LIST; // GALLERY with no images => change to LIST
    }
  }
  return filteredResults
    .sort(sortResults(currentSort, lcl))
    .slice(0, MAX_ITEMS_TO_VIEW);
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 40vh;
}
</style>
