<template>
  <div class="home-page">
    <TopicPageHeader></TopicPageHeader>
    <div ref="wikirow" class="row" :class="[isExpanded ? 'expanded' : '']">
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
          <span class="tooltip">{{ isExpanded ? $t('general.collapse') : $t('general.expand') }}</span>
        </div>
      </div>
    </div>
    <!-- <SampoGallery></SampoGallery> -->
    <Locations id="locations"></Locations>
    <Parts id="parts"></Parts>
    <Works id="works"></Works>
    <Depicts id="depicts"></Depicts>
    <People id="people"></People>
    <Affiliations id="affiliations"></Affiliations>
    <TopicTimeline id="topicTimeline"></TopicTimeline>
    <EventList id="events"></EventList>
    <TopicMap id="topicMap"></TopicMap>
    <Depicted id="depicted"></Depicted>
    <TopicImages
      @showImagesOnMap="onShowImagesOnMap"
      @showImagesOnTimeline="onShowImagesOnTimeline"
    ></TopicImages>
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
import Parts from "@/components/topic_page/Parts";
import Affiliations from "@/components/topic_page/Affiliations";
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
    Footer,
    Parts,
    Affiliations
    //TopicNewspapers
  },
  computed: {},
  mounted: {
  },
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
</style>
