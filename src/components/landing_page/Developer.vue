<template>
    <div class="developer-page">
        <label for="findTopicInput">Topic:</label>
        <input id="findTopicInput" v-model="topicInputValue" type="text">
        <button @click="findTopic">Hae</button>
            
        <table>
            <tr>
                <th>WikiDocumentaries-sivu</th>
                <th>Wikipedia-artikkeli</th>
                <th>Wikidata-kohde</th>
                <th>Wikipedia-yhteenveto</th>
            </tr>
            <tr v-for="topic in topics" :key="topic.wikipage">
                <td><a :href="topic.wikidocumentarieslink" @click.prevent="showPage(topic)">{{ topic.wikipage }}</a></td>
                <td><a :href="topic.wikilink" target="_blank">{{ topic.wikipage }}</a></td>
                <td><a :href="topic.wikidatalink" target="_blank">{{ topic.wikidata }}</a></td>
                <td>{{ topic.summary }}</td>
            </tr>
        </table>
    </div>
</template>

<script>

import jsonp from 'jsonp'

export default {
  name: 'devpage',
  props: {
  },
  computed: {
      wikidocumentaries () {
          return this.$store.state.wikidocumentaries;
      },
  },
  data: function () {
        return {
            //topicInputValue: "",
            topicInputValue: "Vapaamu",
            topics: []
        }
  },
  components: {
  },
  methods: {
        findTopic: function (event) {
            this.topics = this.searchFromWikipedia(this.topicInputValue);
        },
        searchFromWikipedia: function(topicInputValue) {
            var url = "https://fi.wikipedia.org/w/api.php?action=opensearch&search=" +
                topicInputValue +
                "&limit=20&namespace=0&redirects=resolve"
                "&format=json" +
                "&callback=callback";

            var _this = this;
            var topics = [];

            jsonp(url, null, (error, data) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        console.log(data);

                        if (data.length > 0) {
                            
                            var wikidataQueryURL = "https://fi.wikipedia.org/w/api.php?" + 
                                    "action=query&prop=pageprops&ppprop=wikibase_item&redirects=resolve&titles=";
                                    

                            for (var i = 0; i < data[1].length; i++) {

                                wikidataQueryURL += data[1][i] + "|";

                                var topic = {
                                    wikipage: data[1][i],
                                    wikilink: data[3][i],
                                    wikidocumentarieslink: "/" +
                                        data[1][i].split(' ').join('_'),
                                    summary: data[2][i],
                                    wikidata: "",
                                    wikidatalink: "",
                                }

                                topics.push(topic);
                            }

                            _this.topics = topics;
                            wikidataQueryURL = wikidataQueryURL.slice(0, -1);

                            wikidataQueryURL +=
                                "&format=json" +
                                "&callback=callback2";

                            jsonp(wikidataQueryURL, null, (error, data) => {
                                if (error) {
                                    console.log(error);
                                    reject(error);
                                } else {
                                    //console.log(data);
                                    var pages = Object.values(data.query.pages);
                                    console.log(pages);
                                    for (var i = 0; i < pages.length; i++) {
                                        for (var j = 0; j < topics.length; j++) {
                                            if (topics[j].wikipage == pages[i].title) {
                                                topics[j].wikidata = pages[i].pageprops.wikibase_item;
                                                topics[j].wikidatalink = "https://www.wikidata.org/wiki/" + 
                                              pages[i].pageprops.wikibase_item;
                                              break;
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
            });

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
