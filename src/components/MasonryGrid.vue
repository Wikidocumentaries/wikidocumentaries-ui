<template>
    <div class="masonry-grid">
        <div ref="gridItems" v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="grid-items">
            <div v-masonry-tile class="grid-item" v-for="item in items" v-bind:key="item.id" :style="{ width: itemWidth + 'px'}">
                <img v-bind:src="item.imageURL" class="thumb-image" v-bind:alt="item.title"/>
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
            maxItemsPerRow: 4,
            maxTitleLengthInChars: 53,
        }
    },
    mounted: function () {
        this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        window.addEventListener('resize', this.handleWindowsResize);
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.handleWindowsResize);
    },
    watch: {
        items: function(items, oldItems) {
            this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
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
            return (item.authors != "" ? (item.authors + ', ') : '') + (item.institutions != "" ? (item.institutions + ', ') : '') + item.license;
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
    background: rgba(0, 0, 0, 0.1);
    padding: 5px 5px;
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
    background: rgba(0, 0, 0, 0.1);
    color: white;
    padding: 10px;
}


</style>
