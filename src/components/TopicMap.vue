<template>
    <div class="map-component">
        <div class="toolbar">{{ header.title }}</div>
        <vl-map class="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
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
            <vl-interaction-select :features.sync="selectedFeatures">
            </vl-interaction-select>
            <vl-layer-tile id="osm">
                <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
        </vl-map>
    </div>
</template>

<script>
export default {
    name: 'TopicMap',
    props: {
        wikidocumentaries: Object
    },
    data () {
        return {
            map: {
                zoom: 17,
                center: [27.1, 65.2],
                rotation: 0
            },
            header: {
                title: 'Sijainti kartalla'
            },
            selectedFeatures: [],
            initialMap: true,
            topicOverLayOffset: [0, 0]
        }
    },
    computed: {
        topicPointCoordinates: function () {
            var coords = this.map.center;
            if (this.wikidocumentaries.geo.location != "") {
                //console.log(this.wikidocumentaries.geo.location)
                var coordPart = this.wikidocumentaries.geo.location.split('(')[1].split(')')[0];
                //console.log(coordPart);
                coords = coordPart.split(' ').map(Number);
                //console.log(coords);
                this.map.center = coords;
            }

            return coords;
        },
        isTopicPointSelected: function () {
            var result = false;
            var found = false;
            for (var i = 0; i < this.selectedFeatures.length; i++) {
                //console.log(this.selectedFeatures[i]);
                if (this.selectedFeatures[i].id == "topicPosition") {
                    if (this.initialMap) {
                        this.selectedFeatures = []
                        this.initialMap = false;
                        result = false;
                    }
                    else {
                        result = true;

                    }
                    found = true;
                    break;
                }
            }
            if (this.initialMap && !found) {
                result = true;
            }
            return result;
        }
    },
    // watch: {
    //     selectedFeatures: function(features) {
    //         if (features.length > 0) {
    //             //console.log(features[0].id);
    //             if (features[0].id == "topicPosition") {

    //             }
    //         }
    //     }
    // },
    methods: {
        showImageOnMap(image) {
            console.log("showImageOnMap", image);
        },
        onMapPostCompose () {
            //console.log("onMapPostCompose");
            var topicMapPopup = this.$refs.topicMapPopup;
            //console.dir(topicMapPopup);
            //console.log(topicMapPopup.offsetWidth);
            //console.log(topicMapPopup.offsetHeight);
            this.topicOverLayOffset = [-topicMapPopup.offsetWidth / 2, -topicMapPopup.offsetHeight * 2];

            if (topicMapPopup.offsetWidth != 0 && topicMapPopup.offsetHeight != 0) {
                this
            }
        }
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


</style>
