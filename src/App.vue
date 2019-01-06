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
  --main-red: #ce492a;
  --main-purple: #a74e77;
  --main-blue: #008aad;
  --main-green: #69a656;
}

html, body {
  margin: 0px;
  padding: 0px;
  /*overflow-x: hidden;*/
  height: 100%;
}

#app {
  height:100%;
}

a.external.text {
    padding-left: 0px;
}

body {
	font-family: 'Helvetica Neue', sans-serif;
	font-size: 11pt;
	line-height: 1.5;
	color:#333;
	font-weight: 400;
}

.headline {
  font-family: 'Barlow Condensed', sans-serif;
  color: #333;
  text-transform: uppercase;
}

h1, h2 {
  font-weight: bold;
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

.left-align {
    display: flex;
    height: 100%;
    align-items: center;
}

.right-align {
    display: flex;
    height: 100%;
    align-items: center;
}

/*
.button-ok, .button-cancel {
    border: none;
    cursor: pointer;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
*/

.button-ok, .button-cancel {
  font-weight: bold;
  min-width: 120px;
  margin-left: 10px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  box-sizing: border-box;
}

.button-ok {
  background: var(--main-link-color);
  color: white;
}
  
.button-cancel {
  color: var(--main-blue);
  background: white;
}

.button-cancel:hover {
  border: 1px solid var(--main-blue);
}

 .toolbar {
  display: flex;
  font-family: 'Barlow Condensed', sans-serif;
  color: #333;
  margin-left: 20px;
  height: 45px;
  align-items: center;
}

.toolbar-item {
    height: 100%;
}

.toolbar-item a {
    height: 100%;
    display: flex;
    align-items: center;
    transition: color 80ms ease-in, background 80ms ease-in;
    justify-content: center;
    cursor: pointer;
    width: 45px;
}

.toolbar-item-a {
  color: #333;
}

.toolbar-item:hover {
    background: var(--main-txt-color);
}

.toolbar-item:hover > a {
    color: white;
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
  font-size: 1.5em;
  text-transform: uppercase;
}

.header-link {
  flex-grow: 10;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header-link a {
  color: var(--main-txt-color);
}

.header-link a:hover {
    box-shadow: none;
    outline: none;
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
