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

            var view = null;

            if (this.topicPointCoordinates() != null) {
                view = new ol.View({
                    center: ol.proj.fromLonLat(this.topicPointCoordinates()),
                    zoom: 14
                })
            }
            else {
                view = new ol.View({
                    center: ol.proj.fromLonLat([0, 0]),
                    zoom: 1
                })
            }

            var map = new ol.Map({
                target: 'placeMatchMap',
                layers: [
                    new ol.layer.Tile({
                        source: new this.$ol.source.OSM()
                    })
                ],
                view: view
            });
        },
        topicPointCoordinates () {
            var coords = null;
            if (this.wikidocumentaries.geo.location != null) {
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
