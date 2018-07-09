<template>
    <div class="maps">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-gear" :items="toolbarSettingsMenuItems" @doMenuItemAction="onDoMenuItemAction"></ToolbarMenu>
            <!--<ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarItems"></ToolbarMenu>-->
        </div>
        <div v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="historical-maps">
            <div v-masonry-tile class="grid-item" v-for="historicalMap in historicalMaps" v-bind:key="historicalMap.id">
                <img v-bind:src="historicalMap.images[0]" class="thumb-image" v-bind:alt="historicalMap.title"/>
                <!--<div class="thumb-title">{{ image.title }}</div>
                <div class="thumb-credit">{{ image.credit }}</div>-->
            </div>
        </div>
        <!--<button type="button" @click="show">Show</button>-->
    </div>
</template>

<script>
import turf_distance from '@turf/distance/index'
import ToolbarMenu from '@/components/ToolbarMenu'

export default {
    name: 'HistoricalMapsSearch',
    props: {
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        map () {
            return this.$store.state.historicalMapSearchPageMap;
        },
        historicalMaps () {
            return this.$store.state.historicalMaps;
        }
    },
    data () {
        return {
            header: {
                title: 'Etsi historiallisia karttoja'
            },
            toolbarSettingsMenuItems: [
                {
                    id: 0,
                    text: "Rajaa hakualue kartalta",
                },
                {
                    id: 1,
                    text: "Rajaa ajankohdan perusteella",
                }
            ]
        }
    },
    mounted: function () {
       this.findMaps();
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            if (menuItem.id == 0) {
                // TODO
            }
        },
        show () {
            const viewer = this.$el.querySelector('.historical-maps').$viewer
            viewer.show()
        },
        findMaps() {
            var ol = this.$ol;
            var extent = this.map.getView().calculateExtent();
            console.log(extent);
            var bottomLeftLonLat3857 = [extent[0], extent[1]];
            var topLeftLonLat3857 = [extent[0], extent[3]];
            var bottomRightLonLat3857 = [extent[2], extent[1]];
            var bottomLeftLonLat = ol.proj.transform(bottomLeftLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var topLeftLonLat = ol.proj.transform(topLeftLonLat3857, 'EPSG:3857', 'EPSG:4326');
            var bottomRightLonLat = ol.proj.transform(bottomRightLonLat3857, 'EPSG:3857', 'EPSG:4326');
            console.log(bottomLeftLonLat, topLeftLonLat, bottomRightLonLat);
            var heightLength = turf_distance(bottomLeftLonLat, topLeftLonLat);
            var widthLength = turf_distance(bottomLeftLonLat, bottomRightLonLat);
            console.log("height: ", heightLength);
            console.log("width: ", widthLength);

            var lon = bottomRightLonLat[1] + (bottomRightLonLat[1] - bottomLeftLonLat[1]) / 2;
            var lat = bottomLeftLonLat[0] + (topLeftLonLat[0] - bottomLeftLonLat[0]) / 2;
            var distance = heightLength > widthLength ? heightLength : widthLength;

            var params = {
                geographic_facet: this.wikidocumentaries.geo.admin,
                lon: lon, 
                lat: lat,
                distance: distance
            }

            this.$store.dispatch('getHistoricalMaps', params);
        }
    },
    components: {
        ToolbarMenu
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.maps {

}

.grid {

}

.grid-item {
    width: 200px;
    margin-bottom: -5px;
}

.grid-item--width2 { 
    width: 400px;
}

.thumb-image {
    width: 100%;
    cursor: zoom-in;
}

.thumb-image-header {
    position:absolute;
    top: 0px;
    left: 10px;
    width: 100%; 
}

.thumb-image-glyph {
    color: white;
}
</style>
