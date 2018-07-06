<template>
    <div class="maps">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-gear" :items="toolbarSettingsMenuItems"></ToolbarMenu>
            <!--<ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarItems"></ToolbarMenu>-->
        </div>
        <div v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="historical-maps">
            <div v-masonry-tile class="grid-item" v-for="historicalMap in historicalMaps" v-bind:key="historicalMap.imageURL">
                <img v-bind:src="historicalMap.imageURL" class="thumb-image" v-bind:alt="historicalMap.title"/>
                <!--<div class="thumb-title">{{ image.title }}</div>
                <div class="thumb-credit">{{ image.credit }}</div>-->
            </div>
        </div>
        <!--<button type="button" @click="show">Show</button>-->
    </div>
</template>

<script>
import ToolbarMenu from '@/components/ToolbarMenu'
export default {
    name: 'HistoricalMapsSearch',
    props: {
        wikidocumentaries: Object
    },
    data () {
        return {
            header: {
                title: 'Etsi historiallisia karttoja'
            },
            historicalMaps: [],
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
    methods: {
        show () {
            const viewer = this.$el.querySelector('.historical-maps').$viewer
            viewer.show()
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
