<template> <!-- to use with a data, each item has to have id, imageURL and title. If the item has infoURL, geoLocations, authors, institutions, license they are used. -->
    <div class="masonry-grid">
        <div ref="gridItems" v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="grid-items">
            <div v-masonry-tile class="grid-item" v-for="item in items" v-bind:key="item.id" :style="{ width: itemWidth + 'px'}">
                <img v-bind:src="item.thumbURL" class="thumb-image" v-bind:alt="item.title"/>
                <div class="thumb-image-header">
                    <div v-if="item.infoURL != undefined" class="header-item">
                        <a v-bind:href="item.infoURL" target="_blank"><i class="wikiglyph wikiglyph-new-window thumb-image-glyph"></i></a>
                    </div>
                    <div v-if="item.geoLocations != undefined && item.geoLocations.length > 0" class="header-item">
                        <a href="#" @click.prevent="showItemGeolocation(item)"><i class="wikiglyph wikiglyph-map-pin thumb-image-glyph"></i></a>
                    </div>
                </div>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ fitTitle(item.title) }}</div>
                    <div class="thumb-credit">{{ getCredits(item) }}</div>
                </div>
            </div>
        </div>
        <!--<button type="button" @click="show">Show</button>-->
    </div>
</template>

<script>

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
    mounted: function () {
        this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        console.log(this.itemWidth);
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
            if (title.length > this.maxTitleLengthInChars) {
                newTitle = title.substr(0, this.maxTitleLengthInChars - 3) + "...";
            }
            return newTitle;
        },
        getCredits (item) {
            var newAuthors = (item.authors != "" ? (item.authors + ', ') : '');
            if (newAuthors.length > this.maxAuthorsLengthInChars) {
                newAuthors = newAuthors.substr(0, this.maxAuthorsLengthInChars - 3) + "..."  + ', ';
            }
            var newInstitutions = (item.institutions != "" ? (item.institutions + ', ') : '');
            if (newInstitutions.length > this.maxInstitutionsLengthInChars) {
                newInstitutions = newInstitutions.substr(0, this.maxInstitutionsLengthInChars - 3) + "..."  + ', ';
            }
            var newLicense = (item.license != "" ? (item.license + ', ') : '');
            if (newLicense.length > this.maxLicenseLengthInChars) {
                newLicense = newLicense.substr(0, this.maxLicenseLengthInChars - 3) + "...";
            }

            var credits = newAuthors + newInstitutions + newLicense;

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

.grid {

}

.header-item {
    /*letter-spacing: -1px;  */
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 2px;
    line-height: 1;
}

.grid-item {
    margin-bottom: -5px;
}

.grid-item--width2 { 
    width: 400px;
}

.thumb-image {
    width: 100%;
    cursor: zoom-in;
}

.thumb-image-header {
    position:absolute;
    display: flex;
    top: 1px;
    left: 1px;
    width: 100%; 
}

.thumb-image-glyph {
    color: white;
}

.thumb-image-info {
    position: absolute;
    bottom: 5px;
    left: 1px;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 2px 10px 2px 10px;
}


</style>
