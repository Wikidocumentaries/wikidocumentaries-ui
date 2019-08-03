<template>
  <div id="app" :key="$route.fullPath">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
:root {
  --main-txt-color: #333;
  --main-dimmed: #777;
  --main-dark: #555;
  --main-link-color: #00a3cc;
  --main-modal-color: #ececec;
  --main-yellow: #ffd76e;
  --main-orange: #ea8e43;
  --main-red: #ce492a;
  --main-purple: #a74e77;
  --main-blue: #008aad;
  --main-green: #69a656;
  --main-red-dim: #e6cbc6;
  --main-blue-dim: #c0d9df;
  --main-yellow-dim: #f1e8d3;
  --main-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.3);
  --main-font-size: 11pt;
  --main-line-height: 1.5;
  --title-font-size: 3.5rem;
  --subtitle-font-size: 1.7rem;
  --subsubtitle-font-size: 1.3rem;
}

html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}

#app {
  height: 100%;
}

.main-page {
}

a.external.text {
  padding-left: 0px;
}

body {
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: var(--main-font-size);
  line-height: var(--main-line-height);
  color: var(--main-txt-color);
  font-weight: 400;
}

.menu-title,
.header-title {
  font-family: "Barlow Condensed", sans-serif;
  color: var(--main-txt-color);
  text-transform: uppercase;
}

h1,
h2 {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: var(--main-link-color);
  transition: color 80ms ease-in, box-shadow 130ms ease-in-out,
    -webkit-box-shadow 130ms ease-in-out;
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

.sub {
  font-size: var(--subsubtitle-font-size);
  margin-top: 1em;
}

.title::first-letter,
.subtitle::first-letter {
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
  float: right;
  clear: both;
}

.button-ok,
.button-cancel {
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
  font-size: 0.85em;
  border-color: var(--main-link-color);
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
  padding: 0 20px;
  height: 45px;
  align-items: center;
}

.toolbar-item {
  height: 100%;
  position: relative;
  text-align: left;
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

.neg > a > i {
  color: white;
}

.neg:hover > a > i {
  color: var(--main-txt-color);
}

.toolbar-item:hover {
  background: var(--main-txt-color);
}

.neg:hover {
  background: white;
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
  bottom: 100%; /* At the top of the tooltip */
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

.haze {
  position: absolute;
  bottom: 0px;
  height: 45px;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  vertical-align: middle;
  line-height: 45px;
}

.text {
  padding-left: 20px;
}

.one {
  position: relative;
}

.two {
  background: var(--main-modal-color);
}

.text {
  padding-right: 20px;
}

@media all and (max-width: 979px) {
  .column {
    display: block;
  }

  #wiki {
    display: none;
  }
  .row {
    position: relative;
  }

  .data {
    column-width: 350px;
    column-gap: 20px;
  }

  .text-container {
    max-height: 260px;
  }
}

@media all and (min-width: 980px) {
  .column {
    flex-direction: column;
  }

  .one {
    flex: 1 1 auto;
  }

  .two {
    flex: 0 0 auto;
    width: 380px;
  }

  .row {
    display: flex;
    position: relative;
    flex-direction: row;
    overflow-y: hidden;
    /* padding-bottom: 45px; */
    max-height: 350px;
  }

  #wiki {
    display: unset;
  }

  #wp,
  #wd {
    display: none;
  }

  .text-container {
    max-height: unset;
  }
}

.text-container {
  overflow: hidden;
  padding-bottom: 45px;
}

.dark {
  background: var(--main-modal-color);
}

.expanded {
  max-height: unset;
}

.expanded + .haze,
.expanded > .haze {
  background: unset;
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

.thumb-image-header {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 0 20px;
  box-sizing: border-box;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  opacity: 0;
  transition: opacity 80ms ease-in;
  align-items: center;
  justify-content: space-between;
}

.thumb-image-info {
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.25) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  padding: 30px 10px 10px 10px;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.2em;
  opacity: 0;
  transition: opacity 80ms ease-in;
  max-height: 12rem;
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
  line-height: 1.1rem;
  max-height: 11.6em;
  overflow: hidden;
}

