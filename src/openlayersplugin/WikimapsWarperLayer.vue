<template>
</template>

<script>

export default {
    name: 'WikimapsWarperLayer',
    props: {
        map: Object,
    },
    data () {
        return {
            layer: null,
        }
    },
    computed: {
        basemaps () {
            return this.$store.state.basemaps;
        },
        selectedBasemapID() {
            return this.$store.state.selectedBasemapID;
        }
    },
    watch: {
        selectedBasemapID:  function(newID, oldID) {
            this.removeLayer();
            this.createAndAddLayer();
        },
        map: function(newMap, oldMap) {
            if (oldMap == null && newMap != null) {
                this.removeLayer();
                this.createAndAddLayer();
            }
        }
    },
    mounted: function () {
        if (this.map) {
            this.removeLayer();
            this.createAndAddLayer();
        }
        //this.map.addOverlay(this.overlay);
    },
    beforeDestroy: function () {
        this.removeLayer();
    },
    render: function(createElement) {
        return createElement(); // avoid warning message
    },
    methods: {
        createAndAddLayer() {
            var ol = this.$ol;

            var warperID = null;
            var basemapInfo = null;

            for (var i = 0; this.basemaps.length; i++) {
                if (this.basemaps[i].id == this.selectedBasemapID) {
                    warperID = this.basemaps[i].warperID;
                    basemapInfo = this.basemaps[i];
                    break;
                }
            }

            var url = "http://warper.wmflabs.org/maps/tile/" + warperID + "/{z}/{x}/{y}.png";

            console.log(url);

            var source = new ol.source.XYZ({
                 url: url,
                 attributions: [
                     'For the historical basemap, see credits and copyright from <a href="https://commons.wikimedia.org/wiki/' + basemapInfo.id + '" target="_blank">Wikimedia Commons</a>.',
                     'Rectified map from <a href="http://warper.wmflabs.org/maps/' + warperID + '" target="_blank">Wikimaps Warper</a>.'
                 ]
            });

            this.layer = new ol.layer.Tile({
                source: source
            });

            this.map.addLayer(this.layer);
        },
        removeLayer() {
            if (this.layer != null && this.map != null) {
                this.map.removeLayer(this.layer);
            }
        }
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
