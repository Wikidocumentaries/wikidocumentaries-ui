<template>
    <div class="map-place-match-editor">
    </div>
</template>

<script>

export default {
  name: 'PlaceMatchEditor',
  props: {
  },
  computed: {
    wikidocumentaries () {
          return this.$store.state.wikidocumentaries;
      },
  },
  data () {
    return {
    }
  },
  components: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
