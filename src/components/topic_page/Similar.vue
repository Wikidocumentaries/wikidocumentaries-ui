<template>
  <div v-if="results.length">
    <div class="gallery-component">
      <div class="toolbar">
        <h1 class="header-title">{{ $t('topic_page.Similar.headerTitle') }}</h1>
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
      <div class="intro">{{ $t('topic_page.Similar.intro') }}</div>
      <div v-if="viewMode === VIEW_MODES.GALLERY" class="gallery">
        <router-link
          tag="div"
          v-for="item in results"
          :key="item.id"
          :to="getItemURL(item.item.value)"
          class="gallery-item"
        >
          <img :src="getImageLink(item.image)" class="gallery-image" />
          <div class="thumb-image-info">
            <div class="gallery-title">{{ item.item.label }}</div>
            <div class="thumb-credit">
              {{ item.item.description}} {{ item.startdate }}<span v-if="item.startdate || item.enddate">–</span>{{ item.enddate }}
            </div>
          </div>
          <div>
            <div class="left-align"></div>
            <div class="right-align"></div>
          </div>
        </router-link>
      </div>
      <div v-else-if="viewMode === VIEW_MODES.LIST" class="list">
        <div v-for="item in results" :key="item.id" class="listrow">
          <a :href="getItemURL(item.item.value)">
            <b>{{ item.item.label }}</b> {{ item.item.description}} {{ item.startdate }}<span v-if="item.startdate || item.enddate">–</span>{{ item.enddate }}
          </a>
        </div>
      </div>
      <div v-else-if="viewMode === VIEW_MODES.MAP" id="SimilarMapContainer" class="basemap"></div>
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
import bbox from '@turf/bbox';
import { geometryCollection, geometry } from '@turf/helpers'

const SORT_ACTIONS = {
  BY_LABEL: 0,
  BY_TIME: 1,
  SORT_REVERSE: 2,
  SORT_CLEAR: 3
};

/* const DISPLAY_ACTIONS = {
  GALLERY: 0,
  LIST: 1
}; */

const MAX_ITEMS_TO_VIEW = 1000;
const DEFAULT_SORT = ["item.label"];

let fullResults, currentSort, currentDisplay, myMap;

