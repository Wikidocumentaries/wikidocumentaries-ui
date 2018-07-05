<template>
  <div class="images">
      <div id="topic_images_toolbar" class="toolbar">{{ header.title }}</div>
      <div v-masonry transition-duration="0.3s" item-selector=".grid-item" v-viewer="{/*navbar: false, toolbar: false, */title: true}" class="images">
          <div v-masonry-tile class="grid-item" v-for="image in images" v-bind:key="image.imageURL">
              <img v-bind:src="image.imageURL" class="thumbimage" v-bind:alt="image.title"/>
              <!--<div class="thumbtitle">{{ image.title }}</div>
              <div class="thumbcredit">{{ image.credit }}</div>-->
          </div>
      </div>
      <!--<button type="button" @click="show">Show</button>-->
  </div>
</template>

<script>
export default {
  name: 'TopicImages',
  data () {
    return {
      msg: '',
      header: {
        title: 'Arkistojen kuvia'
      },
      images: [
          {
              imageURL: "https://www.kuvakokoelmat.fi/pictures/small/HK19/HK19670603_7117.jpg",
              title: "Vapaamuurarin hauta",
              credit: "Pietinen, 1932"
          },
          {
              imageURL: "https://www.finna.fi/Cover/Show?id=hkm.HKMS000005:km003ca4&index=0&size=large",
              title: "Vapaamuurari, majuri Fredrik W. Granatenhjelmin hauta",
              credit: "Hugo Sundström, 1908"
          },
          {
              imageURL: "https://c2.staticflickr.com/8/7560/15422382783_5df7062c5f_o.jpg",
              title: "Hugo Simbergin kesäpaikka",
              credit: "Hugo Simberg"
          },
          {
              imageURL: "https://c2.staticflickr.com/8/7522/16042076985_b3b0d98c09_o.jpg",
              title: "Haavoittunut enkeli",
              credit: "Hugo Simberg"
          },
      ]
    }
  },
  methods: {
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.grid {

}

.grid-item {
    width: 200px;
    margin-bottom: -5px;
}

.grid-item--width2 { 
    width: 400px;
}

.thumbimage {
    width: 100%;
    cursor: zoom-in;
}

</style>
