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
import mapboxgl from 'mapbox-gl'
import { MAPBOX_AT } from '@/common/tokens'
import axios from 'axios'
import wdk from 'wikidata-sdk'
import bbox from '@turf/bbox'

export default {
  name: 'Kartta',
  components: {
  },
  data () {
    return {
      placeholder: true
    }
  },
  mounted () {
    const lat = this.$store.state.wikidocumentaries.wikidata.geo.lat
    const lon = this.$store.state.wikidocumentaries.wikidata.geo.lon
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

    const marker = new mapboxgl.Marker({draggable: true})
      .setLngLat([lon, lat])
      .addTo(kartta)

    kartta.on('load', function () {
      // Request for Wikidata linked shape from OpenStreetMap data
      fetch('https://maps.wikimedia.org/geoshape?getgeojson=1&ids=' + wikidataId)
        .then(response => response.json())
        .then(data => {
          kartta.addSource('osmshape', {
            type: 'geojson',
            data: data
          })

          // Add layer for osm shape outline and fill below any label layers
          kartta.addLayer({
            'id': 'osmlayer-line',
            'type': 'line',
            'source': 'osmshape',
            'layout': {},
            'paint': {
              'line-color': '#f05800',
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

          kartta.addLayer({
            'id': 'osmlayer-fill',
            'type': 'fill',
            'source': 'osmshape',
            'layout': {},
            'paint': {
              'fill-color': '#ffd24d',
              'fill-opacity': 0.2
            }
          }, 'waterway-label')

          // Fit map to shape if available
          if (data.features.length) {
            kartta.fitBounds(bbox(data),
              {
                padding: 20
              })
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
