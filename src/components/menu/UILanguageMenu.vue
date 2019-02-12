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
    name: 'UILanguageMenu',
    props: {
    },
    data () {
        return {
            toolbarActionMenuItems: [
                {
                    id: MENU_ACTIONS.CHANGE_LANGUAGE_FI,
                    text: 'general.languages.fi'
                },
                {
                    id: MENU_ACTIONS.CHANGE_LANGUAGE_EN,
                    text: 'general.languages.en'
                },
                {
                    id: MENU_ACTIONS.CHANGE_LANGUAGE_SV,
                    text: 'general.languages.sv'
                },
                {
                    id: MENU_ACTIONS.CHANGE_LANGUAGE_ES,
                    text: 'general.languages.es'
                },
                /*{
                    id: MENU_ACTIONS.MY_LANGUAGES,
                    text: 'general.menus.myLanguagesItem'
                },*/
            ],
        }
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            var language;
            switch (menuItem.id) {
            case MENU_ACTIONS.CHANGE_LANGUAGE_FI:
                language = 'fi';
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_EN:
                language = 'en';
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_SV:
                language = 'sv';
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_ES:
                language = 'es';
                break;
            }
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
