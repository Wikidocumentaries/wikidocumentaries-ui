<template>
  <div class="home">
    <TopicPageHeader :wikidocumentaries="wikidocumentaries"></TopicPageHeader>
    <div class="row"> 
      <WikipediaArticle class="column one" :wikidocumentaries="wikidocumentaries"></WikipediaArticle>
      <div class="divider"></div>
      <WikidataItem class="column two" :wikidocumentaries="wikidocumentaries"></WikidataItem>
    </div>
    <TopicImages :wikidocumentaries="wikidocumentaries"></TopicImages>
    <TopicMap :wikidocumentaries="wikidocumentaries"></TopicMap>
  </div>
</template>

<script>
import TopicPageHeader from '@/components/TopicPageHeader'
import WikipediaArticle from '@/components/Wikipedia'
import WikidataItem from '@/components/Wikidata'
import TopicImages from '@/components/TopicImages'
import TopicMap from '@/components/TopicMap'
export default {
  name: 'Home',
  props: {
      wikidocumentaries: Object
  },
  data () {
    return {
      msg: ''
    }
  },
  components: {
    TopicPageHeader,
    WikipediaArticle,
    WikidataItem,
    TopicImages,
    TopicMap
  },
  computed: {
    testaus: function() {
        //console.log(this.wikidocumentaries);
        return "testaus";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.row {
	display: flex;
	flex-direction: row;
}

.column {
	display: flex;
	flex-direction: column;
}

.one {
	flex: 0 1 66%;
}

.two {
	flex: 1 1 34%;
}

.divider {
    width: 1px;
    margin: 6px 0;
    background: rgb(0, 0, 0);
}

</style>
