<template>
    <ToolbarMenu icon="wikiglyph-translation" :tooltip="$t('general.menus.languageMenuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('general.menus.languageMenuTitle') }}</div>
        <!-- Tässä käännöslinkki
        <a :href="translateLink" slot="menu-link" class="menu-link">{{ $t('general.menus.languageMenuTranslate') }}</a>
        //-->
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
        doLanguageChange: Function,
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
        // translateLink () {
        //     return "https://" + 18 + ".wikipedia.org/wiki/Special:ContentTranslation?page=Lenkkimakkara&from="+ article + "&to="+ 18 + "&targettitle=&version=2"
        // }
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction(menuItem) {
            this.$emit('doLanguageChange', menuItem.id.replace(/wiki/, ""));
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-link {
    color: var(--main-red);
    font-weight: bold;
}

.menu-link:hover {
    color:white;
}

</style>
