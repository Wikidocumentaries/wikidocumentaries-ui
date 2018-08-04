<template>
    <div class="topic-search-box">
        <div class="search-items">
            <input id="findTopicInput" @input="debounceFindTopics" class="input-find" v-model="topicInputValue" type="text" :placeholder="$t('LandingPage.searchInputPlaceHolder')">
            <button @click="findTopics" class="button-find"><i class="wikiglyph wikiglyph-magnifying-glass"></i><span>{{ $t('LandingPage.search') }}</span></button>
        </div>
        <div class="search-results">
            <div :class="[shouldShowMenu ? showClass : hideClass]">
                <a v-for="topic in topics" :key="topic.wikipage" href="#" @click.prevent="showTopic(topic)"><span class="topic-title">{{ topic.wikipage }}</span><br><span class="topic-summary">{{ getSummary(topic) }}</span></a>
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
                if (summary.length > this.maxSummaryLengthInChars) {
                    summary = summary.substr(0, this.maxSummaryLengthInChars - 3) + "...";
                }
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
        showTopic: function (topic) {
            //console.log("showTopic");
            var page = topic.wikipage.split(' ').join('_');
            // this.$router.push({
            //     path: `/wiki/${page}`,
            //     query: {
            //         language: this.$i18n.locale
            //     }
            // });
            window.location.assign("/wiki/" + page + '?language=' + this.$i18n.locale);
            //window.location.reload(true);
        },
        searchFromWikipedia: function(topicInputValue) {
            //console.log("searchFromWikipedia");

            var url = "https://" + this.$i18n.locale + ".wikipedia.org/w/api.php?action=opensearch&search=" +
                topicInputValue +
                "&limit=20&namespace=0&redirects=resolve"
                "&format=json" +
                "&callback=callback";

            var _this = this;
            var topics = [];

            jsonp(url, null, (error, data) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        //console.log(data);

                        if (data.length > 0) {
                            
                            var wikidataQueryURL = "https://" + this.$i18n.locale + ".wikipedia.org/w/api.php?" + 
                                    "action=query&prop=pageprops&ppprop=wikibase_item&redirects=resolve&titles=";
                                    
                            if ( data[1].length > 0) {
                                for (var i = 0; i < data[1].length; i++) {

                                    wikidataQueryURL += data[1][i] + "|";

                                    var topic = {
                                        wikipage: data[1][i],
                                        wikilink: data[3][i],
                                        wikidocumentarieslink: "/" +
                                            data[1][i].split(' ').join('_'),
                                        summary: data[2][i],
                                        wikidata: "",
                                        wikidatalink: "",
                                    }

                                    topics.push(topic);
                                }

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
    
}

.search-items {
    margin: auto;
    display: flex;
    align-items: flex-start;
}

.input-find {
    margin: 0 10px 0 10px;
    padding: 10px;
    border: 2px solid #a74e77;
}

.input-find:focus {
    outline: thick ridge #a74e77;
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
    display:block;
    position: absolute;
    background-color: #f1f1f1;
    width: 325px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 50;
    right: 0;
    left: 0px;
    border: 1px solid black;
    margin: auto;
}

.dropdown-content-hide {
    display: none;
}

/* Links inside the dropdown */
.dropdown-content a {
    padding: 0px 12px 6px 12px;
    text-decoration: none;
    display: block;
    text-transform: none;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 10pt;
    line-height: 1.5;
    color: #333;
    border: 1px solid rgb(173, 173, 173);
}

/* Links inside the dropdown */
.dropdown-content a:hover {
    box-shadow: none;
    outline: none;
    background-color: #cf412d;
    color: white;
}

.topic-title {
    font-weight: bold;
}

.topic-summary {
    font-style: italic;
}

</style>
