<template>
  <div class="home-page">
    <TopicPageHeader></TopicPageHeader>
    <div class="row"> 
      <WikipediaArticle class="column one"></WikipediaArticle>
      <div class="divider"></div>
      <WikidataItem class="column two"></WikidataItem>
    </div>
    <TopicImages @showImagesOnMap="onShowImagesOnMap" @showImagesOnTimeline="onShowImagesOnTimeline"></TopicImages>
    <TopicMap id="topicMap"></TopicMap>
    <TopicTimeline id="topicTimeline"></TopicTimeline>
    <TopicNewspapers id="topicNewspapers"></TopicNewspapers>
  </div>
</template>

<script>

import TopicPageHeader from '@/components/topic_page/TopicPageHeader'
import WikipediaArticle from '@/components/topic_page/Wikipedia'
import WikidataItem from '@/components/topic_page/Wikidata'
import TopicImages from '@/components/topic_page/TopicImages'
import TopicMap from '@/components/topic_page/TopicMap'
import TopicTimeline from '@/components/topic_page/TopicTimeline'
import TopicNewspapers from '@/components/topic_page/TopicNewspapers'

export default {
    name: 'TopicPage',
    props: {
    },
    data () {
        return {
        }
    },
    components: {
        TopicPageHeader,
        WikipediaArticle,
        WikidataItem,
        TopicImages,
        TopicMap,
        TopicTimeline,
        TopicNewspapers
    },
    computed: {
    },
    methods: {
        onShowImagesOnMap() {
            //console.log("HomePage.onShowImagesOnMap");

            this.$scrollTo("#topicMap");
        },
        onShowImagesOnTimeline() {
            //console.log("HomePage.onShowImagesOnTimeline");

            this.$scrollTo("#topicTimeline");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .home-page {
    width: calc(100% - 5px);
} */

.row {
	display: flex;
	flex-direction: row;
    /* width: calc(100% - 10px); */
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
