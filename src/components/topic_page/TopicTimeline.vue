<template>
    <div class="map-component">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>
        </div>
        <div class="timeline">

        </div>
    </div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    NONE: 1
}

export default {
    name: 'TopicTimeline',
    props: {
    },
    data () {
        return {
            header: {
                title: 'Aikajana'
            },
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
        timelineImages () {
            return this.$store.state.timelineImages;
        },
    },
    watch: {
        timelineImages: function(images, oldImages) {
            // TODO calculate and create backround division of the timeline images years on the UI
        }
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

.timeline {
    height: 20px;

}

</style>
