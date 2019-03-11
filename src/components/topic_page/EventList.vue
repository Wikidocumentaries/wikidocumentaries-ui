<template>
<div>
  <div v-if="results.length">
    <div class="toolbar"><div class="header-title">Tapahtumat</div></div>
    <ul>
      <li v-for="item in results">
        <a :href="item.event">{{ item.relation }} {{ item.time }}</a>: {{ item.description }}
          (<a :href="item.ref1">1</a><span v-if="item.ref2">, <a :href="item.ref2">2</a></span>)
      </li>
    </ul>
  </div>
  <!-- <div v-if="wikidataResults.length">
    <div class="toolbar"><div class="header-title">Tapahtumat-WD</div></div>
    <ul>
      <li v-for="item in wikidataResults">
        {{ item.wdLabel }} {{ item.time.substring(0, 4) }} {{ item.label }}
      </li>
    </ul>
  </div> -->
</div>
</template>

<script>
import axios from 'axios'
import wdk from 'wikidata-sdk'
export default {
    name: 'EventList',
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

        let sparql;
        if (kbid) { // Entry has a "kansallisbiografia-id" => is a person
          sparql = `
          PREFIX ldfhis: <http://ldf.fi/history/sparql>
          PREFIX wikidata: <https://query.wikidata.org/sparql>
          PREFIX wd: <http://www.wikidata.org/entity/>
          PREFIX wdt: <http://www.wikidata.org/prop/direct/>
          PREFIX wikibase: <http://wikiba.se/ontology#>
          PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
          SELECT ?time ?event ?relation ?description ?ref1 ?ref2
          WHERE {
            {
              SERVICE wikidata: {
                SELECT (GROUP_CONCAT(?time;separator="-") AS ?time) ?event
                       (SAMPLE(?relation) AS ?relation) (SAMPLE(?description) AS ?description)
                       (SAMPLE(?ref1) AS ?ref1) WHERE {
                  SELECT DISTINCT ?time ?event ?relation ?description ?ref1 WHERE {
                    wd:Q170068 ?p ?event .
                    BIND(wd:Q170068 AS ?ref1)
                    ?wd wikibase:claim ?p .
                    OPTIONAL { ?wd rdfs:label ?rf . FILTER(LANG(?rf)="fi") }
                    OPTIONAL { ?wd rdfs:label ?rs . FILTER(LANG(?rs)="sv") }
                    OPTIONAL { ?wd rdfs:label ?re . FILTER(LANG(?re)="en") }
                    OPTIONAL { ?wd rdfs:label ?rd . FILTER(LANG(?rd)="") }
                    ?wd rdfs:label ?ra .
                    BIND(COALESCE(?rf,?rd,?re,?rs,?ra) AS ?relation)
                    ?event ?p2 [ wikibase:timeValue ?tval ] ;
                           ?p3 ?o1 .
                    BIND(substr(str(?tval),1,4) AS ?time)
                    OPTIONAL { ?o1 rdfs:label ?lf . FILTER(LANG(?lf)="fi") }
                    OPTIONAL { ?o1 rdfs:label ?ls . FILTER(LANG(?ls)="sv") }
                    OPTIONAL { ?o1 rdfs:label ?le . FILTER(LANG(?le)="en") }
                    OPTIONAL { ?o1 rdfs:label ?ld . FILTER(LANG(?ld)="") }
                    ?o1 rdfs:label ?la .
                    BIND(COALESCE(?lf,?ld,?le,?ls,?la) AS ?description)
                  } ORDER BY ?time
                } GROUP BY ?event
              }
            } UNION {
              SERVICE ldfhis: {
                SELECT DISTINCT ?time ?event ?relation ?description ?ref1 ?ref2 WHERE {
                  SERVICE wikidata: { wd:Q170068 wdt:P2180 ?kb_id }
                  BIND (URI(CONCAT ("http://www.kansallisbiografia.fi/kb/artikkeli/", str(?kb_id))) AS ?ref1)
                  ?ref2 rdfs:seeAlso ?ref1 .
                  ?event ?p ?ref2 ;
                         crm:P4_has_time-span [ crm:P82_at_some_time_within ?time ]
                  OPTIONAL { ?event rdfs:label ?lf . FILTER(LANG(?lf)="fi") }
                  OPTIONAL { ?event rdfs:label ?ls . FILTER(LANG(?ls)="sv") }
                  OPTIONAL { ?event rdfs:label ?le . FILTER(LANG(?le)="en") }
                  OPTIONAL { ?event rdfs:label ?ld . FILTER(LANG(?ld)="") }
                  ?event rdfs:label ?la .
                  BIND(COALESCE(?lf,?ld,?le,?ls,?la) AS ?description)
                  OPTIONAL { ?p rdfs:label ?rf . FILTER(LANG(?rf)="fi") }
                  OPTIONAL { ?p rdfs:label ?rs . FILTER(LANG(?rs)="sv") }
                  OPTIONAL { ?p rdfs:label ?re . FILTER(LANG(?re)="en") }
                  OPTIONAL { ?p rdfs:label ?rd . FILTER(LANG(?rd)="") }
                  ?p rdfs:label ?ra .
                  BIND(COALESCE(?rf,?rd,?re,?rs,?ra) AS ?relation)
                }
              }
            }
          }
          ORDER BY ?time
        `; // .replace(/Q170068/g, this.$store.state.wikidocumentaries.wikidataId);

        } else {
          sparql = `
          PREFIX ldfhis: <http://ldf.fi/history/sparql>
          PREFIX wikidata: <https://query.wikidata.org/sparql>
          PREFIX wd: <http://www.wikidata.org/entity/>
          PREFIX wdt: <http://www.wikidata.org/prop/direct/>
          PREFIX wikibase: <http://wikiba.se/ontology#>
          PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
          SELECT ?time ?event ?relation ?description ?ref1 ?ref2
          WHERE {
            {
              SERVICE wikidata: {
                SELECT (GROUP_CONCAT(?time;separator="-") AS ?time) ?event
                       (SAMPLE(?relation) AS ?relation) (SAMPLE(?description) AS ?description)
                       (SAMPLE(?ref1) AS ?ref1) WHERE {
                  SELECT DISTINCT ?time ?event ?relation ?description ?ref1 WHERE {
                    wd:Q1757 ?p ?event .
                    BIND(wd:Q1757 AS ?ref1)
                    ?wd wikibase:claim ?p .
                    OPTIONAL { ?wd rdfs:label ?rf . FILTER(LANG(?rf)="fi") }
                    OPTIONAL { ?wd rdfs:label ?rs . FILTER(LANG(?rs)="sv") }
                    OPTIONAL { ?wd rdfs:label ?re . FILTER(LANG(?re)="en") }
                    OPTIONAL { ?wd rdfs:label ?rd . FILTER(LANG(?rd)="") }
                    OPTIONAL { ?wd rdfs:label ?ra }
                    BIND(COALESCE(?rf,?rd,?re,?rs,?ra) AS ?relation)
                    FILTER(bound(?relation))
                    ?event ?p2 [ wikibase:timeValue ?tval ] ;
                           ?p3 ?o1 .
                    BIND(substr(str(?tval),1,4) AS ?time)
                    OPTIONAL { ?o1 rdfs:label ?lf . FILTER(LANG(?lf)="fi") }
                    OPTIONAL { ?o1 rdfs:label ?ls . FILTER(LANG(?ls)="sv") }
                    OPTIONAL { ?o1 rdfs:label ?le . FILTER(LANG(?le)="en") }
                    OPTIONAL { ?o1 rdfs:label ?ld . FILTER(LANG(?ld)="") }
                    OPTIONAL { ?o1 rdfs:label ?la }
                    BIND(COALESCE(?lf,?ld,?le,?ls,?la) AS ?description)
                    FILTER(bound(?description))
                  } ORDER BY ?time
                } GROUP BY ?event
              }
            } UNION {
              SERVICE ldfhis: {
                {
                  SELECT DISTINCT (substr(str(?strt), 1, 4) AS ?time) ?relation ?event ?description ?ref1 WHERE {
                    ?ref rdfs:label "Helsinki"@fi .
                    ?event ?p ?ref ;
                         crm:P4_has_time-span [ crm:P82a_start_of_the_beginning ?strt ] .
                   OPTIONAL { ?event rdfs:label ?lf . FILTER(LANG(?lf)="fi") }
                   OPTIONAL { ?event rdfs:label ?ls . FILTER(LANG(?ls)="sv") }
                   OPTIONAL { ?event rdfs:label ?le . FILTER(LANG(?le)="en") }
                   OPTIONAL { ?event rdfs:label ?ld . FILTER(LANG(?ld)="") }
                   OPTIONAL { ?event rdfs:label ?la }
                   BIND(COALESCE(?lf,?ld,?le,?ls,?la) AS ?description)
                   FILTER(bound(?description))
                    BIND(str(?ref) AS ?rs)
                    BIND(URI(IF(STRSTARTS(?rs, "http://www.yso.fi/onto/sapo/"),
                            CONCAT("http://www.kulttuurisampo.fi/item.shtml?itemUri=",
                                  ENCODE_FOR_URI(CONCAT("http://www.yso.fi/kulttuuriSampo/paikat#",
                                                        LCASE(STRAFTER(STRBEFORE(?rs,"_"), "http://www.yso.fi/onto/sapo/"))))
                                  ),
                            IF (STRSTARTS(?rs, "http://www.yso.fi/kulttuuriSampo"),
                              CONCAT("http://www.kulttuurisampo.fi/item.shtml?itemUri=", ENCODE_FOR_URI(?rs)),
                              ?rs)))
                        AS ?ref1)
                    OPTIONAL { ?p rdfs:label ?rf . FILTER(LANG(?rf)="fi") }
                    OPTIONAL { ?p rdfs:label ?rs . FILTER(LANG(?rs)="sv") }
                    OPTIONAL { ?p rdfs:label ?re . FILTER(LANG(?re)="en") }
                    OPTIONAL { ?p rdfs:label ?rd . FILTER(LANG(?rd)="") }
                    OPTIONAL { ?p rdfs:label ?ra }
                    BIND(COALESCE(?rf,?rd,?re,?rs,?ra) AS ?relation)
                    FILTER(bound(?relation))
                  }
                }
              }
            }
          }
          ORDER BY ?time
        `.replace(/Q1757/g, this.$store.state.wikidocumentaries.wikidataId)
         .replace(/Helsinki/g, JSON.stringify(title));

        }

        const url = wdk.sparqlQuery(sparql).replace("https://query.wikidata.org/sparql", this.$store.state.BASE_URL+"sparql");
        axios
            .get(url)
            .then(response => (this.results = wdk.simplify.sparqlResults(response.data)))
            .catch(error => console.log(error));
            


//         const wikidataSparql = `
// PREFIX wd: <http://www.wikidata.org/entity/>
// PREFIX wikibase: <http://wikiba.se/ontology#>
// SELECT ?statement ?wdLabel ?p2 ?time ?label WHERE {
// SERVICE <https://query.wikidata.org/sparql> {
//   wd:Q170068 ?p ?statement .
//   ?wd wikibase:claim ?p .
//   ?wd rdfs:label ?wdLabel .
//   FILTER((LANG(?wdLabel)) = "fi")
//   ?statement ?p2 ?q1 .
//   ?statement ?p3 ?q2 .
//   ?q1 wikibase:timeValue ?time .
//   ?q2 rdfs:label ?label .
//   FILTER((LANG(?label)) = "fi")
//   }
// }
//         `.replace(/Q170068/g, this.$store.state.wikidocumentaries.wikidataId)
//          .replace(/"fi"/g, JSON.stringify(this.$i18n.locale));
//
//         const url2 = wdk.sparqlQuery(wikidataSparql).replace("https://query.wikidata.org/sparql", this.$store.state.BASE_URL+"sparql");
//         axios
//             .get(url2)
//             .then(response => (this.wikidataResults = wdk.simplify.sparqlResults(response.data)))
//             .catch(error => console.log(error));
    },
}
</script>

<style scoped>
</style>
