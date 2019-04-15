<template> <!-- to use with a data, each item has to have id, imageURL and title. If the item has infoURL, geoLocations, authors, institutions, license they are used. -->
    <div class="image-grid">
        <div class="grid-items">
            <div class="grid-item" v-for="item in items" :key="item.id" @click="showImageViewer(item)">
                <img :src="item.thumbURL" class="thumb-image" :alt="item.title"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ fitTitle(item.title) }}</div>
                    <div class="thumb-credit">{{ getCredits(item) }}</div>
                </div>
                <div class="thumb-image-header">
                    <div class="left-align">
                        <!-- <ImagesActionMenu v-bind:element="item"></ImagesActionMenu> -->
                        <div v-if="item.geoLocations != undefined && item.geoLocations.length > 0" class="header-item">
                            <a href="#" @click.stop.prevent="showItemGeolocation(item)"><i class="wikiglyph wikiglyph-map-pin thumb-image-glyph"></i></a>
                        </div>
                    </div>
                    <div class="right-align">
                        <div v-if="item.infoURL != undefined" class="header-item">
                            <a href="#" @click.stop.prevent="openItemInfoURL(item.infoURL)"><i class="wikiglyph wikiglyph-new-window thumb-image-glyph"></i></a>
                        </div>
                        <!--ImagesRemoveMenu></ImagesRemoveMenu-->
                    </div>
                </div>
            </div>
        </div>
        <ImageViewer ref="imageviewer"></ImageViewer>
        <!--<button type="button" @click="show">Show</button>-->
    </div>
</template>

<script>

import ImageViewer from '@/components/image_viewer/ImageViewer'
// import ImagesActionMenu from '@/components/menu/ImagesActionMenu'
// import ImagesRemoveMenu from '@/components/menu/ImagesRemoveMenu'

export default {
    name: 'ImageGrid',
    props: {
        items: Array
    },
    data () {
        return {
        }
    },
    components: {
      ImageViewer
        // ImagesActionMenu,
        // ImagesRemoveMenu,
    },
    methods: {
        fitTitle (title) {
            var newTitle = title;
            return newTitle;
        },
        getCredits (item) {
            var newAuthors = (item.authors != "" ? (item.authors + ', ') : '');
            var newYear = (item.year != "" && item.year != null ? (item.year) + ". " : '');
            var newInstitutions = (item.institutions != "" ? (item.institutions + ', ') : '');
            var newLicense = (item.license != "" ? (item.license + ', ') : '');
            var credits = newAuthors + newYear + newInstitutions + newLicense;

            if (credits.length > 0 && credits.slice(-2) == ", ") {
                credits = credits.substr(0, credits.length - 2);
            }

            return credits;
        },
        showItemGeolocation(item) {
            this.$emit('showItemGeolocation', item);
        },
        showImageViewer (item) {
          this.$refs.imageviewer.show(item);
        },
        openItemInfoURL(url) {
            window.open(url, "_blank");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header-item {
    line-height: 1;
    height: 30px;
    width: 30px;
}

.header-item a {
    height: 100%;
    display: flex;
    align-items: center;
    transition: color 80ms ease-in, background 80ms ease-in;
    justify-content: center;
    cursor: pointer;
    box-shadow: none;
    color: white;
}

.header-item:hover {
    background: white;
}

.header-item:hover a {
    color: var(--main-txt-color);
}

.grid-items {
    display: flex;
    flex-wrap: wrap;
    /*grid-template-columns: repeat(auto-fit, minmax(35vh, 1fr));*/
    margin-left: 5px;
}

.grid-item {
    cursor: pointer;
    position: relative;
    max-height: 15em;
    margin: 0 5px 5px 0;
    flex: auto;
    display: flex;
    flex-direction: column;
}

.grid-item:hover * {
    opacity:1;
    transition: opacity 80ms ease-in;
}

.thumb-image {
    max-height: 15em;
    object-fit: cover;
}

</style>
