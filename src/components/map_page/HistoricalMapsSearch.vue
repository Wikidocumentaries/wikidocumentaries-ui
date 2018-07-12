<template>
    <div class="maps">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-gear" :items="toolbarSettingsMenuItems" @doMenuItemAction="onDoMenuItemAction"></ToolbarMenu>
            <!--<ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarItems"></ToolbarMenu>-->
        </div>
        <MasonryGrid :items="historicalMaps">
        </MasonryGrid>
    </div>
</template>

<script>
import turf_distance from '@turf/distance/index'
import ToolbarMenu from '@/components/ToolbarMenu'
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
        ToolbarMenu,
        MasonryGrid
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.maps {

}

</style>
