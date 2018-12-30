<template>
  <div id="app" :key="$route.fullPath">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

:root {
  --main-txt-color: #333;
  --main-link-color: #00b0dc;
  --main-modal-color: #dadada;
  --main-yellow: #ffd76e;
  --main-orange: #ea8e43;
  --main-red: #cf412d;
  --main-purple: #a74e77;
  --main-blue: #008aad;
  --main-green: #69a656;
}

html, body {
  margin: 0px;
  padding: 0px;
  /*overflow-x: hidden;*/
}

#app {
  /* width: calc(100% - 5px); */
}

body {
	font-family: 'Helvetica Neue', sans-serif;
	font-size: 11pt;
	line-height: 1.5;
	color:#333;
	font-weight: 400;
}

h1, h2 {
  font-weight: normal;
}

a {
	text-decoration: none;
  color: var(--main-link-color);
  transition: color 80ms ease-in, box-shadow 130ms ease-in-out, -webkit-box-shadow 130ms ease-in-out;
}

a:hover {
	text-decoration: none;
	color: #333;
	box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0 3px 0 rgba(0, 0, 0, 1);
	outline: 0;
}

.button-ok, .button-cancel {
    border: none;
    cursor: pointer;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

.button-ok {
    background-color: #79c184;
    color: black;
}
  
.button-cancel {
    color: #8e8e8e;
    background-color: white;
    border: 1px solid #8e8e8e;
}

 .toolbar {
  display: flex;
  font-family: 'Barlow Condensed', sans-serif;
  color: #333;
  margin: 0 20px;
  text-transform: uppercase;
  font-size: 1.4em;
  font-weight: bold;
  height: 60px;
  align-items: center;
 }

.toolbar-title {
  flex-grow: 90;

}

.toolbar-item-a {
  color: #333;
}

.toolbar-item-a:hover {
    box-shadow: none;
    outline: none;
}

.toolbar-link {
  flex-grow: 10;
  text-align: right;
}

.header {
  display: flex;
}

.header-title {
  flex-grow: 90;

}
.header-link {
  flex-grow: 10;
  text-align: right;
}


.yellow {
    background: var(--main-yellow);
    flex: 1 1 16.67%;
}

.orange {
    background: var(--main-orange);
    flex: 1 1 16.67%;
}

.red {
    background: var(--main-red);
    flex: 1 1 16.67%;
}

.purple {
    background: var(--main-purple);
    flex: 1 1 16.67%;
}

.turquoise {
    background: var(--main-blue);
    flex: 1 1 16.67%;
}

.green {
    background: var(--main-green);
    flex: 1 1 16.67%;
}

.turquoisebar {
  height: 10px;
  background-color: var(--main-blue);
}

.redbar {
  height: 10px;
  background-color: var(--main-red);
}

.greenbar {
  height: 10px;
  background-color: var(--main-green);
}


.neg {
    background-color: #FFF;
    color: #333;
}

.text {
	padding-left:20px;
}

.text p {
	margin: 12px 0;
}

i.wikiglyph {
    font-size: 24px;
}
</style>
