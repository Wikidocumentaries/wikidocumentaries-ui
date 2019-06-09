<template>
  <div>
    <TocItem class="toc-item" title="Artikkeli" unit="kieliversio" units="kieliversiota" link="#article" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Tiedot" unit="fakta" units="faktaa" link="#facts" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Teoksia" unit="teos" units="teosta" link="#works" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Esittää" unit="aihe" units="aihetta" link="#depicts" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Osia" unit="osa" units="osaa" link="#parts" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Ihmiset" unit="ihminen" units="ihmistä" link="#people" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Organisaatiot" unit="organisaatio" units="organisaatiota" link="#affiliations" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Paikat" unit="paikka" units="paikkaa" link="#locations" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Kartta" unit="sijainti" units="sijaintia" link="#topicMap" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Aikajana" unit="tapahtuma" units="tapahtumaa" link="#topicTimeline" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Kuvattu teoksissa" unit="lähde" units="lähdetta" link="#depicted" @scrollTo="navigate"></TocItem>
    <TocItem class="toc-item" title="Kuvia" unit="kuva" units="kuvaa" link="#images" @scrollTo="navigate"></TocItem>
  </div>
</template>
<script>
import TocItem from "@/components/topic_page/TocItem";
export default {
  name: "Toc",
  components: {
    TocItem
  },
  methods: {
    navigate(link) {
      this.$emit('scrollTo', link);
    }
  }
};
</script>
<style scoped>
</style>