<template>
    <div class="images-component">
        <div class="toolbar">
            <div class="header-title">{{ $t('topic_page.TopicImages.headerTitle') }}</div>
            <ToolbarMenu icon="wikiglyph-ellipses" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('general.menus.actionMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        
        <MasonryGrid class="masonry-grid" :items="wikidocumentaries.images" @showItemGeolocation="showImageOnMap">
        </MasonryGrid>
    </div>
</template>

<script>
import ToolbarMenu from '@/components/menu/ToolbarMenu'
import MasonryGrid from '@/components/ImageGrid'

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
            toolbarActionMenuItems: [
                {
                    id: MENU_ACTIONS.SHOW_IMAGES_ON_MAP,
                    text: 'topic_page.TopicImages.showImagesOnMapMenuText'
                },
                // {
                //     id: MENU_ACTIONS.SHOW_IMAGES_ON_TIMELINE,
                //     text: 'topic_page.TopicImages.showImagesOnTimelineMenuText'
                // },
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

.images-component {
    /* width: calc(100% - 1px); */
}

.masonry-grid {
    width: calc(100% - 1px);
}

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
    cursor: pointer;
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
