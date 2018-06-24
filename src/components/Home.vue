<template>
  <div class="home">
    <TopicPageHeader :wikidocumentaries="wikidocumentaries"></TopicPageHeader> 
    <p>{{ testaus }}</p>
  </div>
</template>

<script>
import Map from '@/components/Map'
import TopicPageHeader from '@/components/TopicPageHeader'
export default {
  name: 'Home',
  props: {
      wikidocumentaries: Object
  },
  data () {
    return {
      msg: 'Vapaamuurarin hauta'
    }
  },
  components: {
    TopicPageHeader,
  },
  computed: {
    testaus: function() {
        console.log(this.wikidocumentaries);
        return "testaus";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
