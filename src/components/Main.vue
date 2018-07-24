<template>
  <div class="page">
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
              >{{ tab.name }}</button>
      </div>
      <component
          v-bind:is="currentTabComponentName"
          class="tab">
      </component>
    </div>
    <div v-else-if="wikidocumentariesDataState == WIKI.STATES.FAIL_WIKI_EXTERNAL" class="user-notify">
      {{ wikiTopicErrorMessage }}
      <a href="/">{{ returnToHomeMessage }}</a>.
    </div>
    <div v-else class="user-notify">
      {{ waitMessage }}
    </div>
  </div>
</template>

<script>
import store from '@/store/store'
import WIKI from '../store/constants'

import TopicPage from '@/components/topic_page/HomePage'
import MapPlaceMatchPage from '@/components/map_place_match_page/MapPlaceMatchPage'
import MapSearchPage from '@/components/map_search_page/MapSearchPage'

export default {
    name: 'MainPage',
    props: ['topic'],
    data () {
        return {
            currentTabComponentName: 'TopicPage',
            tabs: [
                {
                    name: 'Aiheen yhteenveto',
                    componentName: 'TopicPage'
                },
                {
                    name: 'Yhdistä paikannimitietoja',
                    componentName: 'MapPlaceMatchPage'
                },
                { 
                    name: 'Etsi karttoja',
                    componentName: 'MapSearchPage'
                }
            ],
            WIKI: WIKI,
            waitMessage: "Hetki...",
            wikiTopicErrorMessage: "Aiheesta ei löytynyt Wikipedia-sivua valitulla kielellä tai tapahtui muu odottamaton virhe.",
            returnToHomeMessage: "Palaa etusivulle",
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
        MapSearchPage
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
