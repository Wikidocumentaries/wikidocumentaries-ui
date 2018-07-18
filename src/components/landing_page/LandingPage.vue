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
            <img v-bind:src="PhotoOfTheDay" class="header-image"/>
            <div class="header-contents">
                <div class="title">
                    <h1><span>Wikidocumentaries</span></h1>
                </div>
            </div>
        </div>
        <div class="redbar horizonal-divider"></div>
        <div class="search-area">
            <div class="search-items">
                <input id="findTopicInput" v-model="topicInputValue" type="text" placeholder="Vapaamuurarin hauta...">
                <button @click="findTopic"><i class="wikiglyph wikiglyph-magnifying-glass"></i></button>
            </div>
        </div>
        <div class="redbar horizonal-divider"></div>
        <div class="map-area" id="map">
            <WikimapsWarperLayer v-if="selectedBasemapID != ''" :map="map"></WikimapsWarperLayer>
        </div>
    </div>
</template>

<script>

import jsonp from 'jsonp'
import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'

export default {
  name: 'LandingPage',
  props: {
  },
  computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        selectedBasemapID() {
            return this.$store.state.selectedBasemapID;
        }
  },
  data: function () {
        return {
            topicInputValue: "",
            //topicInputValue: "Vapaamu",
            topics: [],
            PhotoOfTheDay: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Kulutusosuuskuntien_Keskusliiton_kokoelma_D1974_11333A_%2830804608561%29.jpg",
            map: null,
            mapOfTheDay: "File:1900_Plan_af_Helsingfors_stad.tif",
            mapOfTheDayCoordinates: [24.9351, 60.1658]
        }
  },
  components: {
      WikimapsWarperLayer
  },
  mounted: function () {
      this.$store.commit('setSelectedBasemap', this.mapOfTheDay);

      this.createMap();
  },
  methods: {
        findTopic: function (event) {
            //this.topics = this.searchFromWikipedia(this.topicInputValue);
            this.$router.push('/Vapaamuurarin_hauta');
        },
        searchFromWikipedia: function(topicInputValue) {
            var url = "https://fi.wikipedia.org/w/api.php?action=opensearch&search=" +
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
                        console.log(data);

                        if (data.length > 0) {
                            
                            var wikidataQueryURL = "https://fi.wikipedia.org/w/api.php?" + 
                                    "action=query&prop=pageprops&ppprop=wikibase_item&redirects=resolve&titles=";
                                    

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
                            wikidataQueryURL = wikidataQueryURL.slice(0, -1);

                            wikidataQueryURL +=
                                "&format=json" +
                                "&callback=callback2";

                            jsonp(wikidataQueryURL, null, (error, data) => {
                                if (error) {
                                    console.log(error);
                                    reject(error);
                                } else {
                                    //console.log(data);
                                    var pages = Object.values(data.query.pages);
                                    console.log(pages);
                                    for (var i = 0; i < pages.length; i++) {
                                        for (var j = 0; j < topics.length; j++) {
                                            if (topics[j].wikipage == pages[i].title) {
                                                topics[j].wikidata = pages[i].pageprops.wikibase_item;
                                                topics[j].wikidatalink = "https://www.wikidata.org/wiki/" + 
                                              pages[i].pageprops.wikibase_item;
                                              break;
                                            }
                                        }
                                    }
                                }
                            });
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
                    center: ol.proj.fromLonLat(this.mapOfTheDayCoordinates),
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
}
.header-image {
    width: 100%;
    height: 500px; /* Remove for production? */
    object-fit: cover; /* Remove for production? not supported in IE 11 */
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
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
}

.search-items {
    margin: auto;
}

.search-area > input {

}

.search-area > button {

}


.map-area {
    flex: 1 1 100%;
    position: relative;
}

.yellow {
    background: #ffd76e;
    flex: 1 1 16.67%;
}

.orange {
    background: #ea8e43;
    flex: 1 1 16.67%;
}

.red {
    background: #cf412d;
    flex: 1 1 16.67%;
}

.purple {
    background: #a74e77;
    flex: 1 1 16.67%;
}

.turquoise {
    background: #0096a5;
    flex: 1 1 16.67%;
}

.green {
    background: #69a656;
    flex: 1 1 16.67%;
}

</style>
