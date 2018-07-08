<template>
    <div ref="mapOverlay" class="map-overlay">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'MapOverlay',
    props: {
        map: Object,
        position: Array,
        offset: Array,
        autoPan: Boolean,
        autoPanMargin: Number
    },
    data () {
        return {
            msg: '',
            overlay: null
        }
    },
    mounted: function () {
        var ol = this.$ol;
        //console.log(map);
        var mapOverlay = this.$refs.mapOverlay;
        this.overlay = new ol.Overlay({
            element: mapOverlay,
            stopEvent: false,
            position: ol.proj.fromLonLat(this.position),
            offset: this.offset,
            autoPan: this.autoPan,
            autoPanMargin: this.autoPanMargin
        });
        this.map.addOverlay(this.overlay);
        if (this.autoPan) {
            this.overlay.setPosition(ol.proj.fromLonLat(this.position));
        }
    },
    watch: {
        offset: function(newOffset, oldOffset) {
            this.overlay.setOffset(newOffset);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-overlay {
    position: absolute;

}

</style>
