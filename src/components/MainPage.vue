<template>
    <div class="main-page">
        <div v-if="wikidocumentariesDataState == WIKI.STATES.READY || wikidocumentariesDataState == WIKI.STATES.LOADING_IMAGES_EXTERNAL" class="main-content">
          <div class="main-toolbar">
            <button
                  class='tab-button' v-on:click="goToLandingPage"
                  >{{ landingPageName }}</button>
            <button
                  v-for="tab in tabs"
                  v-bind:key="tab.componentName"
                  v-bind:class="['tab-button', { active:
                  currentTabComponentName === tab.componentName }]"
                  v-on:click="currentTabComponentName = tab.componentName"
                  >{{ $t(tab.name) }}</button>
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
                {
                    name: 'MainPage.mapPlaceMatchPageName',
                    componentName: 'MapPlaceMatchPage'
                },
                { 
                    name: 'MainPage.mapSearchPageName',
                    componentName: 'MapSearchPage'
                }
            ],
            WIKI: WIKI,
            landingPageName: "Wikidocumentaries"
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
        WaitPage
    },
    beforeRouteEnter (to, from, next) {
        //console.log(to);
        // TODO

        var params = {
            topic: to.params.topic,
            language: (to.query.language != undefined ? to.query.language : 'fi')
        }

        store.dispatch('updateWikidocumentaries', params).then(res => next());
    },
    created () {
        console.log(window.location);
        var langParam = null;
        var langParamIndex = window.location.search.indexOf('language');
        if (langParamIndex != -1) {
            langParam = window.location.search.substr(langParamIndex + 9, 2);
        }
        console.log/(langParam);

        var language = (langParam!= null ? langParam : this.$i18n.locale);
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
    border-bottom: 10px solid grey;
    background-color: initial;
    color: #8e8e8e;
}

</style>
