<!-- 
 This component defines the behavior and structure of the popup for image upload.
 The popup presents various sections and information to the user about current image informaition.
 The upload button is for user to upload image.
  -->
<template>
  <div v-if="showModal" class="popup">
    <div v-if="inUpload" key="inUpload" class="popup-inner">
      <div class="toolbar">
        <h1 class="header-title">{{ $t('upload.popup.popupTitle') }}</h1>
        <div class="toolbar-item">
          <a href="#" class="toolbar-item-a">
            <i class="wikiglyph wikiglyph-cross"></i>
          </a>
          <span class="tooltip">{{ $t('upload.popup.uploadInProgress') }}</span>
        </div>
      </div>
      <InUpload></InUpload>
      <div class="message">{{ currentProcess }}</div>
      <div class="message">{{ filenameNoUnderscore }}</div>
      <div>
        <button class="button" @click.prevent="hide">{{ $t('upload.popup.cancel') }}</button>
        <button class="disable-button">{{ $t('upload.popup.upload') }}</button>
      </div>
    </div>
    <div v-else-if="showResult" key="showResult" class="popup-inner">
      showresult
      <div class="toolbar">
        <h1 class="header-title">{{ $t('upload.popup.popupTitle') }}</h1>
        <div class="toolbar-item" @click.prevent="hide">
          <a href="#" class="toolbar-item-a">
            <i class="wikiglyph wikiglyph-cross"></i>
          </a>
          <span class="tooltip">{{ $t('upload.popup.closePopup') }}</span>
        </div>
      </div>
      <div class="message">{{ resultMessage }}</div>
    </div>
    <div v-else-if="uploadFinish" key="uploadFinish" class="popup-inner">
      uploadfinish
      <h2 class="message">{{ $t('upload.popup.uploadSuccess') }}</h2>
      <h4 class="message">{{ $t('upload.popup.view') }}
        <a :href="commonsUrl" target="_blank">{{ filenameNoUnderscore }}</a>
        {{ $t('upload.popup.inWikimediaCommons') }}
      </h4>
      <div><button class="button" @click.prevent="hide">
          {{ $t('upload.popup.ok') }}
        </button></div>
    </div>
    <div v-else class="popup-inner">
      <div>
        <div class="toolbar">
          <h1 class="header-title">{{ $t('upload.popup.popupTitle') }}</h1>
          <div class="toolbar-item" @click.prevent="hide">
            <a href="#" class="toolbar-item-a">
              <i class="wikiglyph wikiglyph-cross"></i>
            </a>
            <span class="tooltip">{{ $t('upload.popup.closePopup') }}</span>
          </div>
        </div>
        <div class="toolbar">
          <h4 class="popupTip">{{ $t('upload.popup.popupTip') }}</h4>
        </div>
        <div class="columns">
          <div class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-view-details metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('upload.popup.filename') }}</div>
              <div class="data">
                <div class="grid-body unedited">{{ filename }}</div>
              </div>
            </div>

          </div>
          <div class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-stripe-summary metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('imageViewer.imageMetadata.caption') }}</div>
              <div class="data">
                <div class="grid-body unedited">{{ title }}</div>
              </div>
            </div>

          </div>
          <div v-if="element.creators" class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-user-avatar metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('imageViewer.imageMetadata.creator') }}</div>
              <div class="grid-body unedited">
                <ItemPullDown @clicked="onClickChild" class="grid-select value" v-bind:term="this.author">
                </ItemPullDown>
              </div>
            </div>
          </div>

          <div class="grid-row" v-if="element.datecreated">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-production-date metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('imageViewer.imageMetadata.dateCreated') }}</div>
              <div class="data">
                <div class="grid-body unedited">{{ date }}</div>
              </div>
            </div>
          </div>

          <div v-if="element.license" class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-public-domain metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('imageViewer.imageMetadata.license') }}</div>
              <div class="data">
                <a :href="element.license_link" target="_blank">{{ license }}</a>
              </div>
            </div>
          </div>

          <div v-if="this.category" class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-message metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('upload.popup.category') }}</div>
              <div class="data">
                <a :href="this.categoryLink" target="_blank">{{ category }}</a>
              </div>
            </div>
          </div>

          <div class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-article metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('imageViewer.imageMetadata.imageInfoPage') }}</div>
              <div class="data break">
                <a :href="element.infoURL" target="_blank">{{ source }}</a>
              </div>
            </div>
          </div>

          <!-- Depicts -->
          <div class="grid-row">
            <div class="grid-icons">
              <i class="wikiglyph wikiglyph-depicted metadata-glyph"></i>
            </div>
            <div class="grid-text">
              <div class="grid-item">{{ $t('imageViewer.imageMetadata.depicted') }}</div>
              <div class="data">
                <div class="grid-body unedited"><a :href="imgDepictUrl" target="_blank">{{ imgDepict }}</a></div>
              </div>
            </div>
          </div>

        </div>
        <div v-if="licenseTemplate"><button class="button" @click="getCsrfToken">
            {{ $t('upload.popup.upload') }}
          </button>
        </div>
        <div v-else><button class="disable-button">
          {{ $t('upload.popup.upload') }}
          </button>
          <div class="licenseMessage">
            <div class="toolbar">
              <h4 class="popupTip">{{ $t('upload.popup.cannotUpload') }}
                <a href='https://github.com/Wikidocumentaries/wikidocumentaries-ui/issues/new/choose'
                  target="_blank">{{ $t('upload.popup.Github') }}</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemPullDown from "@/components/upload/ItemPullDown";