.thumb-credit {
  line-height: 1.1rem;
}

.over {
  padding-bottom: 0.2em;
}

.gallery-title {
  font-family: barlow condensed;
  text-transform: uppercase;
  font-size: 1.2em;
}

.gallery {
  height: 40vh;
  display: flex;
  padding-left: 10px;
  overflow-x: auto;
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
  opacity: 1;
  transition: opacity 80ms ease-in;
}

.gallery-item > img {
  height: 100%;
  max-width: fit-content;
}

.gallery-item:hover .gallery-image {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.5;
}

.gallery-item:hover * {
  transition: opacity 80ms ease-in;
}

.appearing {
  height: 0;
  opacity: 0;
  transition: height 80ms ease-in;
  padding-bottom: 0;
}

.gallery-item:hover .appearing {
  height: unset;
  opacity: 1;
  padding: 3px 0 0 0;
}

.list {
  columns: 350px;
  margin: 0 10px 0;
  background: var(--main-modal-color);
  font-size: 0.9em;
  padding: 15px 10px;
}

.listrow {
  padding-bottom: 3px;
}

.data-select {
  display: block;
  background: var(--main-red);
  color: white;
  padding: 0 7px;
  border-radius: 1em;
  line-height: 1.25;
  cursor: pointer;
  margin-right: 3px;
  /* transition: background 80ms ease-in, color 80ms ease-in; */
}

.data-button {
  display: inline-block;
  position: absolute;
  right: 0;
  margin: 7px;
  background: var(--main-dimmed);
  color: white;
  padding: 0 7px;
  border-radius: 1em;
  line-height: 1.25;
  cursor: pointer;
}

.data-select::after {
  font-family: "WikiFont-Glyphs";
  font-weight: 400;
  content: " \e061";
  font-size: 0.7em;
}

.data-select:hover,
.ner:hover,
.data-button:hover,
.key > .data-select:hover,
.action > .data-select:hover {
  background: black;
  /* border-radius: 0;*/
  color: white;
  box-shadow: none;
}

.unedited {
  color: var(--main-red);
}

.unedited:hover {
  color: black;
  cursor: pointer;
}

.linked {
  color: var(--main-link-color);
  background: white;
}

.action,
.action > .data-select {
  color: #999;
  background: white;
}

.active-term {
  background: var(--main-txt-color);
  border-radius: 0;
}

.block {
  display: inline-block;
}

.intro {
  padding: 0 20px 10px 20px;
  color: var(--main-dimmed);
}

.key > .data-select {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  background: var(--main-dimmed);
  margin-right: 1px;
}

.value > .data-select {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.compound {
  display: inline-flex;
}

.lds-heart {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  transform-origin: 32px 32px;
}
.lds-heart div {
  top: 23px;
  left: 19px;
  position: absolute;
  width: 26px;
  height: 26px;
  background: var(--main-red);
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  background: var(--main-red);
}
.lds-heart div:before {
  left: -17px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -17px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}

.header-coa {
  position: absolute;
  right: 0;
  height: 35%;
  margin: 20px;
}

.bottomshade {
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.17) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  padding-top: 35px;
}

.noshade {
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding-top: 35px;
}

.titlebox {
  position: relative;
  color: #fff;
  margin: 0 20px;
  bottom: 20px;
}

.line {
  display: flex;
}

.line-type {
  margin-right: 3px;
}

.info-cubes {
  margin-top: 1em;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.info-cube {
  flex: 1 1 300px;
  padding-right: 1rem;
}

.subfirst {
  padding-top: 0;
  font-size: var(--subsubtitle-font-size);
  margin: 0;
}

.icon {
    width: 20px;
}
</style>