<template>
    <ToolbarMenu icon="wikiglyph-translation" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('general.menus.languageMenuTitle') }}</div>
    </ToolbarMenu>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

export default {
    name: 'LanguageMenu',
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
                    id: MENU_ACTIONS.MY_LANGUAGES,
                    text: 'general.languages.sv'
                },
            ],
        }
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case MENU_ACTIONS.CHANGE_LANGUAGE_FI:
                setLanguage('fi');
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_EN:
                setLanguage('en');
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_SV:
                setLanguage('sv');
            }
        },
        setLanguage(language) {
            this.$i18n.locale = language;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
