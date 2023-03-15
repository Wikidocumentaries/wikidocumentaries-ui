<template>
  <div class="wikipedia">
    <div class="toolbar">
      <h1 class="header-title">{{ $t('topic_page.Wikipedia.headerTitle') }}</h1>
      <ArticleLanguageMenu
        class="language-menu"
        :currentLanguage="language"
        :translateLink="translateLink"
        @doLanguageChange="onLanguageChange"
      ></ArticleLanguageMenu>
      <HeaderLink
        v-if="wikipedia.wikipediaURL"
        class="toolbar-item"
        :tooltip="$t('topic_page.Wikipedia.extLink.linkTitleWP')"
        :link="wikipedia.wikipediaURL"
        icon="wikiglyph-new-window"
      ></HeaderLink>
      <HeaderLink
        v-else
        class="toolbar-item"
        :tooltip="$t('topic_page.Wikipedia.addLink.linkTitleWP')"
        :link="newArticleLink"
        icon="wikiglyph-plus"
      ></HeaderLink>
    </div>
    <div :class="[isExpanded ? 'expanded' : '']" class="text-container">
      <div v-if="wikipedia.wikipediaURL" class="text wiki-html">
        <div class="excerpt" ref="excerpt" v-html="wikipedia.excerptHTML"></div>
        <div class="remain" ref="remain" v-html="wikipedia.remainingHTML"></div>
      </div>
      <div v-else class="text wiki-html">
        <p>{{ $t('topic_page.Wikipedia.missingArticle') }}</p>
      </div>
    <!--<Links 
    class="wplinks" 
    :currentLanguage="this.language"
    ></Links> -->
    </div>
    <div class="haze" id="wp">
      <div class="toolbar-item block">
        <a @click="isExpanded = !isExpanded" class="toolbar-item-a">
          <i
            class="wikiglyph"
            :class="[isExpanded ? 'wikiglyph-caret-up' : 'wikiglyph-caret-down']"
          ></i>
        </a>
        <span v-if="isExpanded == false" class="tooltip">{{ $t('general.expand') }}</span>
        <span v-else class="tooltip">{{ $t('general.collapse') }}</span>
      </div>
    </div>
    <ImageViewer ref="imageviewer"></ImageViewer>
  </div>
</template>

