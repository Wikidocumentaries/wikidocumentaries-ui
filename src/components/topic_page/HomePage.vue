<template>
  <div class="home-page">
    <TopicPageHeader></TopicPageHeader>
    <div class="row">
      <WikipediaArticle class="column one"></WikipediaArticle>
      <!--div class="divider"></div-->
      <WikidataItem class="column two"></WikidataItem>
    </div>
    <!-- <SampoGallery></SampoGallery> -->
    <People id="people"></People>
    <Works id="works"></Works>
    <EventList></EventList>
    <TopicMap id="topicMap"></TopicMap>
    <TopicImages @showImagesOnMap="onShowImagesOnMap" @showImagesOnTimeline="onShowImagesOnTimeline"></TopicImages>
    <!--TopicTimeline id="topicTimeline"></TopicTimeline-->
    <!--TopicNewspapers id="topicNewspapers"></TopicNewspapers-->
  </div>
</template>

<script>

import TopicPageHeader from '@/components/topic_page/TopicPageHeader'
import WikipediaArticle from '@/components/topic_page/Wikipedia'
import WikidataItem from '@/components/topic_page/Wikidata'
import TopicMap from '@/components/topic_page/TopicMap'
import TopicImages from '@/components/topic_page/TopicImages'
import TopicTimeline from '@/components/topic_page/TopicTimeline'
// import SampoGallery from '@/components/topic_page/SampoGallery'
import EventList from '@/components/topic_page/EventList'
import Works from '@/components/topic_page/Works'
import People from '@/components/topic_page/People'
//import TopicNewspapers from '@/components/topic_page/TopicNewspapers'

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
        TopicMap,
        TopicImages,
        TopicTimeline,
        // SampoGallery,
        EventList,
        Works,
        People
        //TopicNewspapers
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
    overflow-y: hidden;
    align-items: start;
    /*height: 60vh;*/
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
