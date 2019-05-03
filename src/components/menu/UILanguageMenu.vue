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

import languageTranslations from '@/store/languages'
import * as locales from '@/store/messages'

import ToolbarMenu from '@/components/menu/ToolbarMenu'

export default {
    name: 'UILanguageMenu',
    props: {
    },
    computed: {
        languageNames() {
            return new Map(languageTranslations.map(lang => [lang.wiki, lang.local]));
        },
        toolbarActionMenuItems() {
            return Object.keys(locales).map(lang => {
                return {
                    id: lang,
                    text: this.languageNames.get(lang + "wiki") || lang,
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
