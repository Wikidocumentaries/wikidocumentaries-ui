<template>
<div>
<div v-if="results.length">
 	<div class="wplinks">
        <div class="toolbar">
        <h1 class="header-title">{{ $t('topic_page.Links.headerTitle') }}</h1>
        </div>
        <div v-for="item in results" :key="item.id" class="linkrow">
            <div class="switch"></div>
            <div class="inputbox subject"><a :href="getItemURL(item.subject.value)">{{ item.subject.label }}</a></div>
            <div class="inputbox property">{{ item.propertyLabel }}</div>
            <div class="inputbox object">ceee{{ item.objectLabel }}</div>
            <div class="addbutton>"></div>
        </div>
	</div>
    </div>
</div>
</template>

<script>

import axios from "axios";
import wdk from 'wikidata-sdk';

export default {
    name: 'Links',
    props: {
    currentLanguage: String
  },
    data() {
        return {
            results: []
        };
    },
    mounted() {
        var title = this.$store.state.wikidocumentaries.title;
        const statements = this.$store.state.wikidocumentaries.wikidata.statements;
        let sparql;
        sparql = `
SELECT DISTINCT ?subject ?subjectLabel ?object ?objectLabel ?property ?propertyLabel WHERE {
  BIND (wd:Q88948269 as ?subject) .
  ?link schema:about wd:Q88948269;schema:isPartOf <https://fr.wikipedia.org/>;schema:name ?title . #point to the wiki you are searching, remove line if no QID
  SERVICE wikibase:mwapi {
	 bd:serviceParam wikibase:api "Generator" .
     bd:serviceParam wikibase:endpoint "fr.wikipedia.org" . #point to the wiki you are searching
     bd:serviceParam mwapi:titles ?title . #replace here if no QID
     bd:serviceParam mwapi:generator "links" .
    ?object wikibase:apiOutputItem mwapi:item .
    ?ns wikibase:apiOutput "@ns" .
  }
  OPTIONAL { ?subject ?p ?object .
  ?property wikibase:directClaim ?p .
  ?property rdfs:label ?propertyLabel . 
  FILTER(LANG(?propertyLabel)="fi") . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fi". }
  FILTER (?ns = "0"). #showing only articles
}
        `.replace(/Q88948269/g, this.$store.state.wikidocumentaries.wikidataId)
        .replace(/fi/g, this.$i18n.locale)
        .replace(/fr/g, this.currentLanguage);
        const [url, body] = wdk.sparqlQuery(sparql).split('?');
        axios
        .post(url, body)
        .then(response => {
			this.results = wdk.simplify.sparqlResults(response.data);
        })
        .catch(error => console.log(error));
    },
  computed: {
    wikidocumentaries() {
      return this.$store.state.wikidocumentaries;
    }
  },
  methods: {
    getItemURL(value) {
      return "/" + value + "?language=" + this.$i18n.locale;
    }
  }
}

</script>

<style scoped>
.linkrow {
    display:flex;
    margin-left: 20px;
    margin-right: 20px;
}
.inputbox {
/*     border: solid var(--main-dimmed) 1px;
    padding: 0 10px; */
    height: 35px;
    flex: 1 1 33%;
}
</style>
