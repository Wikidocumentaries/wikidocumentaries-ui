 <template>
   <div class="header">
      <img v-bind:src="wikidocumentaries.headerImageURL" class="header-image" :class="( isHumanTopic ? 'header-human' : 'header-nonhuman')"/>
      <!--<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Kaisaniemi_Freemason%27s-Grave.JPG" class="header-image"/> -->
       <div class="header-contents">
        <div class="bottomshade">
          <div class="titlebox">
            <div class="title">{{ wikidocumentaries.title }}</div>
            <div class="subtitle">{{ wikidocumentaries.subtitle }}</div>
           </div>
        </div>
       </div>
   </div>
 </template>

<script>
export default {
    name: 'TopicPageHeader',
    props: {
    },
    data () {
        return {
        }
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        isHumanTopic () {
            if (this.$store.state.wikidocumentaries.wikidata != undefined && this.$store.state.wikidocumentaries.wikidata.instance_of.id == 'Q5') {
                return true;
            }
            else {
                return false;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
    position:relative;
    /* width: calc(100% - 10px); */
    background: var(--main-modal-color);
}

.header-image {
    width: 100%;
    height: 60vh; /* Remove for production? */
    /* Remove for production? not supported in IE 11 */
    /* -webkit-filter: grayscale(100%);
    filter: grayscale(100%); */
}

.header-nonhuman {
    object-fit: cover;
}

.header-human {
    object-fit: contain;
}

.bottomshade {
  position: absolute;
  height: 145px;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(360deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
}

.titlebox {
    position:absolute;
    /* left: 10px; */
    /* width: calc(100% - 10px); */
    font-weight: bold;
    color: #fff;
    margin-left: 20px;
    bottom: 20px;
}

.title {
    font-size: 48px;
    line-height: 1em;
}

.title::first-letter {
  text-transform: capitalize;
}

.subtitle {
    font-size: 24px;
    line-height: 1.5em;
}

.subtitle:first-letter {
    text-transform: capitalize;
}


h1 {
    font-weight: bold;
    font-size: 32pt;
    text-transform: uppercase;
    color: #ffffff;
}
h1 span { 
   /*letter-spacing: -1px;  */
   background: rgb(0, 0, 0); /* fallback color */
   background: rgba(0, 0, 0, 0.3);
   padding: 10px; 
}
</style>
