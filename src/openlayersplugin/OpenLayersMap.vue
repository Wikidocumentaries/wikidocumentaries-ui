<template>
    <div ref="map" class="ol-map">
        <slot :map="map"></slot>
    </div>
</template>

<script>
export default {
    name: 'OpenLayersMap',
    props: {
        link: String,
        target: String,
        shouldShowTopicPopup: Boolean,

    },
    data () {
        return {
            map: null,
            topicFeature: null,
        }
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
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
                    zoom: 17
                })
            }
            else {
                view = new ol.View({
                    center: ol.proj.fromLonLat([0, 0]),
                    zoom: 1
                })
            }

            this.map = new ol.Map({
                target: target,
                layers: [
                    new ol.layer.Tile({
                        source: new this.$ol.source.OSM()
                    })
                ],
                view: view
            });

            if (this.topicPointCoordinates() != null) {
                this.topicFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(this.topicPointCoordinates())),
                    
                });
                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: "/static/wikifont/svgs/mod/uniE851 - mapPin - red.svg",
                        scale: 1.4
                    })
                });
                this.topicFeature.setStyle(iconStyle);

                var vectorSource = new ol.source.Vector({
                    features: [this.topicFeature]
                });
                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    zIndex: 1000,
                });

                this.map.addLayer(vectorLayer);

                var topicMapPopup = this.$refs.topicMapPopup;
                //console.dir( topicMapPopup );
                //console.log( topicMapPopup.offsetWidth +' '+ topicMapPopup.offsetHeight );
                var offset = [-topicMapPopup.offsetWidth / 2, -topicMapPopup.offsetHeight * 2];
                var overlay = new ol.Overlay({
                    element: topicMapPopup,
                    stopEvent: false,
                    position: ol.proj.fromLonLat(this.topicPointCoordinates()),
                    offset: offset
                });
                this.map.addOverlay(overlay);
                
                this.map.on('click', this.handleMapClick);

                //this.createImageFeatures();
            }
        },
        handleMapClick (event) {
            var me = this;
            this.map.forEachFeatureAtPixel(event.pixel,
                function(feature) {
                    if (feature == me.topicFeature) {
                        me.shouldShowTopicPopup = !me.shouldShowTopicPopup;
                    }
                }
            );
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
        },
        // createImageFeatures () {
        //     var ol = this.$ol;

        //     var features = [];
        //     for (var i = 0; i < this.wikidocumentaries.images.length; i++) {
        //         var image = this.wikidocumentaries.images[i];
        //         if (image.geoLocations.length > 0) {
        //             var feature = new ol.Feature({
        //                 geometry: new ol.geom.Point(ol.proj.fromLonLat(this.getFirstGeoLocationAsPoint(image))),
        //             });
        //             features.push(feature);
        //         }
        //     }
        //     var vectorSource = new ol.source.Vector({
        //         features: features
        //     });
        //     var vectorLayer = new ol.layer.Vector({
        //         source: vectorSource
        //     });
        //     this.map.addLayer(vectorLayer);
        // },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.map-popup-container {
    white-space: nowrap;
    position: absolute;
}
.map-popup {
	position: relative;
	background: #ffffff;
	border: 1px solid #000000;
    padding: 12px 6px;
}
.map-popup:after, .map-popup:before {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.map-popup:after {
	border-color: rgba(255, 255, 255, 0);
	border-top-color: #ffffff;
	border-width: 8px;
	margin-left: -8px;
}
.map-popup:before {
	border-color: rgba(0, 0, 0, 0);
	border-top-color: #000000;
	border-width: 9px;
	margin-left: -9px;
}

.popup-image {
    width: 100px;
}

.topic-popup-hidden {
    display: none;
}

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