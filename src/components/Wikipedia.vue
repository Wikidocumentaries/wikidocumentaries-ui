<template>
  <div class="wikipedia">
    <div class="header">
      <div class="header-title toolbar neg">
        {{ header.title }}
      </div>
      <HeaderLink class="header-link" :link="wikidocumentaries.wikipedia.wikipediaURL"></HeaderLink>
    </div>
    <div class="text">
      <span v-html="wikidocumentaries.wikipedia.html"></span>
    </div>
  </div>
</template>

<script>
import HeaderLink from '@/components/HeaderLink'
export default {
  name: 'WikipediaArticle',
  props: {
      wikidocumentaries: Object
  },
  data () {
    return {
      msg: 'article',
      header: {
        title: 'Artikkeli Wikipediassa'
      }
    }
  },
  components: {
    HeaderLink
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
}

.header-title {
  flex-grow: 90;

}
.header-link {
  flex-grow: 10;
  text-align: right;
}
i.wikiglyph {
    font-size: 22px;
}

.text {
	padding:0 12px;
}

</style>
