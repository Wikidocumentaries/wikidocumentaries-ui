<template>
  <div>
    <div
      class="data-select"
      :class="[shouldShowMenu ? 'active-term' : '']"
      @click="openSearch"
    >{{ term }}</div>
    <!--:style="{ left: leftedge + 'px' }"-->
    <div class="search-results" @mouseleave="hideMenu">
      <div id="drop" :class="[shouldShowMenu ? showClass : hideClass]">
        <div
          v-show="topicInputValue.split(' ').length > 1"
          class="data-button"
          @click="rotateTerm"
        >{{ $t('imageViewer.imageMetadata.rotate') }}</div>
        <input
          id="findTopicInput"
          @input="debounceFindTopics"
          class="input-drop"
          v-model="topicInputValue"
          type="text"
        >
        <div class="drop-option" v-for="topic in topics" :key="topic.wikidata">
          <span class="topic-title">{{ topic.wikipage }}</span>
          <br>
          <span class="topic-summary">{{ getSummary(topic) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "debounce";
import jsonp from "jsonp";

export default {
  name: "Dataselect",
  props: {
    term: String
  },
  data() {
    return {
      topicInputValue: "",
      shouldShowMenu: false,
      showClass: "dropdown-content",
      hideClass: "dropdown-content-hide",
      topics: [],
      maxSummaryLengthInChars: 50,
      leftedge: 0
    };
  },
  created: function() {
    this.debounceFindTopics = debounce(this.findTopics, 500);
  },
  methods: {
    showMenu() {
      this.shouldShowMenu = true;
    },
    hideMenu() {
      this.shouldShowMenu = false;
    },
    getSummary(topic) {
      if (topic.summary == undefined) {
        return "";
      } else if (topic.summary.length > this.maxSummaryLengthInChars) {
        var summary = topic.summary;
        if (summary.indexOf(topic.wikipage) == 0) {
          summary = summary.substr(topic.wikipage.length);
        }
        if (summary.indexOf(",") == 0) {
          summary = summary.substr(1);
        }
        return summary;
      } else {
        return topic.summary;
      }
    },
    openSearch: function(el) {
      //const rect = el.getBoundingClientRect(); // get the element coordinates
      //const left = rect.left; // get its X position in relation to the entire window
      //console.log(rect, left);
      this.topicInputValue = this.term;
      this.debounceFindTopics();
    },
    rotateTerm: function() {
      let rotated;
      rotated = this.topicInputValue.replace(",", "").split(" ");
      rotated.push(rotated.shift());
      this.topicInputValue = rotated.join(" ");
      this.debounceFindTopics();
    },
    findTopics: function() {
      //console.log("findTopics");
      if (this.topicInputValue.length >= 3) {
        this.searchFromWikidata(this.topicInputValue);
      } else {
        this.hideMenu();
      }
      //this.$router.push('/Vapaamuurarin_hauta');
    },
    getTopicURL: function(topic) {
      return "/" + topic.wikidata + "?language=" + this.$i18n.locale;
    },
    searchFromWikidata: function(topicInputValue) {
      //console.log("searchFromWikidata");

      var url =
        "https://www.wikidata.org/w/api.php?" +
        "action=wbsearchentities" +
        "&search=" +
        encodeURIComponent(topicInputValue) +
        "&language=" +
        this.$i18n.locale +
        "&uselang=" +
        this.$i18n.locale +
        "&format=json" +
        "&type=item";
      ("&callback=callback");

      var _this = this;
      var topics = [];

      jsonp(url, null, (error, data) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          //console.log(data);

          if (data.search.length > 0) {
            var wikidataQueryURL =
              "https://" +
              this.$i18n.locale +
              ".wikipedia.org/w/api.php?" +
              "action=query&prop=pageprops&ppprop=wikibase_item&redirects=resolve&titles=";

            for (var i = 0; i < data.search.length; i++) {
              var item = data.search[i];
              var topic = {
                wikipage: item["label"],
                wikilink: item["id"],
                wikidocumentarieslink:
                  "/" + item["id"] + "/" + item["label"].split(" ").join("_"),
                summary: item["description"],
                wikidata: item["id"],
                wikidatalink: item["url"]
              };

              topics.push(topic);

              _this.topics = topics;
              // wikidataQueryURL = wikidataQueryURL.slice(0, -1);

              // wikidataQueryURL +=
              //     "&format=json" +
              //     "&callback=callback2";

              // jsonp(wikidataQueryURL, null, (error, data) => {
              //     if (error) {
              //         console.log(error);
              //         reject(error);
              //     } else {
              //         //console.log(data);
              //         if (data.query != undefined) {
              //             var pages = Object.values(data.query.pages);
              //             //console.log(pages);
              //             for (var i = 0; i < pages.length; i++) {
              //                 for (var j = 0; j < topics.length; j++) {
              //                     if (topics[j].wikipage == pages[i].title && pages[i].pageprops != undefined) {
              //                         topics[j].wikidata = pages[i].pageprops.wikibase_item;
              //                         topics[j].wikidatalink = "https://www.wikidata.org/wiki/" +
              //                     pages[i].pageprops.wikibase_item;
              //                     break;
              //                     }
              //                 }
              //             }
              //         }
              //     }
              // });
            }
          } else {
            // TODO let user know
          }
          this.showMenu();
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-items {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.input-drop {
  display: block;
  padding: 7px;
  font-size: inherit;
  border: none;
  min-width: 300px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 2px #333 solid;
  width: -webkit-fill-available;
  width: -moz-available;
}

.input-drop:focus {
  color: #333;
  outline: none;
}

.input-drop:focus::placeholder {
  visibility: hidden;
}

.button-find {
  border: none;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  padding: 1px 10px;
  background-color: #a74e77;
  color: white;
  display: flex;
  align-items: center;
}

.search-results {
  position: absolute;
  cursor: pointer;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 350px;
  -webkit-box-shadow: var(--main-shadow);
  box-shadow: var(--main-shadow);
}

.dropdown-content-hide {
  display: none;
}

/* Links inside the dropdown */
.drop-option {
  padding: 5px 10px;
  text-decoration: none;
  display: block;
  text-transform: none;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 11pt;
  line-height: 1.3;
  color: #333;
  transition: none;
}

/* Links inside the dropdown */
.drop-option:hover {
  box-shadow: none;
  outline: none;
  background-color: var(--main-red);
  color: white;
}

.topic-title {
  font-weight: bold;
}

span.topic-summary {
  font-weight: initial;
}

a.search-icon {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: color 80ms ease-in, background 80ms ease-in;
  transition: color 80ms ease-in, background 80ms ease-in;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  width: 45px;
  color: #333;
  box-shadow: none;
}

a.search-icon:hover {
  background: var(--main-txt-color);
  color: white;
}
</style>
