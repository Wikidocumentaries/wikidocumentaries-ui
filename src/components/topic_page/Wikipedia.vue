<template>
  <div class="wikipedia">
    <div class="toolbar">
        <div class="header-title">{{ $t('topic_page.Wikipedia.headerTitle') }}</div>
        <HeaderLink class="toolbar-item" :link="wikidocumentaries.wikipedia.wikipediaURL"></HeaderLink>
    </div>
    <div class="text wiki-html">
      <span v-html="wikidocumentaries.wikipedia.excerptHTML"></span>
      <span v-html="wikidocumentaries.wikipedia.remainingHTML"></span>
    </div>
    <!--div class="text wiki-html expanded-html" v-if="expanded">
      <button class="expander top-exander" v-if="wikidocumentaries.wikipedia.remainingHTML != null" @click="switchExpand()">
        <i v-if="expanded" class="wikiglyph wikiglyph-caret-up"></i>
        <i v-else class="wikiglyph wikiglyph-caret-down"></i>
      </button>
      <span v-html="wikidocumentaries.wikipedia.remainingHTML"></span>
    </div>
    <button class="expander" v-if="wikidocumentaries.wikipedia.remainingHTML != null" @click="switchExpand()">
      <i v-if="expanded" class="wikiglyph wikiglyph-caret-up"></i>
      <i v-else class="wikiglyph wikiglyph-caret-down"></i>
    </button-->
  </div>
</template>

<script>
import HeaderLink from '@/components/HeaderLink'
export default {
  name: 'WikipediaArticle',
  props: {
  },
  computed: {
      wikidocumentaries () {
          return this.$store.state.wikidocumentaries;
      },
  },
  data () {
    return {
      expanded: false
    }
  },
  components: {
    HeaderLink
  },
  methods: {
    switchExpand(event) {
      this.expanded = !this.expanded;
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
