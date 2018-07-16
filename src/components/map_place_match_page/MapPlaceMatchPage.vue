<template>
    <div class="map-place-match-page">
        <div class="right-side-content">
            <PlaceMatchMap class="place-match-map"></PlaceMatchMap>
            <div class="greenbar horizonal-divider"></div>
            <PlaceMatchSettings class="place-match-settings"></PlaceMatchSettings>
        </div>
        <div class="vertical-divider"></div>
        <PlaceMatchEditor class="place-match-editor"></PlaceMatchEditor>
    </div>
</template>

<script>
import PlaceMatchMap from '@/components/map_place_match_page/PlaceMatchMap'
import PlaceMatchSettings from '@/components/map_place_match_page/PlaceMatchSettings'
import PlaceMatchEditor from '@/components/map_place_match_page/PlaceMatchEditor'

export default {
    name: 'MapPlaceMatchPage',
    props: {
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
    },
    data () {
        return {
        }
    },
    components: {
        PlaceMatchMap,
        PlaceMatchSettings,
        PlaceMatchEditor
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.map-place-match-page {
    display: flex;
    flex-wrap: nowrap;
}

.vertical-divider {
    width: 1px;
    margin: 0 0;
    background: rgb(0, 0, 0);
}

.right-side-content {
    flex: 1 1 70%;
    display: flex;
    flex-wrap: wrap;
}

.place-match-map {
    flex: 1 1 100%;
}

.horizonal-divider {
    flex: 1 1 100%;
}

.place-match-settings {
    flex: 1 1 100%;
}

.place-match-editor {
    flex: 1 1 30%;
}


</style>
