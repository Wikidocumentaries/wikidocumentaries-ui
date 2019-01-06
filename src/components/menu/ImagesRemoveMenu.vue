<template>
    <div class="images-remove-menu">
        <IconMenu icon="wikiglyph-cross" :items="iconRemoveMenuItems" @doMenuItemAction="onDoMenuItemAction">
            <div slot="menu-title">{{ $t('topic_page.TopicImages.imagesRemoveMenu.menuTitle') }}</div>
        </IconMenu>
    </div>
</template>

<script>

import IconMenu from '@/components/menu/IconMenu'

const MENU_ACTIONS = {
    REM_DEPICTED: 0,
    REM_CREATOR: 1,
    REM_INAPPROPRIATE: 2,
}

export default {
    name: 'ImagesRemoveMenu',
    props: {
    },
    data () {
        return {
            iconRemoveMenuItems: [
                {
                    id: MENU_ACTIONS.REM_DEPICTED,
                    text: 'topic_page.TopicImages.imagesRemoveMenu.remDepictedText'
                },
                {
                    id: MENU_ACTIONS.REM_CREATOR,
                    text: 'topic_page.TopicImages.imagesRemoveMenu.remCreatorText'
                },
                {
                    id: MENU_ACTIONS.REM_INAPPROPRIATE,
                    text: 'topic_page.TopicImages.imagesRemoveMenu.remInappropriateText'
                },
            ],
        }
    },
    components: {
        IconMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case REM_DEPICTED:
                break;
            case REM_CREATOR:
                break;
            case REM_INAPPROPRIATE:
                break;
            }
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
