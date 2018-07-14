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
  },
  computed: {
      wikidocumentaries () {
          return this.$store.state.wikidocumentaries;
      },
  },
  data () {
    return {
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

</style>
