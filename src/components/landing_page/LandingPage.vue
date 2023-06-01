<template>
  <div class="landing-page">
    <MainToolBar></MainToolBar>
    <LoginButton></LoginButton>

    <div class="cover">
      <!-- <img v-bind:src="photoOfTheDay" class="cover-image"> -->
      <!-- https://upload.wikimedia.org/wikipedia/commons/a/ad/Kulutusosuuskuntien_Keskusliiton_kokoelma_D1974_11333A_%2830804608561%29.jpg -->
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/GALIMANTAPA.jpg/2560px-GALIMANTAPA.jpg"
        class="cover-image"
      >
      <div class="bottomshade">
        <div class="titlebox">
          <div class="title cover-title">Wikidocumentaries</div>
          <div class="subtitle cover-subtitle">{{ $t('LandingPage.intro') }}</div>
        </div>
      </div>
    </div>
    <div class="intro" style="padding-top:10px;">
      Photo: <a href="https://commons.wikimedia.org/wiki/File:GALIMANTAPA.jpg">Rock cut Temples, Chitradurga - tempel in Chitradurga, India</a> by Basavarajmin21, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed">CC BY-SA 4.0</a>. The image is the winner of the Wiki Loves Monuments India 2021 contest. Read more about the <a :href="'/Q97440924?language=' + this.$i18n.locale">Temple in Chitradurga.</a>
    </div>
    <div class="site-info">
      <div class="subtitle">{{ $t('LandingPage.titleDescription') }}</div>
      <div class="description">{{ $t('LandingPage.description') }}</div>
      <div class="subtitle topic">{{ $t('LandingPage.titleStatus') }}</div>
      <div class="status">{{ $t('LandingPage.status') }}</div>
      <div class="info-cubes">
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleTopics') }}</div>
          <div class="status">{{ $t('LandingPage.statusTopics') }}</div>
          <ul>
            <li>
              <a href="https://www.wikidata.org/">Wikidata</a>
            </li>
          </ul>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleMedia') }}</div>
          <div class="status">{{ $t('LandingPage.statusMedia') }}</div>
          <ul>
            <li>
              <a href="https://finna.fi/">Finna</a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/">Wikimedia Commons</a>
            </li>
            <li>
              <a href="https://www.flickr.com/">Flickr</a>
            </li>
            <li>
              <a href="https://ccsearch.creativecommons.org/">Creative Commons Search</a>
            </li>
            <li>
              <a href="https://www.europeana.eu">Europeana</a>
            </li>
          </ul>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleTools') }}</div>
          <div class="status">{{ $t('LandingPage.statusTools') }}</div>
          <ul>
            <li>
              <a href="https://www.mediawiki.org/wiki/Content_translation">Content Translation</a>
            </li>
            </ul>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleLanguages') }}</div>
          <div class="status">{{ $t('LandingPage.statusLanguages') }}</div>
          <ul>
            <li>
              <a href="https://translatewiki.net/wiki/Translating:Wikidocumentaries">Wikidocumentaries in TranslateWiki</a>
            </li>
            </ul>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleTechnology') }}</div>
          <div class="status">{{ $t('LandingPage.statusTechnology') }}</div>
          <ul>
            <li>
              <a href="http://wikiba.se/">Wikibase</a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/Commons:Structured_data">Structured Data on Wikimedia Commons</a>
            </li>
            </ul>
        </div>
      </div>
    </div>
    <div class="site-info grey">
      <div class="subtitle">{{ $t('LandingPage.getInvolved') }}</div>
      <div class="info-cubes">
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleTranslate') }}</div>
          <div class="status">
            {{ $t('LandingPage.joinTranslate') }}
            <a
              href="https://translatewiki.net/wiki/Translating:Wikidocumentaries"
              target="_blank"
            >TranslateWiki: Wikidocumentaries</a>
          </div>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleContent') }}</div>
          <div class="status">{{ $t('LandingPage.joinContent') }}</div>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleDevelop') }}</div>
          <div class="status">{{ $t('LandingPage.joinDevelop') }}</div>
        </div>
      </div>
    </div>
    <div class="site-info">
      <div class="subtitle">{{ $t('LandingPage.titleCreators') }}</div>
      <div class="info-cubes">
        <div class="info-cube">
          <div class="subtitle subfirst">{{ $t('LandingPage.titleTeam') }}</div>
          <div class="status">Erno Mäkinen, Tuukka Hastrup, Mikko Rinne, Susanna Ånäs</div>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleThanks') }}</div>
          <div
            class="status"
          >Bodhisattwa Mandal, Bert Spaan, Arun Ganesh, Albin Larsson, Niklas Laxström, Eetu Mäkelä, Vahur Puik, Kimmo Virtanen, Piia Naukkarinen, Mari Viita-aho, Nuutti Kanerva, Jari Sorjonen</div>
        </div>
      </div>
      <div class="subtitle sub">{{ $t('LandingPage.titlePartners') }}</div>
      <div
        class="status"
      >West Bengal Wikimedians User Group, Finna, Ajapaik, Albumit Auki!, ALM Uppsala University, Association of Cultural Heritage Education in Finland, Candidate program in history Helsinki University, Creative Commons Finland, Cultural Production and Landscape Studies University of Turku, Department of Archaeology University of Turku, Digitalia, Finnish Local Heritage Federation, Gallen-Kallela Museum, Genealogical Society of Finland, HELDIG Helsinki University, ICARUS, Institute for the Languages of Finland, Kansalaismuisti, Language Bank of Finland / FIN_CLARIN, Lokalhistoriewiki.no, Lusto - The Finnish Forest Museum, Master program on Cultural Heritage Helsinki University, Nagu Hembygdsförening r.f., National Archives of Finland, National Land Survey of Finland, Pori Art Museum, Rauma Museum, Savonlinna Provincial Museum, Semantic Computing Research Group, South-Eastern Finland University of Applied Sciences XAMK, Tilaushistoriakeskus, Wikimedia Finland, Yle Archives, Åbo Akademi University</div>
      <div class="info-cubes">
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleBy') }}</div>
          <div class="logogrid">
            <img
              class="logo"
              src="https://wikidocumentaries.wmcloud.org/w/images/f/f2/OK_LG_LOGO_FINLAND_RGB.png"
            >
          </div>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleFunding') }}</div>
          <div class="logogrid">
            <img
              class="logo"
              src="https://wikidocumentaries.wmcloud.org/w/images/5/5b/Kone_logo.jpeg"
            >
            <img
              class="logo"
              src="https://wikidocumentaries.wmcloud.org/w/images/a/a4/EYCH2018_Logos_Yellow-EN-300.png"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="site-info grey">
      <div class="subtitle">{{ $t('LandingPage.titleContact') }}</div>
      <div class="info-cubes">
        <div class="info-cube">
          <div class="status">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/groups/wikidocumentaries/"
                  target="_blank"
                >{{ $t('LandingPage.facebook') }}</a>
              </li>
              <li>
                <a
                  href="https://wikidocumentaries.wmcloud.org"
                  target="_blank"
                >{{ $t('LandingPage.wiki') }}</a>
              </li>
              <li>
                <a
                  href="http://blog.wikidocumentaries.io/en/"
                  target="_blank"
                >{{ $t('LandingPage.blog') }}</a>
              </li>
              <li>
                <a
                  href="mailto:wikidocumentaries@gmail.com"
                  target="_blank"
                >{{ $t('LandingPage.email') }}</a>
              </li>
              <li>
                <a
                  href="https://translatewiki.net/wiki/Translating:Wikidocumentaries"
                  target="_blank"
                >{{ $t('LandingPage.titleTranslate') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'
import TopicSearchBox from "@/components/TopicSearchBox";
import MainToolBar from "@/components/menu/MainToolbar";
import LoginButton from "@/components/authentication/Login";


export default {
  name: "LandingPage",
  props: {},
  data: function() {
    return {
      // map: null,
    };
  },
  computed: {
    //     wikidocumentaries () {
    //         return this.$store.state.wikidocumentaries;
    //     },
    //     selectedBasemaps() {
    //         return this.$store.state.selectedBasemaps;
    //     },
    photoOfTheDay() {
      return this.$store.state.photoOfTheDay;
    }
    //     mapOfTheDay () {
    //         return this.$store.state.mapOfTheDay;
    //     },
  },
  components: {
    TopicSearchBox,
    // WikimapsWarperLayer,
    MainToolBar,
    LoginButton,
},
  mounted: function() {
    this.$store.commit("resetState");
    // this.$store.commit('setSelectedBasemap', this.mapOfTheDay);

    // this.createMap();
  }
  // methods: {
  //     createMap() {
  //         var ol = this.$ol;

  //         this.map = new ol.Map({
  //             target: 'map',
  //             layers: [
  //                 new ol.layer.Tile({
  //                     source: new this.$ol.source.OSM()
  //                 })
  //             ],
  //             view: new ol.View({
  //                 center: ol.proj.fromLonLat(this.mapOfTheDay.coordinates),
  //                 zoom: 15
  //             })
  //         });
  //     },
  // }
};
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
  height: calc(100vh - 63px);
  position: relative;
}

.cover-image {
  width: 100%;
  height: calc(100vh - 63px);
  object-fit: cover;
}

.cover-title {
  text-align: center;
  font-size: 10vw;
}

.site-info {
  padding: 20px;
}

.topic {
  padding-top: 0.5em;
}

@media all and (max-width: 600px) {
  .cover-subtitle {
    font-size: var(--subsubtitle-font-size);
  }
}

.logogrid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}

.logo {
  max-width: 350px;
  max-height: 150px;
  object-fit: contain;
  padding: 20px 0;
}

.grey {
  background: var(--main-modal-color);
}
</style>
