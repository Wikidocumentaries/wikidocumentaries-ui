<template>
  <div class="header" v-bind:style="style">
      <img v-bind:src="wikidocumentaries.headerImageURL" class="header-image"/>
      <!--<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Kaisaniemi_Freemason%27s-Grave.JPG" class="header-image"/> -->
      <div class="header-contents">
          <div class="title">
            <h1>{{ wikidocumentaries.title }}</h1>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TopicPageHeader',
  props: {
      wikidocumentaries: Object
  },
  data () {
    return {
      msg: 'testaus'
    }
  },
  computed: {
      style: function() {
          console.log(this.wikidocumentaries);
          return ''
          //return "background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Kaisaniemi_Freemason%27s-Grave.JPG')"; 
          //return "background-image: url('https://upload.wikimedia.org/wikipedia/commons/b/bf/Helsinki_Kaisaniemi_Freemason%27s_grave_1908_I_K_Inha.png')";
          //return "background-image: url('" + this.wikidocumentaries.headerImageURL + "')";
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    position:relative;
}
.header-image {
    width: 100%;
    -webkit-filter: grayscale(100%);
    filter: gray;
}
.header-contents {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    font: Verdana, sans-serif;
}
.title {
    position:absolute;
    bottom: 10px;
    left: 10px;
}
h1, h2 {
  font-weight: bold;
  font-size: 32pt;
  text-transform: uppercase;
  color: #be3030;
}
</style>
