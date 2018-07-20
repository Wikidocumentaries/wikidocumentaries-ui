<template>
  <div class="wikipedia">
    <div class="header">
      <div class="header-title toolbar neg">
        {{ header.title }}
      </div>
      <HeaderLink class="header-link" :link="wikidocumentaries.wikipedia.wikipediaURL"></HeaderLink>
    </div>
    <div class="text">
      <span v-html="wikidocumentaries.wikipedia.html" @click="handleHTMLClick"></span>
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
        title: 'Artikkelin ote Wikipediasta'
      }
    }
  },
  components: {
    HeaderLink
  },
  methods: {
    handleHTMLClick(event) {
        console.log("handleHTMLClick");
        //window.location.reload(true);
        console.log(window.location);

        var startIndex = 7
        var endIndex = window.location.hash.indexOf('?');
        var language = window.location.hash.substr(-2, 2);
        
        var topic = window.location.hash.substring(7, endIndex);
        //console.log(topic);

        this.$router.go();
        // this.$router.go(window.location.pathname);
        // this.$router.push({
        //     path: `/wiki/${topic}`,
        //     query: {
        //         language: 'fi'
        //     }
        // });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
