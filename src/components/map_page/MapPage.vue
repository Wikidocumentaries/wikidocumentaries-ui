<template>
  <div class="map">
    <MapPageHeader :wikidocumentaries="wikidocumentaries"></MapPageHeader>
    <div class="greenbar"></div>
    <HistoricalMapsSearch :wikidocumentaries="wikidocumentaries"></HistoricalMapsSearch>
  </div>
</template>

<script>
import MapPageHeader from '@/components/map_page/MapPageHeader'
import HistoricalMapsSearch from '@/components/map_page/HistoricalMapsSearch'

export default {
  name: 'Map',
  props: {
      wikidocumentaries: Object
  },
  data () {
    return {
      msg: ''
    }
  },
  components: {
    MapPageHeader,
    HistoricalMapsSearch
  },
  computed: {
    testaus: function() {
        //console.log(this.wikidocumentaries);
        return "testaus";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
