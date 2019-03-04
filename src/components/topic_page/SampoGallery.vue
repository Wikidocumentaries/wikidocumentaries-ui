<template>
<div v-if="results.length">
  <div class="toolbar"><div class="header-title">Sampo</div></div>
  <ul>
    <li v-for="item in results">
      {{ item.relation }} {{ item.start.substring(0, 4) }}: {{ item.description }}
    </li>
  </ul>
  <div id='timelineFIXME' :fixme='timelineData'></div>
</div>
</template>

<script>
import axios from 'axios'
import wdk from 'wikidata-sdk'
export default {
    name: 'SampoGallery',
    data() {
        return {
            results: []
        };
    },
    computed: {
        timelineData() {
            var timeline = {
                timeline: {
                    type: 'default',
                    date: [],
                }
            };

            for (var i = 0; i<this.results.length; i++) {
                var item = this.results[i];
                timeline.timeline.date.push({
                    startDate: item.start.substring(0, 4),
                    headline: item.description,
                    text: item.description,
                });
            }

            console.log("timeline", document.getElementById('timeline'), this.results.length);

            if (document.getElementById('timeline') && this.results.length > 0) {
                createStoryJS({
                    type:       'timeline',
                    // width:      '800',
                    height:     '400',
                    source:     timeline,
                    start_at_slide: 0 ,
                    // start_zoom_adjust: years > 100 ? -2 : -1 ,
                    embed_id:   'timeline'
                });
            }
        }
    },
    mounted() {
        var title = this.$store.state.wikidocumentaries.title;
        var part = title;
        // if the topic is a person
        if (this.$store.state.wikidocumentaries.wikidata.instance_of.id == "Q5") {
            // switch name to format "Lastname, Firstname"
            title = title.replace(/([^ ]+) ([^ ]+ )*([^ ]+)/, "$3, $1");
            part = title.split(", ")[1];
        }
        const sparql = `
PREFIX ldfhis: <http://ldf.fi/history/sparql>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
SELECT ?start ?relation ?description
WHERE {
    SERVICE ldfhis: {
       ?s rdfs:label ` + JSON.stringify(title) + `@fi .
       ?s2 ?p ?s ; rdfs:label ?description .
       ?s2 crm:P4_has_time-span [ crm:P82a_start_of_the_beginning ?start ]
       SERVICE ldfhis: {
        ?p rdfs:label ?relation .
        FILTER (lang(?relation) = "fi")
       }
    }
}
ORDER BY ?start
        `;
        const url = wdk.sparqlQuery(sparql).replace("https://query.wikidata.org/sparql", this.$store.state.BASE_URL+"sparql");
        axios
            .get(url)
            .then(response => (this.results = wdk.simplify.sparqlResults(response.data)))
            .catch(error => console.log(error));
    },
}
</script>

<style scoped>
</style>
