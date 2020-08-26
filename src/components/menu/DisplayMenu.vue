<template>
    <ToolbarMenu icon="wikiglyph-view-details" :tooltip="$t('topic_page.Works.displayMenuTooltip')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('topic_page.Works.displayMenuTitle') }}</div>
    </ToolbarMenu>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    GALLERY: 0,
    LIST: 1,
    MAP: 2
}

export default {
    name: 'DisplayMenu',
    props: {
      doDisplayChange: Function
    },
    data () {
        return {
            toolbarActionMenuItems: [
                {
                    id: MENU_ACTIONS.GALLERY,
                    text: 'topic_page.Works.displayMenuOptionGallery'
                },
                {
                    id: MENU_ACTIONS.LIST,
                    text: 'topic_page.Works.displayMenuOptionList'
                },
                {
                    id: MENU_ACTIONS.MAP,
                    text: 'topic_page.Works.displayMenuOptionMap'
                },
            ],
        };
    },
    computed: {
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            this.$emit('doDisplayChange', menuItem);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
