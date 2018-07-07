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
            <vl-feature v-for="image in wikidocumentaries.images" v-bind:key="image.imageURL" v-if="image.geoLocations.length > 0">
                <vl-geom-point :coordinates="getFirstGeoLocationAsPoint(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-point>
                <!--<vl-geom-point v-if="getFirstGeoLocationGeomType(image) =='point'" :coordinates="getFirstGeoLocation(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-point>
                <vl-geom-linestring v-if="getFirstGeoLocationGeomType(image) =='linestring'" :coordinates="getFirstGeoLocation(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-linestring>
                <vl-geom-polygon v-if="getFirstGeoLocationGeomType(image) =='polygon'" :coordinates="getFirstGeoLocation(image)" :properties="{imageURL: image.imageURL, title: image.title}"></vl-geom-polygon>-->
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
        </vl-map>
    </div>
</template>

<script>
export default {
    name: 'TopicMap',
    props: {
        wikidocumentaries: Object,
        shownImages: Array
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
            topicOverLayOffset: [0, 0],
            shownImagesPopupOffsets: {}
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
    watch: {
        // shownImagesPopupOffsets: function(offsets, oldOffsets) {
        //     console.log("shownImagesPopupOffsets", offsets);
        // }
    },
    methods: {
        onShownImageLoad(event, index) {
            console.log(event, index);
            console.log( event.target.naturalWidth +' '+ event.target.naturalHeight );
            var width = - 100 / 2 - 6;

            var heightRatio = event.target.naturalHeight / event.target.naturalWidth;
            var height = - 100 * heightRatio - 40;

            this.$set(this.shownImagesPopupOffsets, 'i' + index, [width, height]);

            console.log(this.shownImagesPopupOffsets);
        },
        onMapPostCompose () {
            //console.log("onMapPostCompose");
            var topicMapPopup = this.$refs.topicMapPopup;
            //console.dir(topicMapPopup);
            //console.log(topicMapPopup.offsetWidth);
            //console.log(topicMapPopup.offsetHeight);

            if (topicMapPopup.offsetWidth != 0 && topicMapPopup.offsetHeight != 0) {
                this.topicOverLayOffset = [-topicMapPopup.offsetWidth / 2, -topicMapPopup.offsetHeight * 2];
            }
        },
        getFirstGeoLocationGeomType (image) {
            var type = null;

            if (image.geoLocations.length > 0) {
                var wkt = image.geoLocations[0];
                if (wkt.indexOf("POINT") != -1) {
                    type = "point";
                }
                else if (wkt.indexOf("LINESTRING") != -1) {
                    type = "linestring";
                }
                else if (wkt.indexOf("POLYGON") != -1) {
                    type = "polygon";
                }
                else if (wkt.indexOf("ENVELOPE") != -1) {
                    type = "polygon";
                }
            }
            return type;
        },
        getFirstGeoLocation(image) {
            var geoLocation = null;
            if (image.geoLocations.length > 0) {
                var wkt = image.geoLocations[0];
                if (wkt.indexOf("POINT") != -1) { 
                    // "POINT(24.9600002 60.1796223)"
                    var coordPart = wkt.split('(')[1].split(')')[0];
                    //console.log(coordPart);
                    geoLocation = coordPart.split(' ').map(Number);
                }
                else if (wkt.indexOf("LINESTRING") != -1) {
                    // "LINESTRING(24.9697848 60.1877939,24.9695072 60.1876021)"
                    var coordPart = wkt.split('(')[1].split(')')[0];
                    var pointParts = coordPart.split(',');
                    geoLocation = [];
                    for (var i = 0; i < pointParts.length; i++) {
                        geoLocation.push(pointParts[i].split(' ').map(Number));
                    }
                }
                else if (wkt.indexOf("POLYGON") != -1) {
                    // "POLYGON((24.7828131 60.0999549, 24.8356577 60.130414, 24.8513844 60.2249765, 24.8419098 60.2212043, 24.8347825 60.2585099, 24.8677628 60.2523073, 24.9473908 60.2784652, 24.9731653 60.2643801, 25.0209862 60.2893227, 25.0882105 60.2713417, 25.0823359 60.2496391, 25.1358461 60.2372286, 25.1598757 60.2488133, 25.1425242 60.2697779, 25.2545116 60.2952274, 25.2509121 60.2734979, 25.2273451 60.2611057, 25.240926 60.246305, 25.2014099 60.2181613, 25.2204176 60.1997262, 25.1800446 60.0987408, 25.1693516 59.9434386, 24.9423061 59.922486, 24.7828131 60.0999549))"
                    geoLocation = [];
                    var parenthesisPart = wkt.substring(wkt.indexOf('('));
                    //console.log(parenthesisPart);
                    var parenthesisPartInner = parenthesisPart.substr(1, parenthesisPart.length - 2);
                    //console.log(parenthesisPartInner);
                    var polygonPartCount = parenthesisPartInner.match(/\(/g).length;
                    //console.log(polygonPartCount);
                    var parts = parenthesisPartInner.split('(').slice(1);
                    //console.log(parts);
                    var partsWithoutParenthesis = [];
                    for (var i = 0; i < parts.length; i++) {
                        var part = null;
                        if (parts[i].substr(parts[i].length -1, 1) == ',') {
                            part = parts[i].substr(0, parts[i].length - 1);
                        }
                        else {
                            part = parts[i];
                        }
                        partsWithoutParenthesis.push(part.slice(0, -1));
                    }
                    //console.log(partsWithoutParenthesis);

                    for (var i = 0; i < partsWithoutParenthesis.length; i++) {
                        var pointParts = partsWithoutParenthesis[i].split(',');
                        var polygonPart = [];
                        for (var j = 0; j < pointParts.length; j++) {
                            polygonPart.push(pointParts[j].trim().split(' ').map(Number));
                        }
                        geoLocation.push(polygonPart);
                    }
                    //console.log(geoLocation);
                }
                else if (wkt.indexOf("ENVELOPE") != -1) {
                    // "ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"
                    var coordPart = wkt.split('(')[1].split(')')[0];
                    var pointParts = coordPart.split(',').map(Number);
                    //console.log(pointParts);
                    var envelopePolygon = [[pointParts[0], pointParts[3]], [pointParts[0], pointParts[2]], [pointParts[1], pointParts[2]], [pointParts[1], pointParts[3]], [pointParts[0], pointParts[3]]];
                    //console.log(envelopePolygon);
                    geoLocation = [envelopePolygon];
                }
            }
            return geoLocation;
        },
        getFirstGeoLocationAsPoint(image) {
            var geoLocation = this.getFirstGeoLocation(image)
            if (image.geoLocations.length > 0) {
                var wkt = image.geoLocations[0];
                if (wkt.indexOf("POINT") != -1) { 
                    // "POINT(24.9600002 60.1796223)"
                    var coordPart = wkt.split('(')[1].split(')')[0];
                    //console.log(coordPart);
                    geoLocation = coordPart.split(' ').map(Number);
                }
                else if (wkt.indexOf("LINESTRING") != -1) {
                    geoLocation = this.getCentroid(geoLocation);
                }
                else if (wkt.indexOf("POLYGON") != -1) {
                    geoLocation = this.getCentroid(geoLocation[0]); // We do not care of the possible holes in the polygon
                }
                else if (wkt.indexOf("ENVELOPE") != -1) {
                    // "ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"
                    var coordPart = wkt.split('(')[1].split(')')[0];
                    var pointParts = coordPart.split(',').map(Number);
                    //console.log(pointParts);
                    var lng = (pointParts[0] + pointParts[1]) / 2;
                    var lat = (pointParts[2] + pointParts[3]) / 2;
                    //var envelopePolygon = [[pointParts[0], pointParts[3]], [pointParts[0], pointParts[2]], [pointParts[1], pointParts[2]], [pointParts[1], pointParts[3]], [pointParts[0], pointParts[3]]];
                    //console.log(envelopePolygon);
                    geoLocation = [lng, lat];
                }
            }

            return geoLocation;
        },
        getCentroid(coords) {
            var center = coords.reduce(function (x,y) {
                return [x[0] + y[0]/coords.length, x[1] + y[1]/coords.length]; 
            }, [0,0])
            return center;
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

.popup-image {
    width: 100px;
}

</style>
