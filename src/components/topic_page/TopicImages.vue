<template>
    <div v-if="wikidocumentaries.images.length" class="images-component">
        <div class="toolbar">
            <h1 class="header-title">{{ $t('topic_page.TopicImages.headerTitle') }}</h1>
<!--             <ToolbarMenu icon="wikiglyph-ellipses" :tooltip="$t('general.menus.actionMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('general.menus.actionMenuTitle') }}</div>
            </ToolbarMenu> -->
        </div>
        <div class="intro">{{ $t('topic_page.TopicImages.intro') }}</div>
        <ImageGrid class="image-grid" :items="wikidocumentaries.images" @showItemGeolocation="showImageOnMap">
        </ImageGrid>
    </div>
</template>

<script>
import ToolbarMenu from '@/components/menu/ToolbarMenu'
import ImageGrid from '@/components/ImageGrid'

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
                    text: 'topic_page.TopicImages.actionsMenu.showImagesOnMapMenuText'
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
        ImageGrid
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.image-grid {
    width: 100%;
}
.thumb-image-glyph {
    color: white;
}
</style>