export default {
  name: "Similar",
  created() {
    this.VIEW_MODES = VIEW_MODES; // Export for use in template
  },
  components: {
    ToolbarMenu,
    DisplayMenu
  },
  data() {
    return {
      results: [],
      viewMode: VIEW_MODES.GALLERY,
      toolbarActionMenuItems: [
        {
          id: SORT_ACTIONS.BY_LABEL,
          text: "menus.sortMenu.optionAlpha"
        },
        {
          id: SORT_ACTIONS.BY_START,
          text: "menus.sortMenu.optionStart"
        },
        {
          id: SORT_ACTIONS.BY_END,
          text: "menus.sortMenu.optionEnd"
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
    currentDisplay = VIEW_MODES.GALLERY;
    var title = this.$store.state.wikidocumentaries.title;
    const statements = this.$store.state.wikidocumentaries.wikidata.statements;
    mapboxgl.accessToken = MAPBOX_AT;
    let countryid;
    let typeid = "wd:" + this.$store.state.wikidocumentaries.wikidata.instance_of.id;
    let countryvar = "P17";
    let typevar = "P31";
    for (var index in statements) {
      if (typeid == "wd:Q5") {
        typevar = "P106";
        countryvar = "P27";
        if (statements[index].id == typevar) {
          typeid = "";
          let values = statements[index].values;
          for (var value in values) {
            typeid += "wd:" + values[value].id + " ";

          }
        }
      } 
      if (statements[index].id == 'P17') {
        countryid = statements[index].values[0].id;
      } else if (statements[index].id == 'P27') {
        countryvar = 'P27';
        countryid = statements[index].values[0].id;
      } else if (statements[index].id == 'P495') {
        countryvar = 'P495';
        countryid = statements[index].values[0].id;
      } else if (statements[index].id == 'P131') {
        countryvar = 'P131';
        countryid = statements[index].values[0].id;
      } else if (statements[index].id == 'P291') {
        countryvar = 'P291';
        countryid = statements[index].values[0].id;
      }
      console.log(countryvar, countryid, typevar, typeid);
    }
    let sparql;
    sparql = `
SELECT ?item ?itemLabel ?itemDescription (SAMPLE(?startdate) AS ?startdate) (SAMPLE(?enddate) AS ?enddate) (SAMPLE(?image) AS ?image) (SAMPLE(?coordinates) AS ?coordinates) WHERE {
  ?item wdt:P31 ?type .
  ?item wdt:P17 ?country .
  VALUES ?type { wd:Q23413 } .
  VALUES ?country { wd:Q191 } .
  OPTIONAL { 
    ?item ?start ?startd .
    VALUES ?start { wdt:P580 wdt:P571 wdt:P580 wdt:P569 } .
    BIND(STR(YEAR(?startd)) AS ?startdate) .
  }
  OPTIONAL { 
    ?item ?end ?endd . 
    VALUES ?end { wdt:P582 wdt:P576 wdt:P2669 wdt:P570} .
    BIND(STR(YEAR(?endd)) AS ?enddate) .
  }
  OPTIONAL { ?item wdt:P18 ?image . }
  OPTIONAL { ?item wdt:P625 ?coordinates .}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi,sv,en,de,fr,it,es,no,nb,et,nl,pl,ca,se,sms,is,da,ru,et". }
}
GROUP BY ?item ?itemLabel ?itemDescription
        `
      .replace(/wd:Q23413/g, typeid)
      .replace(/Q191/g, countryid)
      .replace(/P31/g, typevar)
      .replace(/P17/g, countryvar)
      .replace(/fi/g, this.$i18n.locale);
/*     console.log(sparql); */
    const [url, body] = wdk.sparqlQuery(sparql).split("?");
    axios
      .post(url, body)
      .then(response => {
        fullResults = wdk.simplify.sparqlResults(response.data);
        this.results = selectResults(this.$i18n.locale);
        this.viewMode = currentDisplay;
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
        case SORT_ACTIONS.BY_START:
          currentSort = ["startdate", "item.label"];
          break;
        case SORT_ACTIONS.BY_END:
          currentSort = ["enddate", "item.label"];
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
            container: "SimilarMapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lon, lat],
            zoom: 12,
          });

          let points = new Array();

          this.results.forEach(function (item) {
            let popupHtml = "";
            let koord;
            let wikidataPoint;
            if (item.coordinates) {
              koord = item.coordinates.split("(")[1].split(")")[0].split(" ");
              wikidataPoint = geometry('Point', koord);
              points.push(wikidataPoint);
              popupHtml = 
              '<a href="' + 
              item.item.value +
              '"><div class="popup-body">' +
/*                 (item.image
                  ? '<img src="' + this.$getImageLink(item.image) + '" class="popup-image">'
                  : '') + */
                '<div class="popup-txt">' +
                '<div class="gallery-title">' +
                item.item.label +
                "</div>" +
                '<div class="thumb-credit">' +
                (item.item.description ? item.item.description : "") +
/*                 (item.time ? " " + item.time : "") + */
                "</div></div></div></a>";
              console.log(item);
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
          const bounds = bbox(geometryCollection(points))
          myMap.fitBounds(bounds, {
            padding: 50,
            maxZoom: 19
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
    }
  }
};

const selectResults = lcl => {
  let filteredResults = fullResults;
	if (currentSort[0].includes("startdate")) filteredResults = filteredResults.filter(x => x.startdate);
	if (currentSort[0].includes("enddate")) filteredResults = filteredResults.filter(x => x.enddate);
  if (currentDisplay === VIEW_MODES.GALLERY) {
    if (filteredResults.find(x => x.image)) {
      // If GALLERY and at least one image
      filteredResults = filteredResults.filter(x => x.image); // select only results with an image
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
