<template>
<div v-if="showModal" class="popup" >
    <div class="popup-inner">
        <slot></slot>
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
        </div>
        <button class="button" @click="upload">
        Upload
        </button>
    </div>

</div>
</template>
<script>
import Dataselect from "@/components/Dataselect";

export default{
    name: 'PopUp',  
    data() {
        return {
            element: {},
            showModal: false,
            date: '',
            title: '',
            author: '',
            license: '',
            source: '',
            filename: '',
        }
        },
        components:{
            Dataselect,
        },
    methods: {
        show(element){
            this.showModal = true;
            this.element = element;
            if (element.title){
                this.title = element.title[0];
                this.filename = this.title.charAt(0).toUpperCase() + this.title.slice(1);
            }
            else{this.title = ''}
            if (element.creators[0]){
                this.author = element.creators[0].name.split(', ').reverse().join(' ');
                this.filename += '_by_' + this.author;
            }
            else{this.author = ''}
            if (element.datecreated[0]){
                this.date = element.datecreated[0].replace(/\D/g, "");
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
            this.filename = this.filename.replace(/\s/g, "_");
        },
        hide() {
            this.showModal = false;
        },
        getLicenseTemplate(){
            switch (this.license) {
                case 'CC BY 4.0':
                    return '{{Cc-by-sa-4.0}}';
            }
            return ''; 
        },
        upload(){
            let infoTemplate = `{{Information|description=${this.title}|date=${this.date}|source=${this.source}|author=${this.author}}}`;
            let licenseTemplate = this.getLicenseTemplate();
            let category = '[[Category:Images uploaded from Wikidocumentaries]]';
            var params = {
                action: 'upload',
                filename: this.filename,
                ignorewarnings: '1',
                token: 'csrf_token',
                format: 'json',
                text: infoTemplate + licenseTemplate + category,
            };
            console.log(params);
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
}
</style>