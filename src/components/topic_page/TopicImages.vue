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

const MENU_ACTIONS = {
    SHOW_IMAGES_ON_MAP: 1,
    SHOW_IMAGES_ON_TIMELINE: 2,
}

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
                    id: MENU_ACTIONS.SHOW_IMAGES_ON_MAP,
                    text: "Näytä kaikki kuvat kartalla",
                },
                {
                    id: MENU_ACTIONS.SHOW_IMAGES_ON_TIMELINE,
                    text: "Näytä kaikki kuvat aikajanalla",
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
            switch (menuItem.id) {
            case MENU_ACTIONS.SHOW_IMAGES_ON_MAP:
                this.$store.commit('setImagesShownOnMap', this.wikidocumentaries.images);
                this.$emit('showImagesOnMap');
                break;
            case MENU_ACTIONS.SHOW_IMAGES_ON_TIMELINE:
                this.$store.commit('setImagesShownOnTimeline', this.wikidocumentaries.images);
                this.$emit('showImagesOnTimeline');
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
