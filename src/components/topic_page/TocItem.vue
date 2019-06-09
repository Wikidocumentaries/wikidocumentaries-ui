<template>
  <div>
    <div class="toc-info" @click="navigate(link)">
      <div class="gallery-title">{{units}}</div>
      <!-- <div class="thumb-credit">35 {{units}}</div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "TocItem",
  props: {
    title: String,
    link: String,
    unit: String,
    units: String
  },
  data: {
  },
  methods: {
    navigate(link) {
      this.$emit("scrollTo", link);
    }
  }
};
</script>
<style scoped>
</style>