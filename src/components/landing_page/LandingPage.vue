<template>
  <div class="landing-page">
    <MainToolBar></MainToolBar>
    <div class="cover">
      <!-- <img v-bind:src="photoOfTheDay" class="cover-image"> -->
      <!-- https://upload.wikimedia.org/wikipedia/commons/a/ad/Kulutusosuuskuntien_Keskusliiton_kokoelma_D1974_11333A_%2830804608561%29.jpg -->
      <img
        src="https://live.staticflickr.com/1719/26111035175_4240706b19_h.jpg"
        class="cover-image"
      >
      <div class="bottomshade">
        <div class="titlebox">
          <div class="title cover-title">Wikidocumentaries</div>
          <div class="subtitle cover-subtitle">{{ $t('LandingPage.intro') }}</div>
        </div>
      </div>
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
          >Niklas Laxström, Eetu Mäkelä, Vahur Puik, Kimmo Virtanen, Piia Naukkarinen, Mari Viita-aho, Nuutti Kanerva, Jari Sorjonen</div>
        </div>
      </div>
      <div class="subtitle sub">{{ $t('LandingPage.titlePartners') }}</div>
      <div
        class="status"
      >Finna, Gallen-Kallela Museum, Lusto - The Finnish Forest Museum, Savonlinna Provincial Museum, Rauma Museum, Wikimedia Finland, Candidate program in history Helsinki University, Semantic Computing Research Group, Ajapaik, Albumit Auki!, Creative Commons Finland, HELDIG Helsinki University, ICARUS, South-Eastern Finland University of Applied Sciences XAMK, Kansalaismuisti, National Archives of Finland, Digitalia, Language Bank of Finland / FIN_CLARIN, Institute for the Languages of Finland, Finnish Local Heritage Federation, Association of Cultural Heritage Education in Finland, Lokalhistoriewiki.no, National Land Survey of Finland, Nagu Hembygdsförening r.f., Pori Art Museum, Genealogical Society of Finland, Tilaushistoriakeskus, Department of Archaeology University of Turku, Cultural Production and Landscape Studies University of Turku, ALM Uppsala University, Yle Archives, Åbo Akademi University, Master program on Cultural Heritage Helsinki University,</div>
      <div class="info-cubes">
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleBy') }}</div>
          <div class="logogrid">
            <img
              class="logo"
              src="https://wikidocumentaries.wmflabs.org/w/images/f/f2/OK_LG_LOGO_FINLAND_RGB.png"
            >
          </div>
        </div>
        <div class="info-cube">
          <div class="subtitle sub">{{ $t('LandingPage.titleFunding') }}</div>
          <div class="logogrid">
            <img
              class="logo"
              src="https://wikidocumentaries.wmflabs.org/w/images/5/5b/Kone_logo.jpeg"
            >
            <img
              class="logo"
              src="https://wikidocumentaries.wmflabs.org/w/images/a/a4/EYCH2018_Logos_Yellow-EN-300.png"
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
                  href="https://wikidocumentaries.wmflabs.org"
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
    <div class="intro" style="padding-top:10px;">
      Valokuva:
      <a
        href="https://www.flickr.com/photos/valokuvataiteenmuseo/26111035175/in/album-72157666254464720/"
        target="_blank"
      >Talvikylä. Vastasyntyneet karitsat pidetään tuvassa.</a> Kuvassa O'nddri Gauriloff ja hänen tyttärensä Maria. Eino Mäkinen, 1930-luku. Suenjel (Suonikylä), Petsamo. Hopeagelatiinivedos. Suomen valokuvataiteen museo. Ei tunnettuja tekijänoikeusrajoitteita.
    </div>
    <div class="intro" style="padding-bottom:10px;">
      Photo:
      <a
        href="https://www.flickr.com/photos/valokuvataiteenmuseo/26111035175/in/album-72157666254464720/"
        target="_blank"
      >Winter Village. Newborn lambs are kept indoors.</a> Depicting O'nddri Gauriloff and his daughter Maria. Eino Mäkinen, 1930's. Suenjel (Suonikylä), Petsamo. Silver gelatin print. The Finnish Museum of Photography. No known copyright restrictions.
    </div>
  </div>
</template>

<script>
// import WikimapsWarperLayer from '@/openlayersplugin/WikimapsWarperLayer'
import TopicSearchBox from "@/components/TopicSearchBox";
import MainToolBar from "@/components/menu/MainToolbar";

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
    MainToolBar
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
}

.cover-image {
  width: 100%;
  height: 100%;
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
