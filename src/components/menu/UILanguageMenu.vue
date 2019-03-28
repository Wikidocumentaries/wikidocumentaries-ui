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
    CHANGE_LANGUAGE_AR: 4,
    CHANGE_LANGUAGE_DA: 5,
    CHANGE_LANGUAGE_DE: 5,
    CHANGE_LANGUAGE_DIQ: 7,
    CHANGE_LANGUAGE_FR: 8,
    CHANGE_LANGUAGE_KO: 9,
    CHANGE_LANGUAGE_LB: 10,
    CHANGE_LANGUAGE_MK: 11,
    CHANGE_LANGUAGE_NB: 12,
    CHANGE_LANGUAGE_PTBR: 13,
    CHANGE_LANGUAGE_SH: 14,
    CHANGE_LANGUAGE_TR: 15,
    CHANGE_LANGUAGE_ZHHANT: 16,
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
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_AR,
                //     text: 'general.languages.ar'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_DA,
                //     text: 'general.languages.da'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_DE,
                //     text: 'general.languages.de'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_DIQ,
                //     text: 'general.languages.diq'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_FR,
                //     text: 'general.languages.fr'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_KO,
                //     text: 'general.languages.ko'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_LB,
                //     text: 'general.languages.lb'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_MK,
                //     text: 'general.languages.mk'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_NB,
                //     text: 'general.languages.nb'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_PTBR,
                //     text: 'general.languages.pt-br'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_SH,
                //     text: 'general.languages.sh'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_TR,
                //     text: 'general.languages.tr'
                // },
                // {
                //     id: MENU_ACTIONS.CHANGE_LANGUAGE_ZHHANT,
                //     text: 'general.languages.zh-hant'
                // },
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
            // case MENU_ACTIONS.CHANGE_LANGUAGE_AR:
            //     language = 'ar';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_DA:
            //     language = 'da';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_DE:
            //     language = 'de';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_DIQ:
            //     language = 'diq';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_FR:
            //     language = 'fr';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_KO:
            //     language = 'ko';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_LB:
            //     language = 'lb';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_MK:
            //     language = 'mk';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_NB:
            //     language = 'nb';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_PTBR:
            //     language = 'pt-br';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_SH:
            //     language = 'sh';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_TR:
            //     language = 'tr';
            //     break;
            // case MENU_ACTIONS.CHANGE_LANGUAGE_ZHHANT:
            //     language = 'zh-hant';
            //     break;
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
