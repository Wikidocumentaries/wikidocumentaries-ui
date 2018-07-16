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

html, body {
  margin: 0px;
  padding: 0px;
  /*overflow-x: hidden;*/
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
  color: #0d89d6;
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
    background-color: #8e8e8e;
    color: white;
    padding: 6px 12px;
    text-transform: uppercase;
    font-size: 1.4em;
    font-weight: bold;
}

.toolbar-title {
  flex-grow: 90;

}

.toolbar-item-a {
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

}
.header-link {
  flex-grow: 10;
  text-align: right;
}

.greenbar {
  height: 10px;
  background-color: #79c184;
}

.neg {
    background-color: #FFF;
    color: #8e8e8e;
    /*border: 1px solid #8e8e8e;*/
}

.text {
	padding:0 12px;
}

.text p {
	margin: 12px 0;
}
i.wikiglyph {
    font-size: 24px;
}
</style>
