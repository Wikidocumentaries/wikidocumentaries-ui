<template>
  <div class="wait-page">
    <div class="wait">
      <div class="lds-heart">
        <div></div>
      </div>
      <div class="message">{{ $t("WaitPage.waitMessage") }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitPage",
  props: {},
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wait {
  padding: 20px;
  display: flex;
  align-items: center;
}

.message {
    padding-left: 20px;
}
</style>
