<template>
  <div class="home-page">
    <TopicPageHeader></TopicPageHeader>
    <div ref="wikirow" class="row" :class="[isExpanded ? 'expanded' : 'notexpanded']">
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
    <Partof id="partof"></Partof>
    <Parts id="parts"></Parts>
    <Twins id="twins"></Twins>
    <Locations id="locations"></Locations>
    <Effects id="effects"></Effects>
    <Works id="works"></Works>
    <Awards id="awards"></Awards>
    <Depicts id="depicts"></Depicts>
    <People id="people"></People>
    <Things id="things"></Things>
    <Affiliations id="affiliations"></Affiliations>
    <Depicted id="depicted"></Depicted>
    <TopicMap id="topicMap"></TopicMap>
    <TopicTimeline id="topicTimeline"></TopicTimeline>
    <EventList id="events"></EventList>
    <Similar id="similar"></Similar>
    <TopicImages
      @showImagesOnMap="onShowImagesOnMap"
      @showImagesOnTimeline="onShowImagesOnTimeline"
    ></TopicImages>
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
import EventList from "@/components/topic_page/EventList";
import Effects from "@/components/topic_page/Effects";
import Works from "@/components/topic_page/Works";
import Awards from "@/components/topic_page/Awards";
import People from "@/components/topic_page/People";
import Locations from "@/components/topic_page/Locations";
import Partof from "@/components/topic_page/Partof";
import Depicted from "@/components/topic_page/Depicted";
import Depicts from "@/components/topic_page/Depicts";
import Parts from "@/components/topic_page/Parts";
import Twins from "@/components/topic_page/Twins";
import Things from "@/components/topic_page/Things";
import Affiliations from "@/components/topic_page/Affiliations";
import Similar from "@/components/topic_page/Similar";
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
    EventList,
    Effects,
    Works,
    Awards,
    People,
    Parts,
    Partof,
    Locations,
    Depicted,
    Depicts,
    Things,
    Twins,
    Footer,
    Affiliations,
    Similar
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
