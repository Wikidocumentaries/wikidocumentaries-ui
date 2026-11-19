<template>
    <div v-if="results.length">
        <div class="colours">
            <div
            class="colourstripe"
            v-for="item in results"
            :key="item.id"
            :style="{ 'background': '#' + item.hex }"
            ></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import wdk from "wikidata-sdk";

export default {
  name: "Colours",
  data() {
    return {
      results: []
    };
  },
  mounted() {
    let sparql;
    sparql = `
SELECT DISTINCT ?color ?hex WHERE {
  wd:Q1419127 wdt:P462|wdt:P6364 ?color.
  ?color wdt:P465 ?hex .
}
        `.replace(/Q1419127/g, this.$store.state.wikidocumentaries.wikidataId)
    const [url, body] = wdk.sparqlQuery(sparql).split("?");
    axios
      .post(url, body)
      .then(response => {
        this.results = wdk.simplify.sparqlResults(response.data);
        console.log(this.results)
      })
      .catch(error => console.log(error));
  },
  computed: {
    wikidocumentaries() {
      return this.$store.state.wikidocumentaries;
    }
  },
  watch: {}
};

</script>

<style scoped>
.colours {
    display: flex;
    height: 30px;
    flex-direction: column;
}

.colourstripe {
    flex: 1 1;
}
</style>
