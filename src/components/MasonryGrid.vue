<template> <!-- to use with a data, each item has to have id, imageURL and title. If the item has infoURL, geoLocations, authors, institutions, license they are used. -->
    <div class="masonry-grid">
        <div ref="gridItems" v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="grid-items">
            <div v-masonry-tile class="grid-item" v-for="item in items" :key="item.id" :style="{ width: itemWidth + 'px'}">
                <img :src="item.thumbURL" class="thumb-image" :alt="item.title"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ fitTitle(item.title) }}</div>
                    <div class="thumb-credit">{{ getCredits(item) }}</div>
                </div>
                <div class="thumb-image-header">
                    <div class="left-align">
                        <ImagesActionMenu></ImagesActionMenu>
                        <div v-if="item.geoLocations != undefined && item.geoLocations.length > 0" class="header-item">
                            <a href="#" @click.prevent="showItemGeolocation(item)"><i class="wikiglyph wikiglyph-map-pin thumb-image-glyph"></i></a>
                        </div>
                    </div>
                    <div class="right-align">
                        <div v-if="item.infoURL != undefined" class="header-item">
                            <a :href="item.infoURL" target="_blank"><i class="wikiglyph wikiglyph-new-window thumb-image-glyph"></i></a>
                        </div>
                        <!--ImagesRemoveMenu></ImagesRemoveMenu-->
                    </div>
                </div>
            </div>
        </div>
        <!--<button type="button" @click="show">Show</button>-->
    </div>
</template>

<script>

import ImagesActionMenu from '@/components/menu/ImagesActionMenu'
import ImagesRemoveMenu from '@/components/menu/ImagesRemoveMenu'

export default {
    name: 'MasonryGrid',
    props: {
        items: Array
    },
    data () {
        return {
            itemWidth: 200,
            maxItemsPerRow: 3,
            maxTitleLengthInChars: 43,
            maxAuthorsLengthInChars: 20,
            maxInstitutionsLengthInChars: 30,
            maxLicenseLengthInChars: 20,
        }
    },
    components: {
        ImagesActionMenu,
        ImagesRemoveMenu,
    },
    mounted: function () {
        this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        //console.log(this.itemWidth);
        window.addEventListener('resize', this.handleWindowsResize);
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.handleWindowsResize);
    },
    watch: {
        items: function(items, oldItems) {
            //console.log(items);
            this.$nextTick(function () {
                this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
            });
        }
    },
    methods: {
        handleWindowsResize (event) {
            this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        },
        fitTitle (title) {
            var newTitle = title;
            return newTitle;
        },
        getCredits (item) {
            var newAuthors = (item.authors != "" ? (item.authors + ', ') : '');
            var newYear = (item.year != "" ? (item.year) + ". " : '');
            var newInstitutions = (item.institutions != "" ? (item.institutions + ', ') : '');
            var newLicense = (item.license != "" ? (item.license + ', ') : '');

            var credits = newAuthors + newYear + newInstitutions + newLicense;

            if (credits.length > 0 && credits.slice(-2) == ", ") {
                credits = credits.substr(0, credits.length - 2);
            }

            return credits;
        },
        show () {
            const viewer = this.$el.querySelector('.grid-items').$viewer
            viewer.show()
        },
        showItemGeolocation(item) {
            this.$emit('showItemGeolocation', item);
        },
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

.grid-item {
    cursor: pointer;
}

.grid-item:hover * {
    opacity:1;
    transition: opacity 80ms ease-in;
}

.grid-item--width2 { 
    width: 400px;
}


</style>
