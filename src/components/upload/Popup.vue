<template>
<div v-if="showModal" class="popup" >
    <div v-if="inUpload" class="popup-inner">
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
        <button class="disable-button">Upload</button></div>
    </div>
    <div v-else class="popup-inner">
        <slot></slot>
        <div v-if="showResult" class="popup-inner">
        <div class="toolbar">
                <div class="toolbar-item" @click.prevent="hide">
                      <a href="#" class="toolbar-item-a">
                        <i class="wikiglyph wikiglyph-cross"></i>
                      </a>
                      <span class="tooltip">{{ $t('upload.popup.closePopup') }}</span>
                    </div>
        </div>
        <div class="message">{{ resultMessage }}</div>
    </div>
    <div v-else>
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
                    <div class = "data">
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
                    <div class = "data">
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
                    <template v-if="element.source == 'Finna'">
                        <div class="compound" v-for="creator in element.creators" :key="creator.id">
                            <div class="grid-body unedited">{{ author }}</div>
                        </div>    
                    </template>
                    <template v-else>
                        <Dataselect class="grid-select" v-for="creator in element.creators" :key="creator.id" v-bind:term="creator"></Dataselect>
                    </template>
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
                        <a :href="element.license_link">{{ license }}</a>
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
                        <a :href="this.categoryLink">{{ category }}</a>
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
                        <div class="grid-body unedited">{{ imgDepict }}</div>
                    </div>    
                </div>
            </div>

        </div >
        <div v-if="licenseTemplate"><button class="button" @click="getCsrfToken">
        Upload
        </button>
        <button class="button" @click="depict">
            depict
        </button>
        </div>
        <div v-else><button class="disable-button">
        Upload
        </button>
        <div class="licenseMessage">
        <div class="toolbar">
            <h4 class="popupTip">{{ $t('upload.popup.cannotUpload') }}<a @click="upload" href='https://github.com/Wikidocumentaries/wikidocumentaries-ui/issues/new/choose'>Github</a></h4>
        </div>
    </div>
    </div>
    </div>
    </div>

</div>
</template>
<script>
import Dataselect from "@/components/Dataselect";
import InUpload from "@/components/upload/InUpload";
import axios from "axios";

