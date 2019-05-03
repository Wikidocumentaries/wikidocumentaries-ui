<template>
    <ToolbarMenu
        icon="wikiglyph-translation"
        :tooltip="$t('general.menus.languageMenuTitle')"
        :translateItems="false"
        :items="toolbarActionMenuItems"
        @doMenuItemAction="onDoMenuItemAction"
    >
        <div slot="menu-title">{{ $t('general.menus.languageMenuTitle') }}</div>
    </ToolbarMenu>
</template>

<script>

import * as locales from '@/store/messages'

import ToolbarMenu from '@/components/menu/ToolbarMenu'

export default {
    name: 'UILanguageMenu',
    props: {
    },
    computed: {
        toolbarActionMenuItems() {
            return Object.keys(locales).map(lang => {
                return {
                    id: lang,
                    text: lang,
                };
            });
        },
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            const language = menuItem.id;
            if (language) {
                this.$i18n.locale = language;
                this.$store.dispatch('updateWikidocumentaries', {topic: null, wikidata: this.$store.state.wikidocumentaries.wikidataId, language: language});
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
