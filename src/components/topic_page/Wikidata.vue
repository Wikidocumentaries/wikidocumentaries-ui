<template>
  <div class="Wikidata">
    <div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.Wikidata.headerTitle') }}</h1>
      <HeaderLink
        class="toolbar-item"
        :tooltip="$t('topic_page.Wikidata.extLink.linkTitleWD')"
        :link="wikidataURL"
        icon="wikiglyph-new-window"
        v-show="wikidocumentaries.wikidata != undefined"
      ></HeaderLink>
    </div>
    <div :class="[isExpanded ? 'expanded' : '']" class="text-container dark" ref="datasection">
      <div class="item-instance-title">{{ title }}</div>
      <div v-if="wikidocumentaries.wikidata != undefined" class="data">
        <ul class="statements">
          <li class="statement-list-item" v-for="statement in shownStatements" :key="statement.id">
            <div class="statement-label">{{ statement.label }}</div>
            <ul class="statement-values">
              <li
                class="statment-value-list-item"
                v-for="(value, index) in statement.values"
                :key="getID(value) + index"
              >
                <div class="statement-value">
                  <div v-if="value.url != null">
                    <a
                      v-if="getTarget(value) != '_self'"
                      :href="getStatementURL(value)"
                      :target="getTarget(value)"
                      :class="getClass(value)"
                    >{{ getValue(value) }}</a>
                    <router-link
                      v-if="getTarget(value) == '_self'"
                      :to="getStatementURL(value)"
                    >{{ getValue(value) }}</router-link>
                    <div
                      v-for="q in value.qualifiers"
                      :key="q.id"
                      class="qualifier"
                    >{{ q.label }}: {{ q.value }}</div>
                  </div>
                  <div v-else>
                    <div>{{ getValue(value) }}</div>
                    <div
                      v-for="q in value.qualifiers"
                      :key="q.id"
                      class="qualifier"
                    >{{ q.label }}: {{ q.value }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="haze" id="wd">
      <div class="toolbar-item block">
        <a @click="isExpanded = !isExpanded" class="toolbar-item-a">
          <i
            class="wikiglyph"
            :class="[isExpanded ? 'wikiglyph-caret-up' : 'wikiglyph-caret-down']"
          ></i>
        </a>
        <span class="tooltip">{{ isExpanded ? $t('general.collapse') : $t('general.expand')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLink from "@/components/HeaderLink";
export default {
  name: "WikidataItem",
  props: {},
  data() {
    return {
      isExpanded: false,
      shownRemainingStaments: [],
      bigenough: true,
      datasection: ''
    };
  },
  components: {
    HeaderLink
  },
  computed: {
    isBigEnough() {
        console.log (this.$refs.datasection.clientHeight);
        // if (
        //     this.$refs.datasection.clientHeight
        // ) {
        //     this.bigenough = true
        // } else {
        //     this.bigenough = false;
        // }
        // return bigenough;
    },
    wikidocumentaries() {
      return this.$store.state.wikidocumentaries;
    },
    shownStatements() {
      //   this.shownRemainingStaments = [];

      var statements = this.wikidocumentaries.wikidata.statements;
      var shownStatements = [];

      //properties that are not displayed (displayed in some other form)
      const removableProperties = [
        "P18", //image
        "P1472", //Commons Creator page
        "P41", //flag image (P41)
        "P94", //shield image (P4004) > In the header
        "P158", //seal image (P158)
        "P242", //locator map image (P242)
        "P948", //page banner (P948)
        "P2959", //permanent duplicated item (P2959)
        "P109", //signature (P109)
        "P3896", //geoshape (P3896)
        "P1464", //category for people born here (P1464)
        "P1465", //category for people who died here (P1465)
        "P1791", //category of people buried here (P1791)
        "P1792", //category of associated people (P1792)
        "P1740" //category for films shot at this location (P1740)
      ];

      var totalValuesCount = 0;
      //   const maxLeadingStatementsCount = 6;

      for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];

        //console.log(statement);
        if (
          statement.id == "P31" && //instance of
          statement.values.length == 1 &&
          (statement.values[0].qualifiers == undefined ||
            statement.values[0].qualifiers.length == 0)
        ) {
          continue;
        } else if (statement.id == "P998") {
          // DMOZ ID (P998), Value may be very long

          var modifiedStatement = Object.assign({}, statement);

          for (var j = 0; j < modifiedStatement.values.length; j++) {
            //console.log(modifiedStatement.values[j]);
            var parts = modifiedStatement.values[j].value.split("/");
            //console.log(parts);
            var newValue = "";
            var count = 0;
            for (var k = 0; k < parts.length; k++) {
              if (count > 15) {
                newValue += " ";
                count = 0;
              }
              newValue += parts[k] + "/";
              count += parts[k].length;
            }

            newValue = newValue.substring(0, newValue.length - 1);

            modifiedStatement.values[j].value = newValue;
          }

          //   if (totalValuesCount < maxLeadingStatementsCount) {
          //   shownStatements.push(modifiedStatement);
          //   //}
          //   //else {
          //   //    this.shownRemainingStaments.push(modifiedStatement);
          //   //}

          //   totalValuesCount += statement.values.length;
        } else if (removableProperties.indexOf(statement.id) == -1) {
          //if (totalValuesCount < maxLeadingStatementsCount) {
          shownStatements.push(statement);
          //}
          //else {
          //    this.shownRemainingStaments.push(statement);
          //}

          totalValuesCount += statement.values.length;
        }
      }

      return shownStatements;
    },
    wikidataURL: function() {
      //console.log(this.wikidocumentaries);
      if (
        this.wikidocumentaries.wikidata != undefined &&
        this.wikidocumentaries.wikidata.id != undefined
      ) {
        return (
          "https://www.wikidata.org/wiki/" + this.wikidocumentaries.wikidata.id
        );
      } else {
        return null;
      }
    },
    title: function() {
      if (
        this.wikidocumentaries.wikidata != undefined &&
        this.wikidocumentaries.wikidata.instance_of != undefined
      ) {
        return this.wikidocumentaries.wikidata.instance_of.value;
      } else {
        return this.$t("topic_page.Wikidata.noTopicFoundText");
      }
    }
  },
  methods: {
    // switchExpand(event) {
    //   this.expanded = !this.expanded;
    // },
    getStatementURL(value) {
      if (value.id) {
        return "/" + value.id + "?language=" + this.$i18n.locale;
      } else {
        return value.url;
      }
    },
    getTarget(value) {
      if (value.id) {
        return "_self";
      } else {
        return "_blank";
      }
    },
    getClass(value) {
      if (value.sitelinks != undefined) {
        if (value.sitelinks[this.$i18n.locale + "wiki"] != undefined) {
          return "";
        } else if (value.sitelinks.enwiki != undefined) {
          return "";
        } else {
          var style = "external";
          return style;
        }
      } else {
        var style = "external";
        return style;
      }
    },
    getID(value) {
      var id = value.value;
      if (value.qualifiers != undefined) {
        value.qualifiers.forEach(qualifier => {
          id += qualifier.value;
        });
      }
      return id;
    },
    getValue(value) {
      var text = value.value;
      // console.log(value.value);
      // console.log(value.unit);
      if (value.unit != undefined) {
        text += " " + value.unit;

        if (this.$i18n.locale == "fi" && value.value != 1) {
          if (
            value.unit == "metri" ||
            value.unit == "kilometri" ||
            value.unit == "neliömetri" ||
            value.unit == "neliökilometri" ||
            value.unit == "kuutiometri" ||
            value.unit == "kuutiokilometri" ||
            value.unit == "kuutiometri"
          ) {
            text += "ä";
          } else if (value.unit == "aste") {
            text += "tta";
          } else if (
            value.unit.indexOf("gram", value.unit.length - "gram".length) != -1
          ) {
            text += "maa";
          } else if (value.unit == "astronominen yksikkö") {
            text =
              text.substring(0, text.length - "astronominen yksikkö".length) +
              "astronomista yksikköä";
          } else {
            text += "a";
          }
        }
        //console.log("value.unit != undefined");
      }

      return text;
    },
    getQualifiers(value) {
      var text = "";
      if (value.qualifiers != undefined && value.qualifiers.length > 0) {
        //console.log("value.qualifiers != undefined");
        // text += " (";
        value.qualifiers.forEach(qualifier => {
          text += qualifier.label + ": " + qualifier.value + ",  ";
        });
        text = text.substring(0, text.length - 2);
        // text += ")";
      }
      return text;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dev-color {
  color: #52758b;
}

.item-instance-title {
  padding-left: 20px;
/*   text-transform: uppercase;
  font-family: "Barlow Condensed", sans-serif; */
  font-size: 1.3em;
  font-weight: 600;
  color: #999;
}

.item-instance-title::first-letter {
  text-transform:uppercase;
}

.statements {
  list-style-type: none;
  margin: 5px 20px;
  padding: 0;
  line-height: 1.3;
  font-size: 0.9em;
}

.statement-list-item {
  /* padding-bottom: 5px; */
  display: flex;
  /*    flex-direction: column; */
}

.statement-label {
  flex: 0 0 40%;
  font-weight: bold;
  padding-bottom: 5px;
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
  /*  padding-bottom: 12px; */
  display: flex;
}

.statement-value {
  flex: 1 1 66%;
  padding-bottom: 5px;
}

ul.statement-values {
  padding-inline-start: 10px;
}

.qualifier {
  word-break: break-word;
  font-size: 0.9em;
  color: #666;
}

.expander {
  width: 100%;
  padding-top: 0;
  padding-right: 12px;
  margin-top: -10px;
  text-align: right;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
}

.expander:hover {
  outline: 0;
}

.expander:focus {
  outline: 0;
}

.top-exander {
  margin-bottom: -10px;
  padding-right: 0px;
}

.external:after {
  font-family: "WikiFont-Glyphs";
  font-weight: 400;
  content: " \e030";
}
</style>