import InUpload from "@/components/upload/InUpload";
import axios from "axios";

export default {
  name: "PopUp",
  data() {
    return {
      element: {},
      showModal: false,
      inUpload: false,
      showResult: false,
      uploadFinish: false,
      currentProcess: "",
      resultMessage: "",
      date: "",
      title: "",
      author: "",
      license: "",
      source: "",
      filename: "",
      filenameNoUnderscore: "",
      category: "",
      categoryLink: "",
      licenseTemplate: "",
      imgDepict: "",
      imgDepictUrl: "",
      response: "",
      commonsUrl: "",
      finnaId: ""
    };
  },
  components: {
    ItemPullDown,
    InUpload
  },
  methods: {
    show(element) {
      this.showResult = false;
      this.showModal = true;
      this.element = element;
      if (element.title) {
        // not remove, encode
        this.title = element.title[0].replace(/[\.\-\s\<\>]/gi, " ");
        this.title = this.title.replace(/[\s]{2,}/gi, " ");
        this.title = this.title.replace(/[\s]$/, "");
        this.filename =
          this.title.charAt(0).toUpperCase() + this.title.slice(1);
      } else {
        this.title = "";
      }
      if (element.creators[0]) {
        this.author = element.creators[0].name
          .split(", ")
          .reverse()
          .join(" ")
          .replace(/[\.\-\s\<\>]/gi, " ");
        this.filename += "_by_" + this.author;
      } else {
        this.author = "";
      }
      if (element.datecreated[0]) {
        this.date =
          element.year != "" && element.year != null ? element.year : "";
        this.filename += "_" + this.date;
      } else {
        this.date = "";
      }
      if (element.license) {
        this.license = element.license;
      } else {
        this.license = "";
      }
      if (element.infoURL) {
        this.source = element.infoURL;
      } else {
        this.source = "";
      }
      this.filenameNoUnderscore = this.filename.replace(/[_]/g, " ");
      // this.filename = encodeURIComponent(this.filename.replace(/\s/g, "_"));
      this.filename = this.filename.replace(/\s/g, "_");
      this.licenseTemplate = element.licenseTemplate;
      for (var statement of this.$store.state.wikidocumentaries.wikidata
        .statements) {
        if (statement.id === "P373") {
          this.category = statement.values[0].value;
          this.categoryLink = statement.values[0].url;
          console.log(statement);
        }
      }
      this.imgDepict = this.$store.state.wikidocumentaries.title;
      this.imgDepictUrl = 'https://www.wikidata.org/wiki/' + this.$store.state.wikidocumentaries.wikidataId;
      this.finnaId = element.id;
      console.log(element.id)
    },
    hide() {
      this.showModal = false;
    },
    async getCsrfToken() {
      this.inUpload = true;
      this.currentProcess = "Getting token";
      let requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/csrfToken",
        method: "get",
        params: {
          token: localStorage.getItem("access_token")
        }
      };
      let response = await axios.request(requestConfig);
      console.log(response.data.csrf_token);
      console.log(this.currentProcess);
      console.log(this.filenameNoUnderscore);

      this.downloadImage(response.data.csrf_token);
    },
    async downloadImage(csrf_token) {
      this.currentProcess = "Downloading";
      let downloadURL = this.element.downloadURL;
      let requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/download",
        method: "get",
        params: {
          finnaId: this.finnaId,
        }
      };
      let response = await axios.request(requestConfig);
      console.log(response.data);
      if (this.showModal) {
        this.callupload(csrf_token);
      } else {
        this.inUpload = false;
        console.log("user cancel upload");
        this.deleteCancledFile();
      }
    },
    deleteCancledFile() {
      let requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/deleteFile",
        method: "get",
        params: {
          finnaId: this.finnaId,
        }
      };
      let response = axios.request(requestConfig);
    },
    async callupload(csrf_token) {
      this.currentProcess = "Uploading";
      let infoTemplate = `{{Information|description=${this.title}|date=${this.date
        }|source=${this.source}|author=${this.author}}}`;
      let category = `[[Category:Images uploaded from Wikidocumentaries]][[Category:${this.category
        }]]`;
      let text = infoTemplate + this.licenseTemplate + category;
      let downloadURL = this.element.downloadURL;
      let requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/upload",
        method: "get",
        params: {
          token: localStorage.getItem("access_token"),
          csrf_token: csrf_token,
          finnaId: this.finnaId,
          text: text,
        }
      };
      let response = await axios.request(requestConfig);
      console.log(response.data.uploadResponse);
      if (response.data.uploadResponse.upload) {
        console.log("depict start");
        let title = `File:${response.data.uploadResponse.upload.filename}`;
        this.inUpload = false;
        this.uploadFinish = true;
        this.commonsUrl = "https://commons.wikimedia.org/wiki/" + title;
        this.depict(title);
      } else {
        this.inUpload = false;
        this.showResult = true;
        this.resultMessage = response.data.uploadResponse.error.info;
      }
    },
    async depict(title) {
      this.currentProcess = "Depicting";
      let requestConfig = {
        baseURL: this.$store.state.BASE_URL,
        url: "/depict",
        method: "get",
        params: {
          token: localStorage.getItem("access_token"),
          title: title,
          depictId: this.$store.state.wikidocumentaries.wikidataId
        }
      };
      let response = await axios.request(requestConfig);
      this.inUpload = false;
    },
    onClickChild(value) {
      this.author = value;
    },
    print() {
      let infoTemplate = `{{Information|description=${this.title}|date=${this.date
        }|source=${this.source}|author=${this.author}}}`;
      let category = `[[Category:Images uploaded from Wikidocumentaries]][[Category:${this.category
        }]]`;
      console.log(infoTemplate);
      console.log(this.licenseTemplate);
      console.log(category);
      console.log(this.filename);
      console.log(this.filenameNoUnderscore);
    }
  }
};
</script>
<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  background: #fff;
  padding: 30px;
  max-width: 1000px;
}

.grid-icons {
  display: inline-block;
  margin: 0.05em 0.8em 0 0;
}

.grid-item {
  font-weight: bold;
  display: inline-block;
  color: var(--main-txt-color);
}

.grid-text {
  display: inline-block;
  padding-top: 2px;
}

.data {
  display: inline-block;
  padding-top: 2px;
}

.grid-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.columns {
  column-width: 400px;
  column-gap: 1.5em;
  padding: 10px 20px 15px 20px;
}

.break {
  word-break: break-all;
}

.metadata-glyph {
  color: var(--main-txt-color);
  font-size: 20px;
}

.header-title {
  text-align: left;
}

.popupTip {
  font-weight: lighter;
  margin-top: 0px;
  width: 600px;
  text-align: left;
}

.licenseMessage {
  margin-bottom: 0px;
  width: 600px;
  display: inline-block;
}

.button {
  background-color: #249ad1;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  font-weight: normal;
  margin: 4px 2px;
  cursor: pointer;
  align-items: left;
}

.disable-button {
  background-color: #777;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  font-weight: normal;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
