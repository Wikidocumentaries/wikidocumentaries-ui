<template>
     <div class="main-page">
         <div v-if="wikidocumentariesDataState == WIKI.STATES.READY || wikidocumentariesDataState == WIKI.STATES.LOADING_IMAGES_EXTERNAL" class="main-content">
            <div class="stripe">
                <div class="yellow"></div>
                <div class="orange"></div>
                <div class="red"></div>
                <div class="purple"></div>
                <div class="turquoise"></div>
                <div class="green"></div>
            </div>
             <div id="main-toolbar" class="main-toolbar">
                <div class="left-align">
                    <a class="main-button" v-on:click="goToLandingPage">{{ landingPageName }}</a>
                </div>
                <div class="right-align toolbar">
                    <TopicSearchBox class="topic-search-box"></TopicSearchBox>
                    <LanguageMenu class="language-menu"></LanguageMenu>
                </div>
            </div>
          <component
              v-bind:is="currentTabComponentName"
              class="tab">
          </component>
        </div>
        <div v-else-if="wikidocumentariesDataState == WIKI.STATES.FAIL_WIKI_EXTERNAL" class="user-notify">
            {{ $t('MainPage.wikiTopicErrorMessage') }}
            <a href="/">{{ $t('MainPage.returnToHomeMessage') }}</a>.
        </div>
        <div v-else class="user-notify">
            <WaitPage></WaitPage>
        </div>
    </div>
</template>

<script>
import store from '@/store/store'
import WIKI from '../store/constants'

import TopicPage from '@/components/topic_page/HomePage'
import MapPlaceMatchPage from '@/components/map_place_match_page/MapPlaceMatchPage'
import MapSearchPage from '@/components/map_search_page/MapSearchPage'
import WaitPage from '@/components/WaitPage'
import TopicSearchBox from '@/components/TopicSearchBox'
import LanguageMenu from '@/components/LanguageMenu'

export default {
    name: 'MainPage',
    props: ['topic'],
    data () {
        return {
            currentTabComponentName: 'TopicPage',
            tabs: [
                {
                    name: 'MainPage.topicPageName',
                    componentName: 'TopicPage'
                },
                // {
                //     name: 'MainPage.mapPlaceMatchPageName',
                //     componentName: 'MapPlaceMatchPage'
                // },
                // { 
                //     name: 'MainPage.mapSearchPageName',
                //     componentName: 'MapSearchPage'
                // }
            ],
            WIKI: WIKI,
            landingPageName: "Wikidocumentaries",
        }
    },
    computed: {
        wikidocumentariesDataState () {
            return this.$store.state.wikidocumentariesDataState;
        },
    },
    components: {
        TopicPage,
        MapPlaceMatchPage,
        MapSearchPage,
        WaitPage,
        LanguageMenu,
        TopicSearchBox
    },
    beforeRouteEnter (to, from, next) {
        //console.log(to);
        // TODO

        var params = {
            topic: to.params.topic,
            wikidata: to.params.wikidata,
            language: (to.query.language != undefined ? to.query.language : 'fi')
        }

        store.dispatch('updateWikidocumentaries', params).then(res => next());
    },
    created () {
        //console.log(window.location);
        var langParam = null;
        var langParamIndex = window.location.search.indexOf('language');
        if (langParamIndex != -1) {
            langParam = window.location.search.substr(langParamIndex + 9, 2);
        }
        //console.log/(langParam);

        var language = (langParam != null ? langParam : this.$i18n.locale);
        this.$i18n.locale = language;
    },
    methods: {
        goToLandingPage(event) {
            this.$router.push('/');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .main-content {
    width: calc(100% - 10px);
} */

.stripe {
    flex: 1 0 100%;
    height: 18px;
    display: flex;
    flex-wrap: nowrap;
}

.main-button {
    font-weight: bold;
    font-size: 16pt;
    margin-left: 20px;
    color: #333;
    cursor: pointer;
}

a.main-button:hover {
    box-shadow: none;
    color: var(--main-red);
}

.tab-button {
    padding: 6px 12px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    background-color: #8e8e8e;
    color: white;
    text-transform: uppercase;
    font-size: 1.4em;
    margin-bottom: -1px;
    margin-right: -1px;
}
.tab-button:hover {
    background: #a7a7a7a6;
}
.tab-button.active {
    background: #be3030;
}
.tab {
    /*border: 1px solid #ccc;*/
    padding: 0px;
}

.main-toolbar {
    display: -ms-flexbox;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-toolbar-buttons {
     flex: 1 1 60%;
    /* align-self: flex-end; */
    -webkit-box-flex: 1;
    -ms-flex: 1 1 60%;
    -ms-flex-item-align: end;
    margin-left: 25px;
   font-size: 22px;
    font-weight: bold;
}

.topic-search-box {
    display: flex;
    flex-direction: column;
}

.language-bar {
    flex: 1 1 180px;
    margin-left: 20px;
    align-self: flex-end;
    background-color: gray;
}

.right-align {
    display: flex;
    height: 100%;
    align-items: center;
}

</style>
