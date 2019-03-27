<template>
  <div class="wikipedia">
    <div class="toolbar">
        <div class="header-title">{{ $t('topic_page.Wikipedia.headerTitle') }}</div>
        <ArticleLanguageMenu class="language-menu" @doLanguageChange="onLanguageChange"></ArticleLanguageMenu>
        <HeaderLink v-if="wikipedia.wikipediaURL" class="toolbar-item" :tooltip="$t('topic_page.Wikipedia.extLink.linkTitleWP')" :link="wikipedia.wikipediaURL"></HeaderLink>
        <HeaderLink v-else class="toolbar-item" :tooltip="$t('topic_page.Wikipedia.addLink.linkTitleWP')" :link="wikipedia.wikipediaURL"></HeaderLink>
    </div>
    <div v-if="wikipedia.wikipediaURL" class="text wiki-html">
      <span v-html="wikipedia.excerptHTML"></span>
      <span v-html="wikipedia.remainingHTML"></span>
    </div>
    <div v-else class="text wiki-html">
      <p>{{ $t('topic_page.Wikipedia.missingArticle') }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HeaderLink from '@/components/HeaderLink'
import ArticleLanguageMenu from '@/components/menu/ArticleLanguageMenu'
export default {
  name: 'WikipediaArticle',
  props: {
  },
  computed: {
      getSelected () {
        if(window.getSelection) { return window.getSelection(); }
        else if(document.getSelection) { return document.getSelection(); }
        else {
          var selection = document.selection && document.selection.createRange();
          if(selection.text) { return selection.text; }
          return false;
        }
        return false;
      },
      doSelection () {
        var selection = getSelected();
        if (selection) {
          alert(selection);
        }
      }
  },
  data () {
    return {
      expanded: false,
      language: this.$i18n.locale,
      wikipedia: this.$store.state.wikidocumentaries.wikipedia,
    }
  },
  components: {
    HeaderLink,
    ArticleLanguageMenu
  },
  methods: {
    switchExpand(event) {
      this.expanded = !this.expanded;
    },
    onLanguageChange(language) {
      this.language = language;

      var requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/wiki",
        method: "get",
        params: {
          wikidata: this.$store.state.wikidocumentaries.wikidataId,
          language: language,
        }
      };
      axios.request(requestConfig).then(response => {
        if (response.data.wikidata == null ) {
          console.log("response.data.wikipedia == null");
          context.commit('setWikidocumentariesDataState', WIKI.STATES.FAIL_WIKI_EXTERNAL);
        } else {
          this.wikipedia.excerptHTML = response.data.wikipediaExcerptHTML;
          this.wikipedia.remainingHTML = response.data.wikipediaRemainingHTML;
          this.wikipedia.wikipediaURL = response.data.wikipedia.content_urls.desktop.page;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.expander {
  width: 100%;
  padding-top: 0; 
  padding-right: 12px;
  margin-top: -10px;
  text-align: right;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
}

.expander:hover {
  outline: 0;
}

.expander:focus {
  outline: 0;
}

.top-exander {
  margin-bottom: -10px;
  padding-right: 0px;
}

.expanded-html >>> .h2:first-of-type {
  margin-top: -10px;
}

.wiki-html >>> .h2 {
  font-size: 14pt;
}

.wiki-html >>> .h3 {
  font-size: 11pt;
  font-weight: bold;
}

.wiki-html >>> .h4 {
  font-size: 11pt;
  font-weight: normal;
  font-style: italic;
}

.wiki-html >>> .h5 {
  font-size: 10pt;
  font-weight: normal;
  font-style: italic;
}

.wiki-html >>> span > p:nth-child(1) {
  margin-top:0;
}
</style>
