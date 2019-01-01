<template>
    <div class="map-component">
        <div class="toolbar">
            <div class="header-title">{{ $t('topic_page.TopicMap.headerTitle') }}</div>
            <ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('general.menus.actionMenuTitle') }}</div>
                <TransparencySliderMenuItem slot="custom-menu-item"></TransparencySliderMenuItem>
            </ToolbarMenu>
        </div>
        <div id="map" class="map">
            <div ref="topicMapPopup" class="map-popup-container" :class="{ 'topic-popup-hidden': !shouldShowTopicPopup }">
                <div class="map-popup">
                {{ wikidocumentaries.title }}
                </div>
            </div>
            <div v-for="(image, index) in shownImages" :key="image.infoURL">
                <MapOverlay v-if="image.geoLocations.length > 0"  :map="map" :position="getFirstGeoLocationAsPoint(image)" :offset=" (shownImagesPopupOffsets['i' + index] == undefined ? [0, 0] : shownImagesPopupOffsets['i' + index] )" :autoPan=" ( shownImages.length > 1 ) ? false  : true " :autoPanMargin="200" :overlayGroupItemCount="shownImages.length">
                    <div class="map-popup-container">
                        <div class="map-popup">
                            <img :src="image.thumbURL" class="popup-image" v-on:load="onShownImageLoad($event, index)">
                        </div>
                    </div>
                </MapOverlay>
            </div>
            <div v-if="showNearbyPlaces">
                <div v-for="item in nearbyWikiItems" :key="item.wikidata.id">
                    <MapOverlay v-if="item.wikidata.sitelinks[language + 'wiki'] != undefined" :map="map" :position="item.position" :offset="[0,0]" :autoPan="false" :autoPanMargin="200" :overlayGroupItemCount="nearbyWikiItems.length">
                        <div class="map-popup-nearby-place-container">
                            <a :href="getSiteLink(item.wikidata.sitelinks[language + 'wiki'])">{{ item.wikidata.sitelinks[language + 'wiki'].title }}</a>
                        </div>
                    </MapOverlay>
                </div>
            </div>
            <WikimapsWarperLayer v-for="basemapInfo in selectedBasemaps" :key="basemapInfo.server + basemapInfo.warperID" ref="warperLayer" :map="map" :basemapInfo="basemapInfo"></WikimapsWarperLayer>
        </div>
        <BaseMapDialog :shouldShowDialog="showBaseMapDialog" @close="showBaseMapDialog = false">
        </BaseMapDialog>
        <TransparencyDialog :shouldShow="showBasemapTransparencyDialog" @close="showBasemapTransparencyDialog = false">
        </TransparencyDialog>
    </div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'
import TransparencySliderMenuItem from '@/components/menu/TransparencySliderMenuItem'
import MapOverlay from '@/openlayersplugin/MapOverlay'
import BaseMapDialog from '@/components/topic_page/BaseMapDialog'
import TransparencyDialog from '@/components/topic_page/TransparencyDialog'
import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'

import turf_distance from '@turf/distance/index'

const MENU_ACTIONS = {
    CHOOSE_BACKGROUND_MAP: 0,
    SET_BACKGROUND_MAP_TRANSPARENCY: 1,
    HIDE_PHOTOS: 2,
    CHOOSE_TIMELINE_MAPS: 3,
    SHOW_NEARBY_TOPICS: 4,
    HIDE_NEARBY_TOPICS: 5,
}

