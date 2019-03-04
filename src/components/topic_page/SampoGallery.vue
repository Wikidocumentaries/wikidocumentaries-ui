<template>
<div>
  <div v-if="results.length">
    <div class="toolbar"><div class="header-title">Sampo</div></div>
    <ul>
      <li v-for="item in results">
        <a :href="item.event">{{ item.relation }} {{ item.time }}</a>: {{ item.description }}
      </li>
    </ul>
  </div>
  <div v-if="wikidataResults.length">
    <div class="toolbar"><div class="header-title">Tapahtumat</div></div>
    <ul>
      <li v-for="item in wikidataResults">
        {{ item.wdLabel }} {{ item.time.substring(0, 4) }} {{ item.label }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import wdk from 'wikidata-sdk'
export default {
    name: 'SampoGallery',
    data() {
        return {
            results: [],
            wikidataResults: [],
        };
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
        const statements = this.$store.state.wikidocumentaries.wikidata.statements
        let kbid;
        for (var index in statements) {
          if (statements[index].id == 'P2180') {
              kbid = statements[index].values[0].value;
          }
        }
        /*
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
        `; */

        let sparql;
        if (kbid) {
        sparql = `
    PREFIX ldfhis: <http://ldf.fi/history/sparql>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
    PREFIX kart: <http://www.kansallisbiografia.fi/kb/artikkeli/>
    SELECT ?time ?event ?relation ?description
    WHERE {
      SERVICE ldfhis: {
        {
          ?s rdfs:seeAlso kart:` + kbid + ` .
          ?event ?p ?s ; rdfs:label ?description .
          ?event crm:P4_has_time-span [ crm:P82_at_some_time_within ?time ]
        }
        {
           ?p rdfs:label ?relation .
           FILTER (lang(?relation) = "fi")
        }
      }
    }
    ORDER BY ?time
        `;

        } else {
        sparql = `
        PREFIX ldfhis: <http://ldf.fi/history/sparql>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        SELECT DISTINCT (substr(str(?strt), 1, 4) AS ?time) ?event ?relation ?description
        WHERE {
          SERVICE ldfhis: {
            {
              ?s rdfs:label ` + JSON.stringify(title) + `@fi .
              ?event ?p ?s ; rdfs:label ?description .
              ?event crm:P4_has_time-span [ crm:P82a_start_of_the_beginning ?strt ]
            }
            {
               ?p rdfs:label ?relation .
               FILTER (lang(?relation) = "fi")
            }
          }
        }
        ORDER BY ?time
        `;

        }

        const url = wdk.sparqlQuery(sparql).replace("https://query.wikidata.org/sparql", this.$store.state.BASE_URL+"sparql");
        axios
            .get(url)
            .then(response => (this.results = wdk.simplify.sparqlResults(response.data)))
            .catch(error => console.log(error));


        const wikidataSparql = `
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wikibase: <http://wikiba.se/ontology#>
SELECT ?statement ?wdLabel ?p2 ?time ?label WHERE {
SERVICE <https://query.wikidata.org/sparql> {
  wd:Q170068 ?p ?statement .
  ?wd wikibase:claim ?p .
  ?wd rdfs:label ?wdLabel .
  FILTER((LANG(?wdLabel)) = "fi")
  ?statement ?p2 ?q1 .
  ?statement ?p3 ?q2 .
  ?q1 wikibase:timeValue ?time .
  ?q2 rdfs:label ?label .
  FILTER((LANG(?label)) = "fi")
  }
}
        `;

        const url2 = wdk.sparqlQuery(wikidataSparql).replace("https://query.wikidata.org/sparql", this.$store.state.BASE_URL+"sparql");
        axios
            .get(url2)
            .then(response => (this.wikidataResults = wdk.simplify.sparqlResults(response.data)))
            .catch(error => console.log(error));
    },
}
</script>

<style scoped>
</style>
