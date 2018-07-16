<template>
  <div class="map">
    <MapPageHeader></MapPageHeader>
    <div class="greenbar"></div>
    <HistoricalMapsSearch></HistoricalMapsSearch>
  </div>
</template>

<script>
import MapPageHeader from '@/components/map_search_page/MapPageHeader'
import HistoricalMapsSearch from '@/components/map_search_page/HistoricalMapsSearch'

export default {
  name: 'MapSearchPage',
  props: {
  },
  computed: {
    wikidocumentaries () {
          return this.$store.state.wikidocumentaries;
      },
  },
  data () {
    return {
    }
  },
  components: {
    MapPageHeader,
    HistoricalMapsSearch
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
