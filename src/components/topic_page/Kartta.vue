<template>
<div v-if="this.$store.state.wikidocumentaries.wikidata.geo.lat">
  <div class="gallery-component">
    <div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.TopicMap.headerTitle') }}</h1>
      <HeaderLink
        class="toolbar-item"
        :tooltip="$t('topic_page.TopicMap.extLink.menuTooltip')"
        :link="osmURL"
        icon="wikiglyph-new-window"
        v-show="osmElements != undefined"
      ></HeaderLink>
    </div>
      <div id="mapContainer" class="basemap"></div>
  </div>
</div>
</template>

<script>
import HeaderLink from "@/components/HeaderLink";
import mapboxgl from 'mapbox-gl'
import { MAPBOX_AT } from '@/common/tokens'
import axios from 'axios'
import wdk from 'wikidata-sdk'
import bbox from '@turf/bbox'
import { geometryCollection, geometry } from '@turf/helpers'

export default {
  name: 'Kartta',
  components: {
    HeaderLink
  },
  data () {
    return {
      osmElements: [],
      lon: this.$store.state.wikidocumentaries.wikidata.geo.lon,
      lat: this.$store.state.wikidocumentaries.wikidata.geo.lat,
      zoom: 12
    }
  },
  mounted () {
    const lat = this.lat
    const lon = this.lon
    const wikidataId = this.$store.state.wikidocumentaries.wikidataId
    const statements = this.$store.state.wikidocumentaries.wikidata.statements

    mapboxgl.accessToken = MAPBOX_AT
    const kartta = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 12
    })

    kartta.scrollZoom.disable()
    kartta.on('click', function (e) {
      kartta.scrollZoom.enable()
    })

    kartta.addControl(new mapboxgl.NavigationControl())

    const marker = new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .addTo(kartta)

    kartta.on('load', function () {
      // Request for Wikidata linked shape from OpenStreetMap data
      fetch(`https://osm.wikidata.link/tagged/api/item/${wikidataId}?geojson=1`)
        .then(response => response.json())
        .then(data => {
          this.osmElements = data.osm;
/*           console.log(this.osmElements); */

          // Gather the geometries of the OSM elements into a collection
          const geojson = {
            type: "GeometryCollection",
            geometries: data.osm.map((element) => element.geojson)
          }

          kartta.addSource('osmshape', {
            type: 'geojson',
            data: geojson
          })

          // Draw outlines of osm geometries below any label layers
          kartta.addLayer({
            'id': 'osmlayer-line',
            'type': 'line',
            'source': 'osmshape',
            'layout': {
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#ce492a',
              'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                2,
                16,
                4
              ],
              'line-opacity': 1
            }
          }, 'waterway-label')

          // Draw fills of polygon osm geometries below any label layers
          kartta.addLayer({
            'id': 'osmlayer-fill',
            'type': 'fill',
            'source': 'osmshape',
            'layout': {},
            'paint': {
              'fill-color': '#ffd76e',
              'fill-opacity': 0.2
            },
            'filter': ["in", "Polygon", ["geometry-type"]],
          }, 'waterway-label')

          // Fit map to shape if available
          if (geojson.geometries.length) {
            const wikidataPoint = geometry('Point', [lon, lat])
            const bounds = bbox(geometryCollection([geojson, wikidataPoint]))
            kartta.fitBounds(bounds, {
              padding: {top: 50, bottom:20, left: 50, right: 50},
              maxZoom: 19
            })
            this.lon = kartta.getCenter().lng.toFixed(4);
            this.lat = kartta.getCenter().lat.toFixed(4);
            this.zoom = kartta.getZoom().toFixed(2);
          }
        })
    })
  },
  methods: {
    fitTitle (title) {
      var newTitle = title
      return newTitle
    },
    navigate (target) {
      this.$router.push({ target })
    },
    getItemURL (value) {
      return '/' + value + '?language=' + this.$i18n.locale
    },
    getImageLink (value) {
      return value.replace(/\s/g, _) + '?width=500'
    }
  },
  computed: {
    wikidocumentaries () {
      return this.$store.state.wikidocumentaries
    },
    osmURL () {
      if (
        this.osmElements != undefined
      ) {
        return (
          "https://www.openstreetmap.org/#map=" + this.zoom + "/" + this.lat + "/" + this.lon
        );
      } else {
        return null;
      }
    }
  }
}
</script>
<style scoped>
.basemap {
  width: 100%;
  height: 50vh;
}
</style>
