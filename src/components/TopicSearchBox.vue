<template>
    <div class="topic-search-box">
        <div class="search-items">
            <input id="findTopicInput" autocomplete="off" @input="debounceFindTopics" class="input-find" v-model="topicInputValue" type="text" :placeholder="$t('LandingPage.searchInputSearchOnly')">
            <a href="#" class="search-icon"><i class="wikiglyph wikiglyph-magnifying-glass"></i></a>
        </div>
        <div class="search-results">
            <div :class="[shouldShowMenu ? showClass : hideClass]">
                <router-link v-for="topic in topics" :key="topic.wikidata" :to="getTopicURL(topic)"><span class="topic-title">{{ topic.wikipage }}</span><br><span class="topic-summary">{{ getSummary(topic) }}</span></router-link>
            </div>
        </div>
    </div>
</template>

<script>

import debounce from 'debounce'
import jsonp from 'jsonp'


export default {
    name: 'TopicSearchBox',
    props: {
    },
    data () {
        return {
            topicInputValue: "",
            shouldShowMenu: false,
            showClass: 'dropdown-content',
            hideClass: 'dropdown-content-hide',
            //topicInputValue: "Vapaamu",
            topics: [],
            maxSummaryLengthInChars: 50,
        }
    },
    created: function () {
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
            }
            else if (topic.summary.length > this.maxSummaryLengthInChars) {
                var summary = topic.summary;
                if (summary.indexOf(topic.wikipage) == 0) {
                    summary = summary.substr(topic.wikipage.length);
                }
                if (summary.indexOf(',') == 0) {
                    summary = summary.substr(1);
                }
                //if (summary.length > this.maxSummaryLengthInChars) {
                //    summary = summary.substr(0, this.maxSummaryLengthInChars - 3) + "...";
                //}
                return summary;
            }
            else {
                return topic.summary;
            }
        },
        findTopics: function () {
            //console.log("findTopics");
            if (this.topicInputValue.length >= 3) {
                this.searchFromWikipedia(this.topicInputValue);
            }
            else {
                this.hideMenu();
            }
            //this.$router.push('/Vapaamuurarin_hauta');
        },
        getTopicURL: function(topic) {
            return "/" + topic.wikidata + "?language=" + this.$i18n.locale;
        },
        searchFromWikipedia: function(topicInputValue) {
            //console.log("searchFromWikipedia");

            var url = "https://" + this.$i18n.locale + ".wikipedia.org/w/api.php?action=opensearch&search=" +
                topicInputValue +
                "&limit=20&namespace=0&redirects=resolve"
                "&format=json" +
                "&callback=callback";

            var url = "https://www.wikidata.org/w/api.php?" +
                "action=wbsearchentities" +
                "&search=" + encodeURIComponent(topicInputValue) +
                "&language=" + this.$i18n.locale +
                "&uselang=" + this.$i18n.locale +
                "&format=json" +
                "&type=item";
                "&callback=callback";

            var _this = this;
            var topics = [];

            jsonp(url, null, (error, data) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        //console.log(data);

                        if (data.search.length > 0) {

                            var wikidataQueryURL = "https://" + this.$i18n.locale + ".wikipedia.org/w/api.php?" +
                                    "action=query&prop=pageprops&ppprop=wikibase_item&redirects=resolve&titles=";

                            for (var i = 0; i < data.search.length; i++) {
                                var item=data.search[i];
                                var topic = {
                                    wikipage: item["label"],
                                    wikilink: item["id"],
                                    wikidocumentarieslink: "/" +
                                        item["id"] + "/" + item["label"].split(' ').join('_'),
                                    summary: item["description"],
                                    wikidata:item["id"],
                                    wikidatalink: item["url"],
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

                            this.showMenu();
                        }
                        else {
                            // TODO let user know
                        }

                    }
            });

        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.topic-search-box {
    height: 100%;
}

.search-items {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.input-find {
    padding: 10px;
    font-size: 11pt;
    border: none;
    text-align: right;
    right: 35px;
    min-width: 300px;
    height: 100%;
    box-sizing: border-box;
}

.input-find:focus {
    font-weight:bold;
    color:#333;
    outline: none;
}

.input-find:focus::placeholder {
    visibility:hidden;
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
    position: relative;
}


/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    position: absolute;
    right: 0;
    background-color: #fff;
    min-width: 350px;
    max-width: 35vw;
    -webkit-box-shadow: var(--main-shadow);
    -moz-box-shadow: var(--main-shadow);
    box-shadow: var(--main-shadow);
    z-index: 50;
}

.dropdown-content-hide {
    display: none;
}

/* Links inside the dropdown */
.dropdown-content a {
    padding: 5px 10px;
    text-decoration: none;
    display: block;
    text-transform: none;
    font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.3;
    color: #333;
    transition: none;
}

/* Links inside the dropdown */
.dropdown-content a:hover {
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