export default{
    name: 'PopUp',  
    data() {
        return {
            element: {},
            showModal: false,
            inUpload: false,
            showResult: false,
            currentProcess: "",
            resultMessage: "",
            date: '',
            title: '',
            author: '',
            license: '',
            source: '',
            filename: '',
            filenameNoUnderscore: '',
            category: '',
            categoryLink: '',
            licenseTemplate: '',
            imgDepict: '',
            response: '',
        }
        },
        components:{
            Dataselect,
            InUpload,
        },
    methods: {
        show(element){
            this.showResult = false;
            this.showModal = true;
            this.element = element;
            if (element.title){
                
                this.title = element.title[0].replace(/[^\w\sÅÄÖåäö]/gi, "");
                this.filename = this.title.charAt(0).toUpperCase() + this.title.slice(1);
            }
            else{this.title = ''}
            if (element.creators[0]){
                this.author = element.creators[0].name.split(', ').reverse().join(' ').replace(/[^\w\sÅÄÖåäö]/gi, "");
                this.filename += '_by_' + this.author;
            }
            else{this.author = ''}
            if (element.datecreated[0]){
                this.date =
                element.year != "" && element.year != null ? element.year : "";
                this.filename += '_' + this.date;
            }
            else{this.date = ''}
            if (element.license){
                this.license = element.license;
            }
            else{this.license = ''}
            if (element.infoURL){
                this.source = element.infoURL;
            }
            else{this.source = ''}
            this.filenameNoUnderscore = this.filename;
            this.filename = this.filename.replace(/\s/g, "_");
            this.getLicenseTemplate();
            for (var statement of this.$store.state.wikidocumentaries.wikidata.statements) {
                if (statement.id === "P373"){
                    this.category = statement.values[0].value;
                    this.categoryLink = statement.values[0].url;
                    console.log(statement);
                }
            }
            this.imgDepict = this.$store.state.wikidocumentaries.title;
        },
        hide() {
            this.showModal = false;
        },
        getLicenseTemplate(){
            switch (this.license) {
                case 'CC BY 4.0':
                    this.licenseTemplate = '{{Cc-by-4.0}}';
                    break;
                case 'CC BY-SA 4.0':
                    this.licenseTemplate = '{{Cc-by-sa-4.0}}';
                    break;
                case 'CC0':
                    this.licenseTemplate = '{{Cc-zero}}';
                    break;
                case 'PDM':
                    this.licenseTemplate = '{{PD-old}}';
                    break;
            }
        }, 
        async getCsrfToken() {
            this.inUpload = true;
            this.currentProcess = "Getting token";
            let requestConfig = {
            baseURL: this.$store.state.BASE_URL,
            url: "/csrfToken",
            method: "get",
            params: {
              token: localStorage.getItem("access_token"),
            }
            };
            let response = await axios.request(requestConfig);
            console.log(response.data.csrf_token);
            console.log(this.currentProcess);
            console.log(this.filenameNoUnderscore);

            this.downloadImage(response.data.csrf_token);
            
        },
        async downloadImage(csrf_token){
            this.currentProcess = "Downloading";
            let downloadURL = this.element.downloadURL;
            let requestConfig = {
            baseURL: this.$store.state.BASE_URL,
            url: "/download",
            method: "get",
            params: {
                filename: this.filename,
                downloadURL: downloadURL
            }
            };
            let response = await axios.request(requestConfig);
            console.log(response.data);
            if (this.showModal){
                this.callupload(csrf_token);
            }
            else{
                this.inUpload = false;
                console.log('user cancel upload');
                this.deleteCancledFile();
            }
        },
        deleteCancledFile(){
            let requestConfig = {
            baseURL: this.$store.state.BASE_URL,
            url: "/deleteFile",
            method: "get",
            params: {
                filename: this.filename,
            }
            };
            let response = axios.request(requestConfig);
        },
        async callupload(csrf_token){
            this.currentProcess = "Uploading";
            let infoTemplate = `{{Information|description=${this.title}|date=${this.date}|source=${this.source}|author=${this.author}}}`;
            let category = `[[Category:Images uploaded from Wikidocumentaries]][[Category:${this.category}]]`;
            let text = infoTemplate + this.licenseTemplate + category;
            let downloadURL = this.element.downloadURL;
            let requestConfig = {
            baseURL: this.$store.state.BASE_URL,
            url: "/upload",
            method: "get",
            params: {
                token: localStorage.getItem("access_token"),
                csrf_token: csrf_token,
                filename: this.filename,
                text: text,
                downloadURL: downloadURL
            }
            };
            let response = await axios.request(requestConfig);
            console.log(1111111111111);
            console.log(response.data.uploadResponse);
            if (response.data.uploadResponse.upload){
                console.log("depict start");
                let title = `File:${response.data.uploadResponse.upload.filename}`;
                console.log(title);
                this.depict(title);
            }
            else{
                this.inUpload = false;
                this.showResult = true;
                this.resultMessage = response.data.uploadResponse.error.info;
            }
        },
        async depict(title){
            this.currentProcess = "Depicting";
            let requestConfig = {
            baseURL: this.$store.state.BASE_URL,
            url: "/depict",
            method: "get",
            params: {
              token: localStorage.getItem("access_token"),
              title: title,
              depictId: this.$store.state.wikidocumentaries.wikidataId,
            }
            };
            let response = await axios.request(requestConfig);
            this.inUpload = false;
            console.log(response);
            this.showResult = true;
            this.resultMessage = response.data;
        },
    }
}
</script>
<style scoped>
.popup{
    position: fixed;
    top: 0;
    left:0;
    right:0;
    bottom:0;
    z-index:99;
    background: rgba(0,0,0,0.5);
    display:flex;
    align-items: center;
    justify-content: center;


}
.popup-inner{
    background: #FFF;
    padding:30px;
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

.header-title{
    text-align: left;
}

.popupTip{
    font-weight:lighter;
    margin-top: 0px;
    width: 600px;
    text-align: left;
}

.licenseMessage{
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

.disable-button{
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