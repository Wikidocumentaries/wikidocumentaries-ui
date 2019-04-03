<template>
    <div class="images-action-menu">
        <IconMenu icon="wikiglyph-ellipses" :items="iconActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
            <div slot="menu-title">{{ $t('topic_page.TopicImages.imagesActionMenu.menuTitle') }}</div>
        </IconMenu>
        <ImageViewer ref="imageviewer"></ImageViewer>
    </div>
</template>

<script>

import IconMenu from '@/components/menu/IconMenu'
import ImageViewer from '@/components/image_viewer/ImageViewer'

const MENU_ACTIONS = {
//    DO_GEOLOCATING: 0,
    // SELECT_HEADER: 0,
    SHOW_IMAGE: 0,
}

export default {
    name: 'ImagesActionMenu',
    props: {
    },
    data () {
        return {
            iconActionMenuItems: [
              {
                  id: MENU_ACTIONS.SHOW_IMAGE,
                  text: 'topic_page.TopicImages.imagesActionMenu.showImageText'
              },
                // {
                //     id: MENU_ACTIONS.SELECT_HEADER,
                //     text: 'topic_page.TopicImages.imagesActionMenu.selectFeatured'
                // },
                // {
                //     id: MENU_ACTIONS.DO_GEOLOCATING,
                //     text: 'topic_page.TopicImages.imagesActionMenu.doGeolocatingText'
                // },
            ],
        }
    },
    components: {
        IconMenu,
        ImageViewer
    },
    methods: {
        onDoMenuItemAction (menuItem) {
          switch (menuItem.id) {
						case MENU_ACTIONS.SHOW_IMAGE:
							console.log("Showing Modal Now!");
              this.$refs.imageviewer.show();
							break;
					}
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
