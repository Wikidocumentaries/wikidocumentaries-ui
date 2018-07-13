<template>
    <transition name="modal">
        <div class="modal-mask" @click="handleCancel" v-show="shouldShow">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>
                    <div class="modal-header">
                        <h3 class="modal-header-h3">Valitse historiallinen taustakartta</h3>
                    </div>

                    <div class="modal-body">
                        <div ref="gridItems" v-masonry transition-duration="0.3s" class="grid-items">
                            <div v-masonry-tile class="grid-item" v-for="item in basemaps" v-bind:key="item.id" :style="{ width: itemWidth + 'px'}">
                                <img v-bind:src="item.imageURL" class="thumb-image" :class="[(item.id == newMapID ? 'thumb-image-selected' : '' )]" v-bind:alt="item.title" :mapID="item.id" @click="mapClicked" />
                                <div class="thumb-image-header">
                                    <div class="header-item">
                                        <a v-bind:href="infoURL(item)" target="_blank"><i class="wikiglyph wikiglyph-new-window thumb-image-glyph"></i></a>
                                    </div>
                                    <div class="header-item">
                                        <div class="thumb-year">{{ (item.year != undefined ? "v." + item.year : "") }}</div>
                                    </div>
                                </div>
                                <!-- <div class="thumb-image-info">
                                    <div class="thumb-title">{{ fitTitle(item.title) }}</div>
                                    <div class="thumb-credit">{{ getCredits(item) }}</div>
                                </div> -->
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        <button class="modal-default-button button-ok" @click="handleOK">
                            OK
                        </button>
                        <button class="modal-default-button button-cancel" @click="handleCancel">
                            Peruuta
                        </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BaseMapDialog',
    props: {
        shouldShow: Boolean
    },
    data () {
        return {
            itemWidth: 50,
            maxItemsPerRow: 8,
            previousBasemapID: "",
            newMapID: "",
        }
    },
    computed: {
        basemaps () {
            return this.$store.state.basemaps;
        },
        selectedBasemapID() {
            return this.$store.state.selectedBasemapID;
        }
    },
    mounted: function () {
        this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        window.addEventListener('resize', this.handleWindowsResize);
        this.newMapID = this.selectedBasemapID;
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.handleWindowsResize);
    },
    watch: {
        basemaps: function(items, oldItems) {
            //console.log(items);
            this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        },
        shouldShow: function(value, oldValue) {
            if (value == true) {
                this.previousBasemapID = this.$store.state.selectedBasemapID;
                this.$nextTick(function () {
                    this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
                    this.$nextTick(function () {
                        this.$redrawVueMasonry();
                    });
                });
            }
        }
    },
    methods: {
        handleWindowsResize (event) {
            this.itemWidth = this.$refs.gridItems.clientWidth / this.maxItemsPerRow;
        },
        infoURL(item) {
            return "https://commons.wikimedia.org/wiki/" + item.id;
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
                newLicense = newLicense.substr(0, this.maxLicenseLengthInChars - 3) + "..."  + ', ';
            }

            return newAuthors + newInstitutions + item.license;
        },
        mapClicked: function(event) {
            this.newMapID = event.currentTarget.getAttribute('mapID');
            console.log();
        },
        handleCancel: function () {
            //this.$store.commit('setSelectedBasemap', this.previousBasemapID);
            this.$emit('close');
        },
        handleOK: function () {

            if (this.newMapID != this.$store.state.selectedBasemapID) {
                this.$store.commit('setSelectedBasemap', this.newMapID);
            }
            // else {
            //     this.$store.commit('setSelectedBasemap', this.previousBasemapID);
            // }
            this.$emit('close');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  height: 90%;
  margin: 0px auto;
  padding: 0px 30px 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.modal-header {
  	font-family: 'Barlow Condensed', sans-serif;
    color: #8e8e8e;
    padding: 6px 12px;
    text-transform: uppercase;
    font-size: 1.4em;
    font-weight: bold;
    flex-wrap: wrap;
}

.modal-header-h3 {
    margin-bottom: 0px;
}

.modal-body {
  margin: 20px 0;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
}

.modal-default-button {
  float: right;
  margin-left: 10px;
}

.modal-footer {
    padding-bottom: 30px;
    flex-wrap: wrap;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.grid-items {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
}

.grid-item {
    margin-bottom: -5px;
}

.grid-item--width2 { 
    width: 100px;
}

.header-item {
    /*letter-spacing: -1px;  */
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.2);
    padding: 5px 5px;
    line-height: 1;
}


.thumb-image {
    width: 100%;
    cursor: pointer;
    border: 6px solid #353535;
}

.thumb-image-selected {
    border: 6px solid #79c184;
    z-index: 10000;
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

.thumb-year {
    color: white;
    font-family: 'Helvetica Neue', sans-serif;
    padding-top: 5px;
}

.thumb-image-info {
    position: absolute;
    bottom: 5px;
    left: 1px;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 10px;
}

</style>
