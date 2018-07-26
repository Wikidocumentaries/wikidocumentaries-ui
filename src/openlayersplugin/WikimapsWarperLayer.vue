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
            basemapInfo: null,
        }
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        basemaps () {
            return this.$store.state.basemaps;
        },
        selectedBasemap() {
            return this.$store.state.selectedBasemap;
        },
        // selectedBasemapID() {
        //     return this.$store.state.selectedBasemap.id;
        // },
        selectedBasemapOpacity() {
            return this.$store.state.selectedBasemapOpacity;
        },
        shouldFitMapToBasemap() {
            return this.$store.state.shouldFitMapToBasemap;
        }
    },
    watch: {
        selectedBasemap:  function(newBasemap, oldBasemap) {
            //console.log(newBasemap);
            this.removeLayer();
            this.createAndAddLayer();
        },
        map: function(newMap, oldMap) {
            if (oldMap == null && newMap != null) {
                this.removeLayer();
                this.createAndAddLayer();
            }
        },
        selectedBasemapOpacity: function(newOpacity, oldOpacity) {
            if (this.layer != null) {
                this.layer.setOpacity(newOpacity);
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
            var server = null;

            //console.log(this.basemaps);
            //console.log(this.selectedBasemap);

            for (var i = 0; i < this.basemaps.length; i++) {
                //console.log(i);
                //console.log(this.basemaps);
                //console.log(this.basemaps[i].warperID);
                //console.log(this.selectedBasemap);

                if (this.basemaps[i].warperID == this.selectedBasemap.warperID &&
                    this.basemaps[i].server == this.selectedBasemap.server) {
                    this.basemapInfo = this.basemaps[i];
                    warperID = this.basemaps[i].warperID;
                    server = this.basemaps[i].server;
                    break;
                }
            }

            var url = server + "maps/tile/" + warperID + "/{z}/{x}/{y}.png";

            //console.log(url);

            var source = new ol.source.XYZ({
                 url: url,
                 attributions: [
                     this.$t('openlayersplugin.WikimapsWarperLayer.attribution1PrefixText') + ' <a href="https://commons.wikimedia.org/wiki/' + this.basemapInfo.id + '" target="_blank">Wikimedia Commons</a>.',
                     this.$t('openlayersplugin.WikimapsWarperLayer.attribution2PrefixText') + ' <a href="' + server + 'maps/' + warperID + '" target="_blank">Wikimaps Warper</a>.'
                 ]
            });

            this.layer = new ol.layer.Tile({
                source: source,
                opacity: this.selectedBasemapOpacity
            });

            this.map.addLayer(this.layer);
            if (this.shouldFitMapToBasemap) {
                this.fitMapToLayer();
            }
        },
        removeLayer() {
            if (this.layer != null && this.map != null) {
                this.map.removeLayer(this.layer);
            }
        },
        fitMapToLayer() {
            var ol = this.$ol;

            if (this.basemapInfo != null && this.basemapInfo.bbox != undefined) {
                var layerExtent = this.basemapInfo.bbox.split(',').map(Number);
                //console.log(layerExtent);
                var bottomLeft = ol.proj.fromLonLat([layerExtent[0], layerExtent[1]]);
                var topRight = ol.proj.fromLonLat([layerExtent[2], layerExtent[3]]);
                var projectedExtent = bottomLeft.concat(topRight);
                this.map.getView().fit(projectedExtent);
            }

            this.$store.commit('setShouldFitMapToBasemap', false);
        }
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
