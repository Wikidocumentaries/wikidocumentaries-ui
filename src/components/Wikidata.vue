<template>
  <div class="Wikidata">
    <div class="header">
      <div class="header-title toolbar neg">
        {{ header.title }}
      </div>
      <HeaderLink class="header-link" :link="wikidataURL"></HeaderLink>
    </div>
    <div class="item-instance-title">{{ title }}</div>
    <ul class="statements">
        <li class="statement" v-for="statement in wikidocumentaries.wikidata.statements" v-bind:key="statement.id">
            <div class="statement-label">{{ statement.label }}</div>
            <div class="statement-value"><a v-bind:href="statement.url" target="_blank">{{ statement.value }}</a></div>
        </li>
    </ul>
  </div>
</template>

<script>
import HeaderLink from '@/components/HeaderLink'
export default {
  name: 'WikidataItem',
  props: {
      wikidocumentaries: Object
  },
  data () {
    return {
      msg: 'article',
      header: {
        title: 'Tiedot Wikidatassa'
      }
    }
  },
  components: {
    HeaderLink
  },
  computed: {
    wikidataURL: function() {
        //console.log(this.wikidocumentaries);
        return "https://www.wikidata.org/wiki/" + this.wikidocumentaries.wikidata.id;
    },
    title: function () {
        return this.wikidocumentaries.wikidata.instance_of.value;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.item-instance-title {
    padding: 6px 12px;
    text-transform: uppercase;
    font-weight: bold;
}

.statements {
    list-style-type: none;
    margin: 0;
    padding: 6px 12px;
}

.statement {
    padding-bottom: 12px;
    display: flex;
}

.statement-label {
    flex: 1 1 34%;
}

.statement-label::first-letter {
    text-transform: uppercase;
}

.statement-value {
    flex: 1 1 66%;
    padding-left: 6px;
}

</style>
