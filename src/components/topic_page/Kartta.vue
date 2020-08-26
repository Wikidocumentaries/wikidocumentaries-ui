<template>
<div v-if="this.$store.state.wikidocumentaries.wikidata.geo.lat">
  <div class="gallery-component">
    <div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.TopicMap.headerTitle') }}</h1>
      <ToolbarMenu
        icon="wikiglyph-funnel"
        :tooltip="$t('menus.sortMenu.tooltip')"
        :items="toolbarActionMenuItems"
        @doMenuItemAction="onDoMenuItemAction"
      >
        <div slot="menu-title">{{ $t('menus.sortMenu.title') }}</div>
      </ToolbarMenu>
    </div>
      <div id="mapContainer" class="basemap"></div>
  </div>
</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { MAPBOX_AT } from "@/common/tokens";
import ToolbarMenu from "@/components/menu/ToolbarMenu";
import axios from "axios";
import wdk from "wikidata-sdk";

export default {
  name: "Kartta",
  components: {
    ToolbarMenu
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