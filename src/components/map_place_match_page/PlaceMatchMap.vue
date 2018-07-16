<template>
    <div id="placeMatchMap" class="map-place-match-map">
    </div>
</template>

<script>

export default {
  name: 'PlaceMatchMap',
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
  },
  mounted: function () {
       this.createMap();
    },
    methods: {
        createMap() {
            var ol = this.$ol;

            var map = new ol.Map({
                target: 'placeMatchMap',
                layers: [
                    new ol.layer.Tile({
                        source: new this.$ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat(this.topicPointCoordinates()),
                    zoom: 17
                })
            });
        },
        topicPointCoordinates () {
            var coords = [];
            if (this.wikidocumentaries.geo.location != "") {
                //console.log(this.wikidocumentaries.geo.location)
                var coordPart = this.wikidocumentaries.geo.location.split('(')[1].split(')')[0];
                //console.log(coordPart);
                coords = coordPart.split(' ').map(Number);
                //console.log(coords);
            }

            return coords;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.map {
    width: 100%;
    height: 400px;
}

</style>
