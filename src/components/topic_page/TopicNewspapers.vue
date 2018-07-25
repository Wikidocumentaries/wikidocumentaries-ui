<template>
    <div class="map-component">
        <div class="toolbar">
            <div class="header-title">{{ $t('topic_page.TopicNewspapers.headerTitle') }}</div>
            <!--<ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>-->
        </div>
        <div class="newspapers">

        </div>
    </div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    NONE: 1
}

export default {
    name: 'TopicNewspapers',
    props: {
    },
    data () {
        return {
            toolbarActionMenuItems: [
            {
                id: MENU_ACTIONS.NONE,
                text: "...",
            },
            ]
        }
    },
    components: {
        ToolbarMenu,
    },
    mounted: function () {
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
    },
    watch: {
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.newspapers {
    height: 200px;
}

</style>
