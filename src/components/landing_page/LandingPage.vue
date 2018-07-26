<template>
    <div class="landing-page">
        <div class="main-toolbar">
            <div class="yellow"></div>
            <div class="orange"></div>
            <div class="red"></div>
            <div class="purple"></div>
            <div class="turquoise"></div>
            <div class="green"></div>
        </div>
        <div class="header">
            <img v-bind:src="photoOfTheDay" class="header-image"/>
            <div class="header-contents">
                <LanguageBar class="header-language-bar"></LanguageBar>
                <div class="title">
                    <h1><span>Wikidocumentaries</span></h1>
                </div>
            </div>
        </div>
        <div class="redbar horizonal-divider"></div>
        <div class="search-area">
            <div class="search-items">
                <input id="findTopicInput" @input="debounceFindTopics" class="input-find" v-model="topicInputValue" type="text" :placeholder="$t('LandingPage.searchInputPlaceHolder')">
                <button @click="findTopics" class="button-find"><i class="wikiglyph wikiglyph-magnifying-glass"></i><span>{{ $t('LandingPage.search') }}</span></button>
            </div>
            <div :class="[shouldShowMenu ? showClass : hideClass]">
                <a v-for="topic in topics" :key="topic.wikipage" href="#" @click.prevent="showTopic(topic)"><span class="topic-title">{{ topic.wikipage }}</span><br><span class="topic-summary">{{ getSummary(topic) }}</span></a>
            </div>
        </div>
        <div class="redbar horizonal-divider"></div>
        <div class="map-area" id="map">
            <WikimapsWarperLayer v-if="selectedBasemap != null" :map="map"></WikimapsWarperLayer>
        </div>
    </div>
</template>

<script>
import debounce from 'debounce'
import jsonp from 'jsonp'

import LanguageBar from '@/components/landing_page/LanguageBar'
import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'


export default {
    name: 'LandingPage',
    props: {
    },
    data: function () {
        return {
            topicInputValue: "",
            shouldShowMenu: false,
            showClass: 'dropdown-content',
            hideClass: 'dropdown-content-hide',
            //topicInputValue: "Vapaamu",
            topics: [],
            maxSummaryLengthInChars: 50,
            map: null,
        }
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        selectedBasemap() {
            return this.$store.state.selectedBasemap;
        },
        photoOfTheDay () {
            return this.$store.state.photoOfTheDay;
        },
        mapOfTheDay () {
            return this.$store.state.mapOfTheDay;
        },
    },
    components: {
        LanguageBar,
        WikimapsWarperLayer
    },
    created: function () {
        this.debounceFindTopics = debounce(this.findTopics, 500);
    },
    mounted: function () {
        this.$store.commit('resetState');
        this.$store.commit('setSelectedBasemap', this.mapOfTheDay);

        this.createMap();
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
            this.$router.push({
                path: `/wiki/${page}`,
                query: {
                    language: this.$i18n.locale
                }
            });
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
        createMap() {
            var ol = this.$ol;

            this.map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new this.$ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat(this.mapOfTheDay.coordinates),
                    zoom: 15
                })
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.landing-page {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.main-toolbar {
    flex: 1 0 100%;
    height: 20px;
    display: flex;
    flex-wrap: nowrap;
}

.header {
    position:relative;
    width: 100%;
}
.header-image {
    width: 100%;
    height: 500px; /* Remove for production? */
    object-fit: cover; /* Remove for production? not supported in IE 11 */
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.header-language-bar {
    position: absolute;
    top: 10px;
    right: 10px;
}

.title {
    position:absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    text-align: center;
    width: 100%; 
    color: white;
    font-family: 'Helvetica Neue',  sans-serif;
    font-size: 32pt;

}

.title > h1 > span {
    font-weight: bold;
}

.horizonal-divider {
    flex: 1 1 100%;
    height: 20px;
}

.search-area {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
}

.search-items {
    margin: auto;
    display: flex;
    align-items: center;
}

.input-find {
    margin: 10px;
    padding: 10px;
    border: 2px solid #a74e77;
}

.input-find:focus {
    outline: thick ridge #a74e77;
}

.button-find {
    border: none;
    cursor: pointer;
    margin: auto;
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

.map-area {
    flex: 1 1 100%;
    position: relative;
}

.results-container {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display:block;
    position: absolute;
    background-color: #f1f1f1;
    top: 68px;
    max-width: 36%;
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
