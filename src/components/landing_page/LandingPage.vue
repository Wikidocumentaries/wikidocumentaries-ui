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
            <div class="search-box">
                <TopicSearchBox></TopicSearchBox>
            </div>
        </div>
        <div class="redbar horizonal-divider"></div>
        <div class="map-area" id="map">
            <WikimapsWarperLayer v-for="basemapInfo in selectedBasemaps" :key="basemapInfo.server + basemapInfo.warperID" ref="warperLayer" :map="map" :basemapInfo="basemapInfo"></WikimapsWarperLayer>
        </div>
    </div>
</template>

<script>

import LanguageBar from '@/components/LanguageBar'
import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'
import TopicSearchBox from '@/components/TopicSearchBox'

export default {
    name: 'LandingPage',
    props: {
    },
    data: function () {
        return {
            map: null,
        }
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        selectedBasemaps() {
            return this.$store.state.selectedBasemaps;
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
        TopicSearchBox,
        WikimapsWarperLayer
    },
    mounted: function () {
        this.$store.commit('resetState');
        this.$store.commit('setSelectedBasemap', this.mapOfTheDay);

        this.createMap();
    },
    methods: {
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
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.3);
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
    justify-content: center;
    flex-wrap: wrap;
}

.search-box {
    display: inline-block;
}

.map-area {
    flex: 1 1 100%;
    position: relative;
}

</style>
