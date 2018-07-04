<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}*/

body {
	font-family: 'Helvetica Neue', sans-serif;
	font-size: 11pt;
	line-height: 1.5;
	color:#333;
	font-weight: 400;
}

a {
	text-decoration: none;
  color: #0d89d6;
  transition: color 80ms ease-in, box-shadow 130ms ease-in-out, -webkit-box-shadow 130ms ease-in-out;
}

a:hover {
	text-decoration: none;
	color: #333;
	box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0 3px 0 rgba(0, 0, 0, 1);
	outline: 0;
}

.toolbar {
	font-family: 'Barlow Condensed', sans-serif;
    background-color: #8e8e8e;
    color: white;
    padding: 6px 12px;
    text-transform: uppercase;
    font-size: 1.4em;
    font-weight: bold;
}

.neg {
    background-color: #FFF;
    color: #8e8e8e;
    /*border: 1px solid #8e8e8e;*/
}


</style>