<script>
import axios from "axios";
import HeaderLink from "@/components/HeaderLink";
import ArticleLanguageMenu from "@/components/menu/ArticleLanguageMenu";
import Links from "@/components/topic_page/Links";
import ImageViewer from "@/components/image_viewer/ImageViewer";
export default {
  name: "WikipediaArticle",
  props: {},
  computed: {
    getSelected() {
      if (window.getSelection) {
        return window.getSelection();
      } else if (document.getSelection) {
        return document.getSelection();
      } else {
        var selection = document.selection && document.selection.createRange();
        if (selection.text) {
          return selection.text;
        }
        return false;
      }
    },
    doSelection() {
      var selection = getSelected();
      if (selection) {
        alert(selection);
      }
    },
    translateLink() {
      const site = this.$store.state.wikidocumentaries.wikidata.sitelinks.filter(
        sitelink => sitelink.site == this.language + "wiki"
      );
      if (!site.length) {
        return null;
      }
      const title = site[0].title;
      const url =
        "https://" +
        this.$i18n.locale +
        ".wikipedia.org/wiki/Special:ContentTranslation?page=" +
        title +
        "&from=" +
        this.language +
        "&to=" +
        this.$i18n.locale +
        "&targettitle=&version=2&campaign=Wikidocumentaries";
      return url;
    },
    newArticleLink() {
      const title = this.$store.state.wikidocumentaries.wikidata.title;
      const url =
        "https://" +
        this.$i18n.locale +
        ".wikipedia.org/w/index.php?title=" +
        title +
        "&action=edit";
      return url;
    }
  },
  data() {
    return {
      isExpanded: false,
      language: this.$i18n.locale,
      wikipedia: this.$store.state.wikidocumentaries.wikipedia,
      items: []
    };
  },
  components: {
    HeaderLink,
    ArticleLanguageMenu,
    Links,
    ImageViewer
  },
  methods: {
    onLanguageChange(language) {
      this.language = language;

      var requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/wiki",
        method: "get",
        params: {
          wikidata: this.$store.state.wikidocumentaries.wikidataId,
          language: language
        }
      };
      axios.request(requestConfig).then(response => {
        if (response.data.wikidata == null) {
          console.log("response.data.wikipedia == null");
          context.commit(
            "setWikidocumentariesDataState",
            WIKI.STATES.FAIL_WIKI_EXTERNAL
          );
        } else {
          this.wikipedia.excerptHTML = response.data.wikipediaExcerptHTML;
          this.wikipedia.remainingHTML = response.data.wikipediaRemainingHTML;
          this.wikipedia.wikipediaURL =
            response.data.wikipedia.content_urls.desktop.page;
          this.items = [];
        }
      });
    },
    // check if an element is n decendant of the article
    isArticleDescendant(child) {
      let node = child.parentNode;
      while (node) {
        if (node === this.$refs.excerpt || node === this.$refs.remain) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    },
    // get the image title from wiki imageURL
    getImageTitleFromURL(imgURL) {
      return imgURL.slice(imgURL.lastIndexOf("/") + 1);
    },
    // convert item field htmlString to regular text
    convertHtmlToText(htmlString) {
      const parser = new DOMParser();
      const floatingElement = parser.parseFromString(
         htmlString ,
        "text/html"
      );
      const text = floatingElement.activeElement.innerText;
      return text;
    },
    async getImageDetailsInfo(imgs) {
      const parent = this;
      // check if items data is stored
      if (this.items.length !== 0) return this.items;
      this.items = new Array(imgs.length);
      await Promise.all(
        imgs.map(async function(img, index) {
          let requestConfig = {
            baseURL: parent.$store.state.BASE_URL,
            url: "/wiki/imageinfo",
            method: "get",
            params: {
              titles: parent.getImageTitleFromURL(img.parentNode.href),
              language: parent.language
            }
          };
          await axios
            .request(requestConfig)
            .then(function(response) {
              let wikiImageInfo = response.data.wikiImageInfo;
              let extMetadata = wikiImageInfo.imageinfo[0].extmetadata;
              // fill the image item fields with data from the api
              parent.items[index] = {
                actors: [],
                collection: "",
                creators: extMetadata.Artist
                  ? [parent.convertHtmlToText(extMetadata.Artist.value)]
                  : [],
                datecreated: extMetadata.DateTimeOriginal
                  ? [
                      parent.convertHtmlToText(
                        extMetadata.DateTimeOriginal.value
                      )
                    ]
                  : [],
                description: extMetadata.ImageDescription
                  ? [
                      parent.convertHtmlToText(
                        extMetadata.ImageDescription.value
                      )
                    ]
                  : [],
                details: [],
                downloadURL: wikiImageInfo.imageinfo[0].url,
                formats: [],
                geoLocations: [],
                id: "",
                imageURL: wikiImageInfo.imageinfo[0].url,
                infoURL: img.parentElement.href,
                inscriptions: [],
                institutions: [],
                inventoryNumber: "",
                license: extMetadata.License ? extMetadata.License.value : "",
                license_link: extMetadata.LicenseUrl
                  ? extMetadata.LicenseUrl.value
                  : "",
                materials: [],
                measurements: [],
                places: [],
                publisher: null,
                rightsstatement: "",
                source: "",
                subjects: [],
                thumbURL: img.currentSrc,
                title: [
                  extMetadata.ObjectName.value
                    ? extMetadata.ObjectName.value
                    : wikiImageInfo.title
                ],
                year: 0
              };
            })
            .catch(function(error) {
              // infer image info from the img element
              parent.items[index] = {
                actors: [],
                collection: "",
                creators: [],
                datecreated: [],
                description: [],
                details: [],
                downloadURL: "",
                formats: [],
                geoLocations: [],
                id: "",
                imageURL: img.currentSrc
                  .slice(0, img.currentSrc.lastIndexOf("/"))
                  .replace("/thumb", ""),
                infoURL: img.parentElement.href,
                inscriptions: [],
                institutions: [],
                inventoryNumber: "",
                license: "",
                license_link: "",
                materials: [],
                measurements: [],
                places: [],
                publisher: null,
                rightsstatement: "",
                source: "",
                subjects: [],
                thumbURL: img.currentSrc,
                title: [img.parentElement.parentElement.outerText],
                year: 0
              };
              console.log(error);
            });
        })
      );
      return this.items;
    },
    addLinksToImages() {
      // query all images in the wikipedia article
      const imgs = Array.from(document.querySelectorAll("img")).filter(
        img =>
          img.parentElement &&
          img.parentElement.nodeName == "A" &&
          this.isArticleDescendant(img.parentElement)
      );
      const parent = this;
      for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i];
        // suppress orginal image click action
        img.parentElement.addEventListener("click", e => {
          e.preventDefault();
        });
        // when the image is clicked, the image viewer is opened
        img.addEventListener("click", async e => {
          const items = await parent.getImageDetailsInfo(imgs);
          parent.$refs.imageviewer.show(items, i);
        });
      }
    }
  },
  mounted() {
    // add links on page mounted
    this.addLinksToImages();
  },
  updated() {
    // add links on language changed
    this.addLinksToImages();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expander {
  width: 100%;
  padding-top: 0;
  padding-right: 12px;
  margin-top: -10px;
  text-align: right;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
}

.expander:hover {
  outline: 0;
}

.expander:focus {
  outline: 0;
}

.top-exander {
  margin-bottom: -10px;
  padding-right: 0px;
}

.expanded-html >>> .h2:first-of-type {
  margin-top: -10px;
}

.wiki-html >>> .h2 {
  font-size: 2em;
}

.wiki-html >>> .h3 {
  font-size: 1.5em;
}

.wiki-html >>> .h4 {
  font-size: 1.25em;
}

.wiki-html >>> .h5 {
  font-size: 1em;
}

.wiki-html >>> span > p:nth-child(1) {
  margin-top: 0;
}

/* .remain {
  display:none;
} */

.expanded .remain {
  display: initial;
}
</style>
