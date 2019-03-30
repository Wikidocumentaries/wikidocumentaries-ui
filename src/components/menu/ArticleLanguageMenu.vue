<template>
    <ToolbarMenu v-if="toolbarActionMenuItems.length || translateLinkVisible" icon="wikiglyph-translation" :tooltip="$t('topic_page.Wikipedia.languageMenu.menuTitle')" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
        <div slot="menu-title">{{ $t('topic_page.Wikipedia.languageMenu.menuTitle') }}</div>
        <a slot="menu-link" v-if="translateLinkVisible" :href="translateLink" class="menu-link" target="_blank">{{ $t('general.menus.languageMenuTranslate') }}</a>
    </ToolbarMenu>
</template>

<script>

import languageTranslations from '@/store/languages'

import ToolbarMenu from '@/components/menu/ToolbarMenu'

export default {
    name: 'ArticleLanguageMenu',
    props: {
        currentLanguage: String,
        doLanguageChange: Function,
        translateLink: String,
    },
    computed: {
        sitelinks() {
            return this.$store.state.wikidocumentaries.wikidata.sitelinks;
        },
        toolbarActionMenuItems() {
            return this.sitelinks.map(sitelink => {
                const lang = sitelink.site.replace(/wiki/, ""); // enwiki -> en
                return {
                    id: lang,
                    text: this.languageNames.get(lang + "wiki") || lang,
                };
            }).filter(item => item.id != this.currentLanguage);
        },
        translateLinkVisible() {
            if (this.sitelinks.filter(sitelink => sitelink.site == this.$i18n.locale + "wiki").length) {
                // already available in the UI language
                return false;
            }
            if (!this.sitelinks.filter(sitelink => sitelink.site == this.currentLanguage + "wiki").length) {
                // not available in the source language
                return false;
            }
            // good to go
            return true;
        },
        languageNames() {
            return new Map(languageTranslations.map(lang => [lang.wiki, lang.local]));
        }
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
