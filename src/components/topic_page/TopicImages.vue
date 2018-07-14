<template>
    <div class="images">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>
        </div>
        
        <MasonryGrid :items="wikidocumentaries.images" @showItemGeolocation="showImageOnMap">
        </MasonryGrid>
    </div>
</template>

<script>
import ToolbarMenu from '@/components/menu/ToolbarMenu'
import MasonryGrid from '@/components/MasonryGrid'

export default {
    name: 'TopicImages',
    props: {
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
      },
    },
    mounted: function () {
    },
    data () {
        return {
            header: {
                title: 'Arkistojen kuvia'
            },
            toolbarActionMenuItems: [
                {
                    id: 0,
                    text: "Näytä kaikki kuvat kartalla",
                },
                {
                    id: 1,
                    text: "Näytä valitut kuvat aikajanalla",
                },
            ],
        }
    },
    methods: {
        showImageOnMap(image) {
            //console.log("showImageOnMap", image);
            this.$store.commit('setImagesShownOnMap', [image]);
            this.$emit('showImagesOnMap');
        },
        onDoMenuItemAction(menuItem) {
            if (menuItem.id == 0) {
                this.$store.commit('setImagesShownOnMap', this.wikidocumentaries.images);
                this.$emit('showImagesOnMap');
            }
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

.grid {

}

.grid-item {
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
