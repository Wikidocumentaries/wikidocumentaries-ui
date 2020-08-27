<template>
<div v-if="this.$store.state.wikidocumentaries.wikidata.geo.lat">
  <div class="gallery-component">
    <div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.TopicMap.headerTitle') }}</h1>
    </div>
      <div id="mapContainer" class="basemap"></div>
  </div>
</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { MAPBOX_AT } from "@/common/tokens";
import axios from "axios";
import wdk from "wikidata-sdk";

export default {
  name: "Kartta",
  components: {
  },
  data() {
    return {
      placeholder: true
    };
  },
  mounted() {
    const lat = this.$store.state.wikidocumentaries.wikidata.geo.lat;
    const lon = this.$store.state.wikidocumentaries.wikidata.geo.lon;
    const statements = this.$store.state.wikidocumentaries.wikidata.statements;
    mapboxgl.accessToken = MAPBOX_AT;
    const kartta = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: 12,
    });
    kartta.scrollZoom.disable();
    kartta.on('click', function(e) {
      kartta.scrollZoom.enable();
    });
    kartta.addControl(new mapboxgl.NavigationControl());
    const marker = new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .addTo(kartta);
  },
  methods: {
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
  computed: {
    wikidocumentaries() {
      return this.$store.state.wikidocumentaries;
    }
  }
};
</script>
<style scoped>
.basemap {
  width: 100%;
  height: 300px;
}
</style>