export default {
    name: 'TopicMap',
    props: {
    },
    data () {
        return {
            map: null,
            topicFeature: null,
            topicVectorLayer: null,
            topicOverlay: null,
            shouldShowTopicPopup: true,
            shownImagesPopupOffsets: {},
            imageFeaturesLayer: null,
            toolbarActionMenuItems: [
                {
                    id: MENU_ACTIONS.CHOOSE_BACKGROUND_MAP,
                    text: 'topic_page.TopicMap.chooseHistoricalBasemapMenuText'
                },
                // {
                //     id: MENU_ACTIONS.SET_BACKGROUND_MAP_TRANSPARENCY,
                //     text: "Aseta taustakartan läpinäkyvyys..."
                // },
                {
                    id: MENU_ACTIONS.HIDE_PHOTOS,
                    text: 'topic_page.TopicMap.hideImagesMenuText'
                },
                // {
                //     id: MENU_ACTIONS.CHOOSE_TIMELINE_MAPS,
                //     text: 'topic_page.TopicMap.chooseTimelineMapsMenuText'
                // },
                {
                    id: MENU_ACTIONS.SHOW_NEARBY_TOPICS,
                    text: 'topic_page.TopicMap.showNearbyPlacesMenuText'
                },
            ],
            showBaseMapDialog: false,
            showBasemapTransparencyDialog: false,
            showNearbyPlaces: false
        }
    },
    components: {
        ToolbarMenu,
        TransparencySliderMenuItem,
        MapOverlay,
        BaseMapDialog,
        TransparencyDialog,
        WikimapsWarperLayer
    },
    mounted: function () {
        this.createMap();
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        shownImages () {
            return this.$store.state.shownImages;
        },
        selectedBasemaps() {
            //console.log("selectedBasemaps changed");
            return this.$store.state.selectedBasemaps;
        },
        topicLocation() {
            return this.wikidocumentaries.geo.location;
        },
        nearbyWikiItems() {
            return this.$store.state.nearbyWikiItems;
        },
        language() {
            return this.$i18n.locale;
        }
    },
    watch: {
        topicLocation: function(newLocation, oldLocation) {
            //console.log("topicLocation", oldLocation, newLocation);
            this.setTopicOnMap();
            this.$store.commit('setShouldFitMapToBasemap', true);
            this.getHistoricalBasemapsforTheArea();
        },
        shownImages: function(images, oldImages) {
            var ol = this.$ol;

            //console.log("shownImages");
            this.shouldShowTopicPopup = false;

            if (images.length > 1) {
                var coordinates = [];
                for (var i = 0; i < images.length; i++) {
                    if (images[i].geoLocations.length > 0) {
                        coordinates.push(ol.proj.fromLonLat(this.getFirstGeoLocationAsPoint(images[i])));
                    }
                }
                var extent = ol.extent.boundingExtent(coordinates);

                var view = this.map.getView();
                view.fit(extent, {
                    padding: [150, 50, 50, 50]
                });
            }
            else {
                
            }
        },
        nearbyWikiItems: function(items, oldItems) {
            //console.log("watch nearbyWikiItems", items);
        }
        // wikidocumentaries: function (oldWikidocumentaries, newWikidocumentaries) {
        //     this.createImageFeatures();
        // }
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

            this.map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new this.$ol.source.OSM()
                    })
                ],
                view: view
            });

            this.setTopicOnMap();
            if (this.topicLocation != null) {
                this.$store.commit('setShouldFitMapToBasemap', true);
            }
            this.getHistoricalBasemapsforTheArea();
            
            this.map.on('click', this.handleMapClick);

            this.createImageFeatures();

        },
        setTopicOnMap() {
            var ol = this.$ol;

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

                if (this.topicVectorLayer != null) {
                    this.map.removeLayer(this.topicVectorLayer);
                    this.topicVectorLayer = null;
                }

                this.topicVectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    zIndex: 1000,
                });

                this.map.addLayer(this.topicVectorLayer);

                var topicMapPopup = this.$refs.topicMapPopup;
                //console.dir( topicMapPopup );
                //console.log( topicMapPopup.offsetWidth +' '+ topicMapPopup.offsetHeight );
                var offset = [-topicMapPopup.offsetWidth / 2, -topicMapPopup.offsetHeight * 2];

                if (this.topicOverlay != null) {
                    this.map.removeOverlay(this.topicOverlay);
                    this.topicVectorLayer = null;
                }
                this.topicOverlay = new ol.Overlay({
                    element: topicMapPopup,
                    stopEvent: false,
                    position: ol.proj.fromLonLat(this.topicPointCoordinates()),
                    offset: offset
                });
                this.map.addOverlay(this.topicOverlay);
            }
        },
        getHistoricalBasemapsforTheArea() {
            //console.log("getHistoricalBasemapsforTheArea");

            var ol = this.$ol;

            var extent = this.map.getView().calculateExtent();
            //console.log(extent);
            var bottomLeftLonLat3857 = [extent[0], extent[1]];
            var topLeftLonLat3857 = [extent[0], extent[3]];
            var bottomRightLonLat3857 = [extent[2], extent[1]];
            var topRightLonLat3857 = [extent[2], extent[3]];
            var bottomLeftLonLat = ol.proj.transform(bottomLeftLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var topLeftLonLat = ol.proj.transform(topLeftLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var bottomRightLonLat = ol.proj.transform(bottomRightLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var topRightLonLat = ol.proj.transform(topRightLonLat3857, 'EPSG:3857', 'EPSG:4326');

            var params = {
                leftLon: bottomLeftLonLat[0],
                bottomLat: bottomLeftLonLat[1],
                rightLon: topRightLonLat[0],
                topLat: topRightLonLat[1],
            }

            this.$store.dispatch('getHistoricalBasemaps', params);
        },
        getSiteLink(sitelink) {
            var link = '/wiki/';
            link += encodeURIComponent(sitelink.title);
            return link;
        },
        createImageFeatures () {
            var ol = this.$ol;

            if (this.imageFeaturesLayer != null) {
                this.map.removeLayer(this.imageFeaturesLayer);
                this.imageFeaturesLayer = null;
            }

            var features = [];
            for (var i = 0; i < this.wikidocumentaries.images.length; i++) {
                var image = this.wikidocumentaries.images[i];
                if (image.geoLocations.length > 0) {
                    var feature = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat(this.getFirstGeoLocationAsPoint(image))),
                    });
                    features.push(feature);
                }
            }
            var vectorSource = new ol.source.Vector({
                features: features
            });
            this.imageFeaturesLayer = new ol.layer.Vector({
                source: vectorSource
            });
            this.map.addLayer(this.imageFeaturesLayer);
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
        onShownImageLoad(event, index) {
            //console.log(event, index);
            //console.log( event.target.naturalWidth +' '+ event.target.naturalHeight );
            var width = - 100 / 2 - 7;

            var heightRatio = event.target.naturalHeight / event.target.naturalWidth;
            var height = - 100 * heightRatio - 40;

            this.$set(this.shownImagesPopupOffsets, 'i' + index, [width, height]);

            //console.log(this.shownImagesPopupOffsets);
        },
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case MENU_ACTIONS.HIDE_PHOTOS:
                this.$store.commit('setImagesShownOnMap', []);
                break;
            case MENU_ACTIONS.SET_BACKGROUND_MAP_TRANSPARENCY:
                this.showBasemapTransparencyDialog = true;
                break;
            case MENU_ACTIONS.CHOOSE_BACKGROUND_MAP:
                this.showBaseMapDialog = true;
                break;
            case MENU_ACTIONS.CHOOSE_TIMELINE_MAPS:
                // TODO
                break;
            case MENU_ACTIONS.SHOW_NEARBY_TOPICS:
                this.getNearbyPlaces();
                this.showNearbyPlaces = true;
                this.removeMenuItem(MENU_ACTIONS.SHOW_NEARBY_TOPICS);
                this.addMenuItem({
                    id: MENU_ACTIONS.HIDE_NEARBY_TOPICS,
                    text: 'topic_page.TopicMap.hideNearbyPlacesMenuText'
                });
                break;
            case MENU_ACTIONS.HIDE_NEARBY_TOPICS:
                this.showNearbyPlaces = false;
                this.removeMenuItem(MENU_ACTIONS.HIDE_NEARBY_TOPICS);
                this.addMenuItem({
                    id: MENU_ACTIONS.SHOW_NEARBY_TOPICS,
                    text: 'topic_page.TopicMap.showNearbyPlacesMenuText'
                });
            }
        },
        removeMenuItem(id) {
            for (var i = 0; i < this.toolbarActionMenuItems.length; i++) {
                if (this.toolbarActionMenuItems[i].id == id) {
                    this.toolbarActionMenuItems.splice(i, 1);
                    break;
                } 
            }
        },
        addMenuItem(item) {
            this.toolbarActionMenuItems.push(item);
        },
        getNearbyPlaces() {
            var ol = this.$ol;
            var extent = this.map.getView().calculateExtent();
            //console.log(extent);
            var bottomLeftLonLat3857 = [extent[0], extent[1]];
            var topLeftLonLat3857 = [extent[0], extent[3]];
            var bottomRightLonLat3857 = [extent[2], extent[1]];
            var topRightLonLat3857 = [extent[2], extent[3]];
            var bottomLeftLonLat = ol.proj.transform(bottomLeftLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var topLeftLonLat = ol.proj.transform(topLeftLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var bottomRightLonLat = ol.proj.transform(bottomRightLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var topRightLonLat = ol.proj.transform(topRightLonLat3857, 'EPSG:3857', 'EPSG:4326');
            //console.log(bottomLeftLonLat, topLeftLonLat, bottomRightLonLat);
            var heightLength = turf_distance(bottomLeftLonLat, topLeftLonLat);
            var widthLength = turf_distance(bottomLeftLonLat, bottomRightLonLat);
            var lon = bottomLeftLonLat[0] + (bottomRightLonLat[0] - bottomLeftLonLat[0]) / 2;
            var lat = bottomLeftLonLat[1] + (topLeftLonLat[1] - bottomLeftLonLat[1]) / 2;
            //console.log("lon: ", lon);
            //console.log("lat: ", lat);
            var distance = heightLength > widthLength ? heightLength : widthLength * 1000 / 2;
            //console.log(distance);
            distance = distance < 10000 ? distance: 10000;
            var params = {
                topic: this.wikidocumentaries.title,
                language: this.$i18n.locale,
                lon: lon, 
                lat: lat,
                radius: distance,
            }

            this.$store.dispatch('getNearbyPlaces', params);
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
                        var trimmed = parts[i].trim();
                        if (trimmed.substr(trimmed.length - 1, 1) == ',') {
                            part = trimmed.substr(0, trimmed.length - 1);
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

/* .map-component {
    width: calc(100% - 10px);
} */

.map {
    width: 100%;
    height: 400px;
    position: relative;
}

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

.map-popup-nearby-place-container {
    position: relative;
	background: #ffffff80;
    padding: 4px 10px;
    border: #333 1px solid;
}

.map-popup-nearby-place-container a {
    color: #333;
    box-shadow: none;
}

.map-popup-nearby-place-container:hover {
    background: #333;
    color: white;
    z-index: 2;
}

.map-popup-nearby-place-container:hover a {
    color: white;
}

</style>
