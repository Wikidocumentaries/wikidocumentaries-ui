<template>
    <div class="newspapers-component">
        <div class="toolbar">
            <div class="header-title">{{ $t('topic_page.TopicNewspapers.headerTitle') }}</div>
            <ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('general.menus.actionMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="newspapers">

        </div>
    </div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    SEARCH_TOPIC_FROM_NEWSPAPER_ARCHIVES: 0,
    ADD_CLIP: 1,
    HELP: 2,
}

export default {
    name: 'TopicNewspapers',
    props: {
    },
    data () {
        return {
            toolbarActionMenuItems: [
            {
                id: MENU_ACTIONS.SEARCH_TOPIC_FROM_NEWSPAPER_ARCHIVES,
                text: 'topic_page.TopicNewspapers.searhTopicFromArchivesMenuText'
            },
            {
                id: MENU_ACTIONS.ADD_CLIP,
                text: 'topic_page.TopicNewspapers.addClipFromArchivesMenuText'
            },
            {
                id: MENU_ACTIONS.HELP,
                text: 'general.helpText'
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
            case MENU_ACTIONS.SEARCH_TOPIC_FROM_NEWSPAPER_ARCHIVES:
                window.open('https://digi.kansalliskirjasto.fi/sanomalehti/search?query="' + encodeURIComponent(this.wikidocumentaries.title) + '"&requireAllKeywords=true&fuzzy=false&hasIllustrations=false&orderBy=RELEVANCE&pages=&formats=NEWSPAPER&searchBindings=false&page=1&set_language=' + this.$i18n.locale, '_blank');
                break;
            case MENU_ACTIONS.ADD_CLIP:
                // TODO show dialog that allows adding photo URL and saving it.
                break;
            case MENU_ACTIONS.HELP:
                break;
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .newspapers-component {
    width: calc(100% - 10px);
} */

.newspapers {
    height: 200px;
}

</style>
