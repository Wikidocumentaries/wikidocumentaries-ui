<template>
    <ToolbarMenu icon="wikiglyph-translation" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('general.menus.actionMenuTitle') }}</div>
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
  name: 'SwitchArticleLanguageMenu',
  props: {
  },
  computed: {
      wikidocumentaries () {
        return this.$store.state.wikidocumentaries;
      },
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
    ToolbarMenu
  },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case MENU_ACTIONS.CHANGE_LANGUAGE_FI:
                this.$i18n.locale = 'fi';
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_EN:
                this.$i18n.locale = 'en';
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_SV:
                this.$i18n.locale = 'sv';
                break;
            case MENU_ACTIONS.CHANGE_LANGUAGE_ES:
                this.$i18n.locale = 'es';
                break;
            }
        }
    }
}
</script>