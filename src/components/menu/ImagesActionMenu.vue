<template>
    <div class="images-action-menu">
        <IconMenu icon="wikiglyph-ellipses" :items="iconActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
            <div slot="menu-title">{{ $t('topic_page.TopicImages.imagesActionMenu.menuTitle') }}</div>
        </IconMenu>
    </div>
</template>

<script>

import IconMenu from '@/components/menu/IconMenu'

const MENU_ACTIONS = {
//    DO_GEOLOCATING: 0,
//    SHOW_IMAGE: 1,
    SELECT_HEADER: 0,
}

export default {
    name: 'ImagesActionMenu',
    props: {
    },
    data () {
        return {
            iconActionMenuItems: [
                {
                    id: MENU_ACTIONS.SELECT_HEADER,
                    text: 'topic_page.TopicImages.imagesActionMenu.selectFeatured'
                },
                // {
                //     id: MENU_ACTIONS.DO_GEOLOCATING,
                //     text: 'topic_page.TopicImages.imagesActionMenu.doGeolocatingText'
                // },
                // {
                //     id: MENU_ACTIONS.SHOW_IMAGE,
                //     text: 'topic_page.TopicImages.imagesActionMenu.showImageText'
                // },
            ],
        }
    },
    components: {
        IconMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case DO_GEOLOCATING:
                //this.$i18n.locale = 'fi';
                break;
            case SHOW_IMAGE:
                //this.$i18n.locale = 'fi';
                break;
            }
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
