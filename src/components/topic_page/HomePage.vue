<template>
  <div class="home-page">
    <TopicPageHeader></TopicPageHeader>
    <div class="row" :class="[isExpanded ? 'expanded' : '']">
      <WikipediaArticle class="column one"></WikipediaArticle>
      <WikidataItem class="column two"></WikidataItem>
      <div class="haze" id="wiki">
        <div class="toolbar-item block">
          <a @click="isExpanded = !isExpanded" class="toolbar-item-a">
            <i
              class="wikiglyph"
              :class="[isExpanded ? 'wikiglyph-caret-up' : 'wikiglyph-caret-down']"
            ></i>
          </a>
          <span v-if="isExpanded == false" class="tooltip">{{ $t('general.expand') }}</span>
          <span v-else class="tooltip">{{ $t('general.collapse') }}</span>
        </div>
      </div>
    </div>
    <!-- <SampoGallery></SampoGallery> -->
    <Locations id="locations"></Locations>
    <Works id="works"></Works>
    <Depicts id="depicts"></Depicts>
    <Depicted id="depicted"></Depicted>
    <People id="people"></People>
    <EventList id="events"></EventList>
    <TopicMap id="topicMap"></TopicMap>
    <TopicImages
      @showImagesOnMap="onShowImagesOnMap"
      @showImagesOnTimeline="onShowImagesOnTimeline"
    ></TopicImages>
    <!--TopicTimeline id="topicTimeline"></TopicTimeline-->
    <!--TopicNewspapers id="topicNewspapers"></TopicNewspapers-->
    <Footer></Footer>
  </div>
</template>

<script>
import TopicPageHeader from "@/components/topic_page/TopicPageHeader";
import WikipediaArticle from "@/components/topic_page/Wikipedia";
import WikidataItem from "@/components/topic_page/Wikidata";
import TopicMap from "@/components/topic_page/TopicMap";
import TopicImages from "@/components/topic_page/TopicImages";
import TopicTimeline from "@/components/topic_page/TopicTimeline";
// import SampoGallery from '@/components/topic_page/SampoGallery'
import EventList from "@/components/topic_page/EventList";
import Works from "@/components/topic_page/Works";
import People from "@/components/topic_page/People";
import Locations from "@/components/topic_page/Locations";
import Depicted from "@/components/topic_page/Depicted";
import Depicts from "@/components/topic_page/Depicts";
import Footer from "@/components/Footer";
//import TopicNewspapers from '@/components/topic_page/TopicNewspapers'

export default {
  name: "TopicPage",
  props: {},
  data() {
    return {
      isExpanded: false
    };
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
    People,
    Locations,
    Depicted,
    Depicts,
    Footer
    //TopicNewspapers
  },
  computed: {},
  methods: {
    onShowImagesOnMap() {
      this.$nextTick(function() {
        //console.log("HomePage.onShowImagesOnMap");
        this.$scrollTo("#topicMap");
      });
    },
    onShowImagesOnTimeline() {
      //console.log("HomePage.onShowImagesOnTimeline");

      this.$scrollTo("#topicTimeline");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .home-page {
    width: calc(100% - 5px);
} */

.divider {
  width: 1px;
  margin: 6px 0;
  background: rgb(0, 0, 0);
}
</style>
