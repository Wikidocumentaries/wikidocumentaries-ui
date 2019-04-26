<template>
    <transition name="modal">
        <div class="modal-mask" @click="handleCancel" v-show="shouldShowDialog">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>
                    <div class="modal-header">
                        <h3 class="modal-header-h3">{{ $t('topic_page.BaseMapDialog.chooseMapTitle') }}</h3>
                        <p>{{ $t('topic_page.BaseMapDialog.chooseMapHelpNote') }}</p>
                    </div>
                    <div class="modal-body">
                        <div ref="gridItems" transition-duration="0.3s" class="grid-items" item-selector=".grid-item" >
                            <div v-masonry-tile class="grid-item" v-for="item in basemapsSortedByYear" v-bind:key="item.id" @click.exact="mapClicked" @click.ctrl.exact="mapCtrlClicked" :mapID="item.id">
                                <img v-bind:src="item.thumbURL" class="thumb-image" :class="[(itemSelected(item) ? 'thumb-image-selected' : '' )]" v-bind:alt="item.title"/>
                                <div class="thumb-image-header">
                                    <div class="thumb-header-item">
                                        <a v-bind:href="infoURL(item)" target="_blank"><i class="wikiglyph wikiglyph-new-window thumb-image-glyph"></i></a>
                                    </div>
                                    <div class="thumb-header-item">
                                        <div class="thumb-year">{{ (item.year != undefined ? $t('topic_page.BaseMapDialog.yearAbbreviation') + item.year : "") }}</div>
                                    </div>
                                </div>
                                <div class="thumb-image-info">
                                    <div class="thumb-title">{{ fitTitle(item.title) }}</div>
                                    <!-- <div class="thumb-credit">{{ getCredits(item) }}</div> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        <button class="modal-default-button button-ok" @click="handleOK">
                            {{ $t('general.ok') }}
                        </button>
                        <button class="modal-default-button button-cancel" @click="handleCancel">
                            {{ $t('general.cancel') }}
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
        shouldShowDialog: Boolean
    },
    data () {
        return {
            newMaps: [],
            maxTitleLengthInChars: 40
        }
    },
    computed: {
        basemaps () {
            return this.$store.state.basemaps;
        },
        basemapsSortedByYear () {
            var temp = this.$store.state.basemaps.concat([]);
            var temp = temp.sort(function(a, b) {
                return (a.year - b.year);
            });
            //console.log(temp);
            return temp;
        },
        selectedBasemaps() {
            return this.$store.state.selectedBasemaps;
        }
    },
    mounted: function () {
        if (this.selectedBasemaps != undefined && this.selectedBasemaps != null) {
            this.newMaps = this.selectedBasemaps;
        }
        else {
            this.newMaps = [];
        }
    },
    beforeDestroy: function() {
    },
    watch: {
        selectedBasemaps: function(newSelectedMaps, oldSelectedMaps) {
            if (this.newSelectedMaps != undefined && this.newSelectedMaps != null) {
                this.newMaps = this.newSelectedMaps;
            }
            else {
                this.newMaps = [];
            }
        }
    },
    methods: {
        infoURL(item) {
            return item.server + "maps/" + item.warperID;
            //return "https://commons.wikimedia.org/wiki/" + item.id;
        },
        itemSelected (item) {
            for (var i = 0; i < this.newMaps.length; i++) {
                if (item.id == this.newMaps[i].id) {
                    return true;
                }
            }
            return false;
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
            var id = event.currentTarget.getAttribute('mapID');
            for (var i = 0; i < this.basemaps.length; i++) {
                if (this.basemaps[i].id == id) {
                    this.newMaps = [this.basemaps[i]];
                    break;
                }
            }
            //console.log();
        },
        mapCtrlClicked: function(event) {
            var id = event.currentTarget.getAttribute('mapID');
            for (var i = 0; i < this.basemaps.length; i++) {
                if (this.basemaps[i].id == id) {
                    var alreadySelected = false;
                    for (var j = 0; j < this.newMaps.length; j++) {
                        if (this.newMaps[j].id == id) {
                            alreadySelected = true;
                            this.newMaps.splice(j, 1);
                            break;
                        }
                    }
                    if (!alreadySelected) {
                        this.newMaps.push(this.basemaps[i]);
                    }

                    break;
                }
            }
        },
        show () {
            const viewer = this.$el.querySelector('.grid-items').$viewer
            viewer.show()
        },
        handleCancel: function () {
            this.$emit('close');
        },
        handleOK: function () {

            this.$store.commit('setShouldFitMapToBasemap', true);
            this.$store.commit('setSelectedBasemaps', this.newMaps);
            this.$emit('close');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-mask {
  position: fixed;
  z-index: 50;
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
  box-shadow: var(--main-shadow);
  transition: all .3s ease;
  font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.modal-header {
    flex-wrap: wrap;
}

.modal-header-h3 {
    font-size: 1.4em;
    font-weight: bold;
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* height: 200px;
    box-sizing: border-box; */
}

.grid-item {
    flex: 0 1 22%;
    position: relative;
    margin-right: 20px;
}


.thumb-image {
    width: 100%;
    cursor: pointer;
    border: 2px solid #333;
}

.thumb-image-selected {
    border: 6px solid #79c184;
    z-index: 10000;
}

.thumb-image-header {
    position:absolute;
    top: 1px;
    left: 1px;
    width: 100%;
    display: flex; 
}

.thumb-header-item {
    /*letter-spacing: -1px;  */
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 5px 5px 5px;
    line-height: 1;
    flex: 1 1 auto;
}

.thumb-image-glyph {
    color: white;
}

.thumb-year {
    color: white;
    font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
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
    line-height: 1.2em;
}

</style>
