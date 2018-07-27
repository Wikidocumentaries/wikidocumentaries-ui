<template>
    <transition name="modal">
        <div class="modal-mask" @click="handleCancel" v-show="shouldShow">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>
                    <div class="modal-header">
                        <h3 class="modal-header-h3">Aseta historiallisen taustakartan läpinäkyvyys</h3>
                    </div>

                    <div class="modal-body">
                         <div class="slidecontainer">
                            <div class="range-start-label">0</div>
                            <input ref="slider" type="range" min="0" max="100" :value="selectedBasemapTransparency" class="slider" id="myRange" @input="valueChanged">
                            <div class="range-end-label">100</div>
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
    name: 'TransparencyDialog',
    props: {
        shouldShow: Boolean
    },
    data () {
        return {
            previousTransparency: undefined,
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
        selectedBasemapTransparency() {
            return (1 - this.$store.state.selectedBasemapOpacity) * 100;
        }
    },
    mounted: function () {
    },
    beforeDestroy: function() {
    },
    watch: {
        shouldShow: function(value, oldValue) {
            if (value == true) {
                this.previousTransparency = (1 - this.$store.state.selectedBasemapOpacity) * 100;
            }
        }
    },
    methods: {
        valueChanged: function(event) {
            var value = (100 - this.$refs.slider.value) / 100; 
            console.log(value);
            this.$store.commit('setSelectedBasemapOpacity', value);
        },
        handleCancel: function () {
            var value = (100 - this.previousTransparency) / 100; 
            console.log(value);
            this.$store.commit('setSelectedBasemapOpacity', value);
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
  /* background-color: rgba(0, 0, 0, .5); */
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
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


.slidecontainer {
    width: 100%; /* Width of the outside container */
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.range-start-label, .range-end-label {
    flex: 1 1 10%;
    padding: 5px;
}

.range-start-label {
    text-align: right;
}

.range-end-label {
    text-align: left;
}

/* The slider itself */
.slider {
    flex: 9 0 90%;
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */ 
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #79c184; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #79c184; /* Green background */
    cursor: pointer; /* Cursor on hover */
}


</style>
