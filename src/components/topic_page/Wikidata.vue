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
        <li class="statement-list-item" v-for="statement in shownStatements" v-bind:key="statement.id">
            <div class="statement-label">{{ statement.label }}</div>
            <ul class="statement-values">
                <li class="statment-value-list-item" v-for="value in statement.values" :key="value.value">
                    <div class="statement-value">
                        <div v-if="value.url != null">
                            <a v-bind:href="getStatementURL(value)" :target="getTarget(value)" :style="getStyle(value)">{{ value.value }}</a>
                        </div>
                        <div v-else>
                            {{ value.value }}
                        </div>
                    </div>
                </li>
            </ul>
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
    shownStatements () {

        var statements = this.wikidocumentaries.wikidata.statements;
        var shownStatements = [];

        const removableProperties = ['P1472', 'P94', 'P242', 'P18', 'P948', 'P443', 'P910', 'P2959', 'P109', 'P3896'];

        for (var i = 0; i < statements.length; i++) {
            var statement = statements[i];
            if (statement.id == 'P31') {
                if (statement.values.length == 1) {
                    continue;
                }
            }
            else if (statement.id == 'P998') { // Value may be very long

                var modifiedStatement = Object.assign({}, statement);

                for (var j = 0; j < modifiedStatement.values.length; j++) {
                    //console.log(modifiedStatement.values[j]);
                    var parts = modifiedStatement.values[j].value.split('/');
                    //console.log(parts);
                    var newValue = "";
                    var count = 0;
                    for (var k = 0; k < parts.length; k++) {
                        if (count > 15) {
                            newValue += " ";
                            count = 0;
                        }
                        newValue += parts[k] + '/';
                        count += parts[k].length;
                    }

                    newValue = newValue.substring(0, newValue.length - 1);

                    modifiedStatement.values[j].value = newValue;
                }
                shownStatements.push(modifiedStatement);
            }
            else if (removableProperties.indexOf(statement.id) == -1) {
                
                shownStatements.push(statement);
            }
        }

        return shownStatements;
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
      getStatementURL(value) {
            if (value.sitelinks != undefined) {
                if (value.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
                    return "/wiki/" + value.sitelinks[this.$i18n.locale + "wiki"].split(' ').join('_') + "?language=" + this.$i18n.locale;
                }
                else if (value.sitelinks.enwiki != undefined) {
                    return "/wiki/" + value.sitelinks.enwiki.split(' ').join('_') + "?language=" + "en";
                }
                else {
                    return value.url;
                }
            }
            else {
                return value.url;
            }  
      },
      getTarget(value) {
          if (value.sitelinks != undefined) {
                if (value.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
                    return "_self";
                }
                else if (value.sitelinks.enwiki != undefined) {
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
      getStyle(value) {
          if (value.sitelinks != undefined) {
                if (value.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
                    return "";
                }
                else if (value.sitelinks.enwiki != undefined) {
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

.statement-list-item {
    padding-bottom: 12px;
    display: flex;
}

.statement-label {
    flex: 0 0 34%;
}

.statement-label::first-letter {
    text-transform: uppercase;
}

.statements-values {
    list-style-type: none;
    margin: 0;
    padding: 6px 12px;
}

.statment-value-list-item {
    padding-bottom: 12px;
    display: flex;
}

.statement-value {
    flex: 1 1 66%;
    padding-left: 6px;
}

</style>
