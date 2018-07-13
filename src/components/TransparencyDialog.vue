<template>
    <transition name="modal">
        <div class="modal-mask" @click="handleCancel" v-show="shouldShow">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>
                    <div class="modal-header">
                        <h3 class="modal-header-h3">Aseta historiallisen taustakartan läpinäkyvyys</h3>
                    </div>

                    <div class="modal-body">
                         TODO
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
    name: 'TransparencyDialog',
    props: {
        shouldShow: Boolean
    },
    data () {
        return {
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
        selectedBasemapID() {
            return this.$store.state.selectedBasemapID;
        }
    },
    mounted: function () {
    },
    beforeDestroy: function() {
    },
    watch: {
    },
    methods: {
        handleCancel: function () {
            //this.$store.commit('setSelectedBasemap', this.previousBasemapID);
            this.$emit('close');
        },
        handleOK: function () {
            this.$emit('close');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-mask {
  position: fixed;
  z-index: 2;
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
  width: 50%;
  height: 50%;
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

</style>
