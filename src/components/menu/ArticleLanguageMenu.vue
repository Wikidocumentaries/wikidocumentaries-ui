<template>
    <ToolbarMenu v-if="toolbarActionMenuItems.length" icon="wikiglyph-translation" :tooltip="$t('topic_page.Wikipedia.languageMenu.menuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('topic_page.Wikipedia.languageMenu.menuTitle') }}</div>
        <a slot="menu-link" v-if="currentLanguage != $i18n.locale" :href="translateLink" class="menu-link" target="_blank">{{ $t('general.menus.languageMenuTranslate') }}</a>
    </ToolbarMenu>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

export default {
    name: 'ArticleLanguageMenu',
    props: {
        currentLanguage: String,
        doLanguageChange: Function,
        translateLink: String,
    },
    computed: {
        toolbarActionMenuItems () {
            return this.$store.state.wikidocumentaries.wikidata.sitelinks.map((sitelink) => {
                const lang = sitelink.site.replace(/wiki/, ""); // enwiki -> en
                return {
                    id: lang,
                    text: lang,
                };
            }).filter(item => item.id != this.currentLanguage);
        },
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        onDoMenuItemAction(menuItem) {
            this.$emit('doLanguageChange', menuItem.id);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-link {
    color: var(--main-red) !important;
    font-weight: bold;
}

.menu-link:hover {
    color:white !important;
}

</style>
