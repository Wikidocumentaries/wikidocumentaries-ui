<template>
    <div class="images">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarActionMenuItems"></ToolbarMenu>
        </div>
        <div v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="images">
            <div v-masonry-tile class="grid-item" v-for="image in wikidocumentaries.images" v-bind:key="image.imageURL">
                <img v-bind:src="image.imageURL" class="thumb-image" v-bind:alt="image.title"/>
                <!--<div class="thumb-title">{{ image.title }}</div>
                <div class="thumb-credit">{{ image.credit }}</div>-->
                <div class="thumb-image-header">
                    <div v-if="image.geoLocations.length > 0" class="geo">
                        <a href="#" @click.prevent="showImageOnMap(image)"><i class="wikiglyph wikiglyph-map-pin thumb-image-glyph"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <!--<button type="button" @click="show">Show</button>-->
    </div>
</template>

<script>
import ToolbarMenu from '@/components/ToolbarMenu'

export default {
    name: 'TopicImages',
    props: {
        wikidocumentaries: Object
    },
    data () {
        return {
            msg: '',
            header: {
                title: 'Arkistojen kuvia'
            },
            toolbarActionMenuItems: [
                {
                    id: 0,
                    text: "Näytä valitut kuvat kartalla",
                },
                {
                    id: 1,
                    text: "Näytä valitut kuvat aikajanalla",
                }
            ]
        }
    },
    methods: {
        show () {
            const viewer = this.$el.querySelector('.images').$viewer
            viewer.show()
        },
        showImageOnMap(image) {
            console.log("showImageOnMap", image);
        }
    },
    components: {
        ToolbarMenu
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
