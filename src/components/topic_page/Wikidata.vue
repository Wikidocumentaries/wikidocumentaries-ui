<template>
  <div class="Wikidata">
    <div class="header">
      <div class="header-title toolbar neg">
        {{ $t('topic_page.Wikidata.headerTitle') }}
      </div>
      <HeaderLink class="header-link" :link="wikidataURL" v-show="wikidocumentaries.wikidata != undefined"></HeaderLink>
    </div>
    <div class="item-instance-title">{{ title }}</div>
    <ul class="statements" v-if="wikidocumentaries.wikidata != undefined">
        <li class="statement" v-for="statement in wikidocumentaries.wikidata.statements" v-bind:key="statement.id">
            <div class="statement-label">{{ statement.label }}</div>
            <div class="statement-value">
                <div v-if="statement.url != null">
                    <a v-bind:href="getStatementURL(statement)" :target="getTarget(statement)" :style="getStyle(statement)">{{ statement.value }}</a>
                </div>
                <div v-else>
                    {{ statement.value }}
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import HeaderLink from '@/components/HeaderLink'
export default {
  name: 'WikidataItem',
  props: {
  },
  data () {
    return {
    }
  },
  components: {
    HeaderLink
  },
  computed: {
    wikidocumentaries () {
        return this.$store.state.wikidocumentaries;
    },
    wikidataURL: function() {
        //console.log(this.wikidocumentaries);
        if (this.wikidocumentaries.wikidata != undefined && this.wikidocumentaries.wikidata.id != undefined) {
            return "https://www.wikidata.org/wiki/" + this.wikidocumentaries.wikidata.id;
        }
        else {
            return null;
        }
    },
    title: function () {
        if (this.wikidocumentaries.wikidata != undefined && this.wikidocumentaries.wikidata.instance_of != undefined) {
            return this.wikidocumentaries.wikidata.instance_of.value;
        }
        else {
            return this.$t('topic_page.Wikidata.noTopicFoundText');
        }
    },
  },
  methods: {
      getStatementURL(statement) {
            if (statement.sitelinks != undefined) {
                if (statement.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
                    return "/wiki/" + statement.sitelinks[this.$i18n.locale + "wiki"].split(' ').join('_') + "?language=" + this.$i18n.locale;
                }
                else if (statement.sitelinks.enwiki != undefined) {
                    return "/wiki/" + statement.sitelinks.enwiki.split(' ').join('_') + "?language=" + this.$i18n.locale;
                }
                else {
                    return statement.url;
                }
            }
            else {
                return statement.url;
            }  
      },
      getTarget(statement) {
          if (statement.sitelinks != undefined) {
                if (statement.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
                    return "_self";
                }
                else if (statement.sitelinks.enwiki != undefined) {
                    return "_self";
                }
                else {
                    return "_blank";
                }
            }
            else {
                return "_blank";
            }  
      },
      getStyle(statement) {
          if (statement.sitelinks != undefined) {
                if (statement.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
                    return "";
                }
                else if (statement.sitelinks.enwiki != undefined) {
                    return "";
                }
                else {
                    var style = "color: #52758b;";
                    return style;
                }
            }
            else {
                var style = "color: #52758b;";
                return style;
            }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dev-color {
    color: #52758b;
}

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
