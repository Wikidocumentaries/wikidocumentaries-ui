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
                <a class="main-button" v-on:click="goToLandingPage">{{ landingPageName }}</a>
                <TopicSearchBox class="topic-search-box"></TopicSearchBox>
                <UILanguageMenu class="language-menu"></UILanguageMenu>
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
import WaitPage from '@/components/WaitPage'
import TopicSearchBox from '@/components/TopicSearchBox'
import UILanguageMenu from '@/components/menu/UILanguageMenu'

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
        WaitPage,
        UILanguageMenu,
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
    beforeRouteUpdate (to, from, next) {
        //console.log(to);
        // TODO

        var params = {
            topic: to.params.topic,
            wikidata: to.params.wikidata,
            language: (to.query.language != undefined ? to.query.language : 'fi')
        }

        store.dispatch('updateWikidocumentaries', params).then(res => next());
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

.stripe {
    flex: 1 0 100%;
    height: 18px;
    display: flex;
    flex-wrap: nowrap;
}

.main-button {
    font-weight: bold;
    font-size: 16pt;
    color: #333;
    cursor: pointer;
    min-width: 0;
    overflow: hidden;
    flex-shrink: 1;
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
    padding: 0 20px;
}

/*. main-toolbar-buttons {
     flex: 1 1 60%;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 60%;
    -ms-flex-item-align: end;
    margin-left: 25px;
   font-size: 22px;
    font-weight: bold;
} */

.topic-search-box {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.language-bar {
    flex: 1 1 180px;
    margin-left: 20px;
    align-self: flex-end;
    background-color: gray;
}

</style>
