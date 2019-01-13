<template>
    <div class="landing-page">
        <MainToolBar></MainToolBar>
        <div class="cover">
            <img v-bind:src="photoOfTheDay" class="cover-image"/>
            <div class="cover-title">Wikidocumentaries</div>
        </div>
    </div>
</template>

<script>

import LanguageBar from '@/components/LanguageBar'
import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'
import TopicSearchBox from '@/components/TopicSearchBox'
import MainToolBar from '@/components/menu/MainToolbar'

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
        WikimapsWarperLayer,
        MainToolBar
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
    flex-direction: column;
    height: 100%;
}

.cover {
    width: 100%;
    height: calc(100% - 63px);
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header-language-bar {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.3);
}

.cover-title {
    position:absolute;
    bottom: 60px;
    width: 100%;
    text-align: center;
    color: white;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 6em;
    font-weight: bold;
}

/*
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
*/
</style>
