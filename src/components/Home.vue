<template>
  <div class="home">
    <TopicPageHeader :wikidocumentaries="wikidocumentaries"></TopicPageHeader>
    <div class="row"> 
      <WikipediaArticle class="column one" :wikidocumentaries="wikidocumentaries"></WikipediaArticle>
      <div class="divider"></div>
      <WikidataItem class="column two" :wikidocumentaries="wikidocumentaries"></WikidataItem>
    </div>
    <TopicImages></TopicImages>
  </div>
</template>

<script>
import Map from '@/components/Map'
import TopicPageHeader from '@/components/TopicPageHeader'
import WikipediaArticle from '@/components/Wikipedia'
import WikidataItem from '@/components/Wikidata'
import TopicImages from '@/components/TopicImages'
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
    TopicImages
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
h1, h2 {
  font-weight: normal;
}

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
