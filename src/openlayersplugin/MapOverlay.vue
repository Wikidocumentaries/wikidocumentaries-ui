<template>
    <div ref="mapOverlay" class="map-overlay">
        <div>
            <slot></slot>
        </div>
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
        autoPanMargin: Number,
        overlayGroupItemCount: Number
    },
    data () {
        return {
            overlay: null
        }
    },
    mounted: function () {
      this.$nextTick(function() {
        this.$nextTick(function() {
          var ol = this.$ol;
          if (this.map) {
            // console.log("MapOverlay map:", this.map);
            // var mapOverlay = this.$refs.mapOverlay; // Unused variable??
            this.overlay = new ol.Overlay({
                element: this.$el.children[0],
                stopEvent: false,
                position: ol.proj.fromLonLat(this.position),
                offset: this.offset,
                autoPan: this.autoPan,
                autoPanMargin: this.autoPanMargin
            });
            this.map.addOverlay(this.overlay);
            // if (this.autoPan && this.overlay && this.position && ol && ol.proj) { // Keeps erring out!
            //     this.overlay.setPosition(ol.proj.fromLonLat(this.position));
            // }
          }
        });
      });
    },
    beforeDestroy: function () {
      if (this.overlay) this.overlay.setElement(undefined);
    },
    watch: {
        offset: function(newOffset, oldOffset) {
            if (this.overlay) this.overlay.setOffset(newOffset);
        },
        // position: function(newPosition, oldPosition) {
        //   var ol = this.$ol;
        //   console.log("MapOverlay map:", this.map);
        //   // var mapOverlay = this.$refs.mapOverlay; // Unused variable??
        //   this.overlay = new ol.Overlay({
        //       element: this.$el.children[0],
        //       stopEvent: false,
        //       position: ol.proj.fromLonLat(newPosition),
        //       offset: this.offset,
        //       autoPan: this.autoPan,
        //       autoPanMargin: this.autoPanMargin
        //   });
        //   this.map.addOverlay(this.overlay);
        //   if (this.autoPan) {
        //       this.overlay.setPosition(ol.proj.fromLonLat(newPosition));
        //   }
        // },
        overlayGroupItemCount: function(count, oldCount) {
            var ol = this.$ol;
            //console.log(count);
            if (count == 1) {
                this.map.getView().animate({
                    center: ol.proj.fromLonLat(this.position)
                });
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-overlay {
    position: absolute;
    /* top: 0;
    left: 0; */
}

</style>
