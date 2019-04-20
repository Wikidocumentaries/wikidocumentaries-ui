<template>
  <div class="haze">
    <div class="toolbar-item block">
      <a @click="isExpanded = !isExpanded" class="toolbar-item-a">
        <i class="wikiglyph" :class="[isExpanded ? 'wikiglyph-caret-up' : 'wikiglyph-caret-down']"></i>
      </a>
      <span class="tooltip">{{ tooltip }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpandBlock",
  props: {
      tooltip: String
  },
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
    Depicted
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

.block {
  display: inline-block;
}
</style>
