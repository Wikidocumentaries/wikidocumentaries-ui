<template>
    <div class="maps-component">
        <div class="toolbar">
            <div class="header-title">{{ $t('map_search_page.HistoricalMapsSearch.headerTitle') }}</div>
            <ToolbarMenu icon="wikiglyph-gear" :items="toolbarSettingsMenuItems" @doMenuItemAction="onDoMenuItemAction"></ToolbarMenu>
            <!--<ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarItems"></ToolbarMenu>-->
        </div>
        <MasonryGrid class="masonry-grid" :items="historicalMaps">
        </MasonryGrid>
    </div>
</template>

<script>
import turf_distance from '@turf/distance/index'
import ToolbarMenu from '@/components/menu/ToolbarMenu'
import MasonryGrid from '@/components/MasonryGrid'

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
        },
    },
    data () {
        return {
            toolbarSettingsMenuItems: [
                {
                    id: 0,
                    text: 'map_search_page.HistoricalMapsSearch.filterBySourceMenuText'
                },
                {
                    id: 1,
                    text: 'map_search_page.HistoricalMapsSearch.filterByTimeMenuText'
                },
                {
                    id: 2,
                    text: 'map_search_page.HistoricalMapsSearch.filterByMapMenuText'
                },
            ],
        }
    },
    mounted: function () {
        this.findMaps();
        //console.log(this.$refs.gridImages.clientWidth);
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            if (menuItem.id == 0) {
                // TODO
            }
        },
        findMaps() {
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
            //console.log("height: ", heightLength);
            //console.log("width: ", widthLength);

            var lon = bottomLeftLonLat[0] + (bottomRightLonLat[0] - bottomLeftLonLat[0]) / 2;
            var lat = bottomLeftLonLat[1] + (topLeftLonLat[1] - bottomLeftLonLat[1]) / 2;
            //console.log("lon: ", lon);
            //console.log("lat: ", lat);
            var distance = heightLength > widthLength ? heightLength : widthLength;

            var params = {
                municipality: this.wikidocumentaries.geo.admin,
                centerLon: lon, 
                centerLat: lat,
                distance: distance,
                bottomLeftLon: bottomLeftLonLat[0],
                bottomLeftLat: bottomLeftLonLat[1],
                topRightLon: topRightLonLat[0],
                topRightLat: topRightLonLat[1],
            }

            this.$store.dispatch('getHistoricalMaps', params);
        }
    },
    components: {
        ToolbarMenu,
        MasonryGrid
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.maps-component {

}

.masonry-grid {
    width: calc(100% - 1px);
}

</style>
