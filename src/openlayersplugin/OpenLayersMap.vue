<template>
    <div ref="map" class="ol-map">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'OpenLayersMap',
    props: {
        link: String
    },
    data () {
        return {
            msg: '',
        }
    },
    mounted: function () {
       //this.createMap();
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
        
        
        <!--<vl-map class="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px" v-on=" ( topicOverLayOffset[0] == 0 || topicOverLayOffset[1] == 0 ) ? { postcompose: onMapPostCompose } : {}">
            <vl-view :zoom.sync="map.zoom" :center="topicPointCoordinates" :rotation.sync="map.rotation"></vl-view>
            <vl-feature v-if="wikidocumentaries.geo.location != ''" id="topicPosition">
                <vl-geom-point :coordinates="topicPointCoordinates"></vl-geom-point>
                <vl-style-box>
                    <vl-style-icon class="topic-icon" src="/static/wikifont/svgs/mod/uniE851 - mapPin - red.svg" :scale="1.4" :anchor="[0.5, 1]"></vl-style-icon>
                </vl-style-box>
            </vl-feature>
            <vl-overlay v-if="isTopicPointSelected" :position="topicPointCoordinates" :offset="topicOverLayOffset">
                <div ref="topicMapPopup" class="map-popup-container">
                    <div class="map-popup">
                    {{ wikidocumentaries.title }}
                    </div>
                </div>
            </vl-overlay>
            <vl-feature v-for="image in wikidocumentaries.images" v-bind:key="image.imageURL" v-if="image.geoLocations.length > 0">
                <vl-geom-point :coordinates="getFirstGeoLocationAsPoint(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-point>
                <vl-geom-point v-if="getFirstGeoLocationGeomType(image) =='point'" :coordinates="getFirstGeoLocation(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-point>
                <vl-geom-linestring v-if="getFirstGeoLocationGeomType(image) =='linestring'" :coordinates="getFirstGeoLocation(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-linestring>
                <vl-geom-polygon v-if="getFirstGeoLocationGeomType(image) =='polygon'" :coordinates="getFirstGeoLocation(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-polygon>
            </vl-feature>
            <vl-interaction-select :features.sync="selectedFeatures">
            </vl-interaction-select>
            <vl-overlay v-for="(image, index) in shownImages" v-bind:key="image.infoURL" :position="getFirstGeoLocationAsPoint(image)" :auto-pan="true" :offset=" (shownImagesPopupOffsets['i' + index] == undefined ? [0, 0] : shownImagesPopupOffsets['i' + index] )">
                <div class="map-popup-container">
                    <div class="map-popup">
                        <img :src="image.imageURL" class="popup-image" v-on:load="onShownImageLoad($event, index)">
                    </div>
                </div>
            </vl-overlay>
            <vl-layer-tile id="osm">
                <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
        </vl-map>-->