<template>
    <div class="opacity-slider-menu-item">
        <div class="slider-label">{{ $t('menu.TransparencySliderMenuItem.transparencyLabel') }}</div>
        <div class="slidecontainer">
            <div class="range-start-label">0</div>
            <input ref="slider" type="range" min="0" max="100" :value="selectedBasemapTransparency" class="slider" id="myRange" @input="valueChanged">
            <div class="range-end-label">100</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TransparencySliderMenuItem',
    props: {
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
            //console.log(value);
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

.opacity-slider-menu-item {
    padding: 6px 12px;
    text-transform: none;
    font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #333;
    font-weight: bold;
}

.slidecontainer {
    width: 100%; /* Width of the outside container */
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.range-start-label, .range-end-label {
    flex: 1 0 10%;
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
    flex: 9 5 90%;
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
    background: #79c184;
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #79c184;
    cursor: pointer; /* Cursor on hover */
}


</style>