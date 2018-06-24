<template>
  <div class="page">
    <button
        v-for="tab in tabs"
        v-bind:key="tab.componentName"
        v-bind:class="['tab-button', { active:
        currentTabComponentName === tab.componentName }]"
        v-on:click="currentTabComponentName = tab.componentName"
        >{{ tab.name }}</button>
    <component
      v-bind:is="currentTabComponentName"
      class="tab" :wikidocumentaries="wikidocumentaries">
    </component>
  </div>
</template>

<script>
import Home from '@/components/Home'
import Map from '@/components/Map'
export default {
  name: 'page',
  data () {
    return {
        currentTabComponentName: 'Home',
        tabs: [
          {
              name: 'Koti',
              componentName: 'Home'
           },
           { 
              name: 'Etsi karttoja',
              componentName: 'Map'
            }
        ],
        wikidocumentaries: {
          title: 'Vapaamuurarin hauta',
          headerImageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Helsinki_Kaisaniemi_Freemason%27s_grave_1908_I_K_Inha.png',
          wikipedia: {
            html: '<p><strong>Vapaamuurarin hauta</strong> on <a href="https://fi.wikipedia.org/wiki/Helsinki" title="Helsinki">Helsingin</a> <a href="https://fi.wikipedia.org/wiki/Kaisaniemen_puisto" title="Kaisaniemen puisto">Kaisaniemen puistossa</a> sijaitseva yksinäinen nimetön hautakivi, joka on peräisin 1700-luvun lopulta. Hauta sijaitsee nykyisen Kaisaniemen urheilukentän koilliskulman tuntumassa <a href="https://fi.wikipedia.org/wiki/Helsingin_yliopiston_kasvitieteellinen_puutarha" title="Helsingin yliopiston kasvitieteellinen puutarha">Kasvitieteellisen puutarhan</a> ympärysaidan vieressä.</p><p>Hautakivessä ei ole vainajan nimeä vaan salaperäinen kirjoitus: &quot;Lika godt / om verlden vet hvem här hvilar / alt nog / Gud käńer hvad Han gjort / och / Uſlingen välſignar / HANS minne&quot;. (&quot;Yhdentekevää, tietääkö maailma, kuka tässä lepää. Joka tapauksessa Jumala tuntee hänen tekonsa ja kurja siunaa hänen muistoaan.&quot;)<a href="https://fi.wikipedia.org/wiki/Vapaamuurarin_hauta#cite_note-1">[1]</a> Vapaamuurarin hauta on Helsingin vanhin julkinen muistomerkki.</p><p>Haudassa lepää majuri <a href="https://fi.wikipedia.org/wiki/Fredrik_Granatenhjelm" title="Fredrik Granatenhjelm">Fredrik Granatenhjelm</a> (1708–1784), joka oli toivonut saada tulla haudatuksi juuri tälle paikalle, koska siinä hänen oli tapana levätä päiväkävelyllään silloisessa Edbomin puutarhassa. Granatenhjelmin on oletettu kuuluneen <a href="https://fi.wikipedia.org/wiki/Vapaamuurarit" title="Vapaamuurarit">vapaamuurareihin</a> ja osallistuneen järjestön hyväntekeväisyystoimintaan,<a href="https://fi.wikipedia.org/wiki/Vapaamuurarin_hauta#cite_note-2">[2]</a> mutta mahdollisesti hän ei eläessään kuulunut mihinkään seuraan, vaikka kuoltuaan saikin arvostusta monessa. <a href="https://fi.wikipedia.org/wiki/Valhalla-seura" title="Valhalla-seura">Valhalla-seuran</a> jäsenet kantoivat hänen arkkunsa hautaan ja olivat olleet aloitteentekijöinä, että kuningas <a href="https://fi.wikipedia.org/wiki/Kustaa_III" title="Kustaa III">Kustaa III</a> oli Parolan joukkojentarkastuksensa yhteydessä antanut erivapauden haudata Granatenhjelm hautausmaan ulkopuolelle; ja myös Valhalla-seura postuumisti korotti Granatenhjelmin kunniajäsenekseen. Muistomerkin pystytti eversti Lars <a href="https://fi.wikipedia.org/wiki/J%C3%A4gerhorn_af_Storby" title="Jägerhorn af Storby">Jägerhorn af Storby</a>, kun toiveet patsaan pystyttämisestä olivat hiipuneet. Hautaa ympäröi takorautainen aita, jossa on vapaamuurarien ja Granatenhjelmin aselajin, <a href="https://fi.wikipedia.org/wiki/Tykist%C3%B6" title="Tykistö">tykistön</a>, tunnukset.</p>',
            wikipediaURL: 'https://fi.wikipedia.org/wiki/Vapaamuurarin_hauta'
          },
          wikidata: {
            id: 'Q5501061'
          },
          images: [
            {
              title: 'vapaamuurarin hauta Kaisaniemessä',
              source: 'finna',
              sourceID: 'musketti.M012:HK19670603:7117',
              imageURL: 'https://www.finna.fi/Cover/Show?id=musketti.M012%3AHK19670603%3A7117&index=0&size=large',
              geoLocations: ["POLYGON ((24.7828131 60.0999549, 24.8356577 60.130414, 24.8513844 60.2249765, 24.8419098 60.2212043, 24.8347825 60.2585099, 24.8677628 60.2523073, 24.9473908 60.2784652, 24.9731653 60.2643801, 25.0209862 60.2893227, 25.0882105 60.2713417, 25.0823359 60.2496391, 25.1358461 60.2372286, 25.1598757 60.2488133, 25.1425242 60.2697779, 25.2545116 60.2952274, 25.2509121 60.2734979, 25.2273451 60.2611057, 25.240926 60.246305, 25.2014099 60.2181613, 25.2204176 60.1997262, 25.1800446 60.0987408, 25.1693516 59.9434386, 24.9423061 59.922486, 24.7828131 60.0999549))"]
            }
          ],
          geo: {
            location: "POINT(24.944028 60.175556)"
          }
        }
    }
  },
  components: {
    Home,
    Map
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #be3030;
}
.tab {
  /*border: 1px solid #ccc;*/
  padding: 0px;
}
</style>
