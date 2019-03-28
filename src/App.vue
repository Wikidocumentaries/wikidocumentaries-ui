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
  --main-link-color: #00a3cc;
  --main-modal-color: #dadada;
  --main-yellow: #ffd76e;
  --main-orange: #ea8e43;
  --main-red: #ce492a;
  --main-purple: #a74e77;
  --main-blue: #008aad;
  --main-green: #69a656;
  --main-shadow: 2px 2px 8px 0px rgba(0,0,0,0.3);
  --main-font-size: 11pt;
  --main-line-height: 1.5;
  --title-font-size: 3.5em;
  --subtitle-font-size: 1.7em;
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
	font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	font-size: var(--main-font-size);
	line-height: var(--main-line-height);
	color: var(--main-txt-color);
	font-weight: 400;
}

.menu-title, .header-title {
  font-family: 'Barlow Condensed', sans-serif;
  color: var(--main-txt-color);
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
	color: var(--main-txt-color);
	box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0 3px 0 rgba(0, 0, 0, 1);
	outline: 0;
}

.title {
    font-size: var(--title-font-size);
    font-weight: bold;
    line-height: 1em;
    margin-right: 0.2em;
    position: relative;
    /*cursor: pointer;*/
}

.subtitle {
    font-size: var(--subtitle-font-size);
    font-weight: bold;
    line-height: 1.2em;
    margin: 3px 0.2em 0 0;
    position: relative;
    /*cursor: pointer;*/
}

.title::first-letter, .subtitle::first-letter {
  text-transform: capitalize;
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
  color: #333;
  margin-left: 20px;
  height: 45px;
  align-items: center;
}

.toolbar-item {
    height: 100%;
    position: relative;
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

.toolbar-item:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  background-color: black;
  color: white;
  right: 0;
  white-space: nowrap;
  padding: 5px 7px;
  font-size: 0.85rem;
  top: 115%;
  opacity: 0;
  transition: opacity 0.3s;
  transition-delay: 1s;
  width: max-content;
  line-height: 1;
  font-weight: initial;
}

.tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  right: 18px;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
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

.text * ::selection {
  background-color: var(--main-txt-color);
  color: white;
}

i.wikiglyph {
    font-size: 24px;
}

.noprint {
  background-color: white !important;
  color: #333;
  font-size: 95%;
  padding-left: 10px !important;
  margin-bottom: 1em !important;
  border: none !important;
  border-left: 10px solid var(--main-yellow) !important;
}

.thumb-image {
    width: 100%;
}

.thumb-image-header {
    position:absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 0 20px;
    box-sizing: border-box;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
    opacity:0;
    transition: opacity 80ms ease-in;
    align-items: center;
    justify-content: space-between;
}

.thumb-image-info {
    position: absolute;
    bottom: 0;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.35) 0%, rgba(0,0,0,0.25) 50%, rgba(0, 0, 0, 0) 100%);
    color: white;
    padding: 30px 10px 10px 10px;
    width: 100%;
    box-sizing: border-box;
    line-height: 1.2em;
    opacity: 0;
    transition: opacity 80ms ease-in;
}

.thumb-image-info-plain {
    position: absolute;
    bottom: 0;
    color: white;
    padding: 30px 10px 10px 10px;
    width: 100%;
    box-sizing: border-box;
    line-height: 1.2em;
    opacity: 0;
    transition: opacity 80ms ease-in;
}

.thumb-title {
    max-height: 11.6em;
    overflow: hidden;
}

.gallery {
    height: 35vh;
    display: flex;
    padding-left: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.gallery-item {
    height: 100%;
    margin-right: 10px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    background: var(--main-blue);
}

.gallery-item * {
    opacity:1;
    transition: opacity 80ms ease-in;
}

.gallery-item > img {
    height: 100%;
}

.gallery-item:hover .gallery-image {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 0.5;
}
</style>
