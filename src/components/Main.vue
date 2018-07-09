<template>
  <div class="page">
    <div class="main-toolbar">
      <button
          v-for="tab in tabs"
          v-bind:key="tab.componentName"
          v-bind:class="['tab-button', { active:
          currentTabComponentName === tab.componentName }]"
          v-on:click="currentTabComponentName = tab.componentName"
          >{{ tab.name }}</button>
    </div>
    <component
      v-bind:is="currentTabComponentName"
      class="tab">
    </component>
  </div>
</template>

<script>
import Home from '@/components/HomePage'
import Map from '@/components/map_page/MapPage'
export default {
  name: 'page',
  data () {
    return {
        currentTabComponentName: 'Home',
        tabs: [
          {
              name: 'Koti',
              componentName: 'Home'
           },
           { 
              name: 'Etsi karttoja',
              componentName: 'Map'
            }
        ],
    }
  },
  components: {
    Home,
    Map
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-button {
  padding: 6px 12px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  cursor: pointer;
	font-family: 'Barlow Condensed', sans-serif;
  background-color: #8e8e8e;
  color: white;
  text-transform: uppercase;
  font-size: 1.4em;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #a7a7a7a6;
}
.tab-button.active {
  background: #be3030;
}
.tab {
  /*border: 1px solid #ccc;*/
  padding: 0px;
}
.main-toolbar {
  border-bottom: 10px solid grey;
	background-color: initial;
  color: #8e8e8e;
}

</style>
