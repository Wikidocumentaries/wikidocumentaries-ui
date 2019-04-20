<template>
  <div class="toolbar-item" :@click="action">
    <a href="#" @click="hide" class="toolbar-item-a">
        <i class="wikiglyph" :class="icon"></i>
    </a>
    <span class="tooltip">{{ tooltip }}</span>  
  </div>
</template>

<script>
export default {
  name: "HeaderButton",
  props: {
    icon: String,
    tooltip: String
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
