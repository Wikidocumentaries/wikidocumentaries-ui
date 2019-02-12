<template>
    <ToolbarMenu icon="wikiglyph-translation" :tooltip="$t('general.menus.languageMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('general.menus.languageMenuTitle') }}</div>
    </ToolbarMenu>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    CHANGE_LANGUAGE_FI: 0,
    CHANGE_LANGUAGE_EN: 1,
    CHANGE_LANGUAGE_SV: 2,
    CHANGE_LANGUAGE_ES: 3,
}

export default {
    name: 'ArticleLanguageMenu',
    props: {
    },
    computed: {
        toolbarActionMenuItems () {
            return this.$store.state.wikidocumentaries.wikidata.sitelinks.map((sitelink) => {
                return {
                    id: sitelink.site,
                    text: sitelink.site.replace(/wiki/, ""), // enwiki -> en
                };
            })
        },
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            this.$i18n.locale = menuItem.id.replace(/wiki/, "");
            this.$store.dispatch('updateWikidocumentaries', {topic: null, wikidata: this.$store.state.wikidocumentaries.wikidataId, language: this.$i18n.locale});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
