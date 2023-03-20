<template>
    <div :class="( headerImage ? 'header' : 'header-compact')">
        <img :src="headerImage" class="header-image zoomable-image" :class="( isHumanTopic ? 'header-human' : 'header-nonhuman')"/>
        <div class="header-contents">
            <div id="marks" class="header-marks">
                <img :src="logoImage" class="header-logo" />
                <img :src="signature" class="header-neg" />
                <img :src="sailEmblem" class="header-logo" />
                <a :href="getCoaURL"><img :src="coatOfArms" class="header-coa" /></a>
            </div>
            <div id="shade" :class="(headerImage ? 'bottomshade' : 'noshade')">
                <div class="titlebox">
                    <div class="titlecont">
                        <div class="title">{{ wikidocumentaries.title }}</div>
                        <!--span class="tooltip">{{ $t('topic_page.Header.titleEditText') }}</span>
                        <div class="buttons">
                            <i class="wikiglyph wikiglyph-check wikiglyph-titlebutton"></i><span class="tooltip">{{ $t('topic_page.Header.titleApproveText') }}</span>
                        </div>
                        <div class="buttons">
                            <i class="wikiglyph wikiglyph-edit wikiglyph-titlebutton"></i><span class="tooltip">{{ $t('topic_page.Header.titleEditText') }}</span>
                        </div-->
                    </div>
                    <div class="subtitlecont">
                        <div class="subtitle">{{ wikidocumentaries.description }}</div>
                        <!--span class="tooltip">{{ $t('topic_page.Header.subtitleEditText') }}</span>
                        <div class="buttons">
                            <i class="wikiglyph wikiglyph-check wikiglyph-subtitlebutton"></i><span class="tooltip">{{ $t('topic_page.Header.subtitleApproveText') }}</span>
                        </div>
                        <div class="buttons">
                            <i class="wikiglyph wikiglyph-edit wikiglyph-subtitlebutton"></i><span class="tooltip">{{ $t('topic_page.Header.subtitleEditText') }}</span>
                        </div-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mediumZoom from 'medium-zoom';
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
            let typeid = this.$store.state.wikidocumentaries.wikidata.instance_of.id;
            let conditionsArray = ['Q5', 'Q3305213'];
            if (this.$store.state.wikidocumentaries.wikidata != undefined && conditionsArray.includes(typeid) === true) {
                return true;
            }
            else {
                return false;
            }
        },
        headerImage () {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let imageid;
            let imageurl;
            for (var index in statements) {
                if (statements[index].id == 'P18') {
                    imageid = statements[index].values[0].value;
                }
            }
            if (imageid) {
                imageid = encodeURIComponent(imageid);
                imageurl = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"+imageid;
            } else {
                imageurl = this.wikidocumentaries.headerImageURL;
            }
            return imageurl;
        },
        coatOfArms () {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let coaid;
            for (var index in statements) {
                if (statements[index].id == 'P94') {
                    coaid = statements[index].values[0].value;
                    return "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"+coaid;
                }
            }
        },
        getCoaURL() {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let coaartid;
            for (var index in statements) {
                if (statements[index].id == 'P237') {
                    coaartid = statements[index].values[0].id;
                    return "/" + coaartid + "?language=" + this.$i18n.locale;
                }
            }
        },
        logoImage () {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let logoImg;
            for (var index in statements) {
                if (statements[index].id == 'P154') {
                    logoImg = statements[index].values[0].value;
                    return "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"+logoImg;
                }
            }
        },
        signature () {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let signature;
            for (var index in statements) {
                if (statements[index].id == 'P109') {
                    signature = statements[index].values[0].value;
                    return "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"+signature;
                }
            }
        },
        sailEmblem () {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let sailEmblem;
            for (var index in statements) {
                if (statements[index].id == 'P5962') {
                    sailEmblem = statements[index].values[0].value;
                    return "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"+sailEmblem;
                }
            }
        }
    //     compactHeight() {
    //         return 'height:' + this.$refs.shade.clientHeight;
    //         console.log('height:' + this.$refs.shade.clientHeight);
    //   }
    },
    mounted() {
    this.$nextTick(() => {
      mediumZoom('.zoomable-image', {
        background: '#000',
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
    box-shadow: none;
}

.header {
    position:relative;
    background: var(--main-txt-color);
    height: calc(100vh - 170px);
    transition: height 0.5s;
}

.header-compact {
    position:relative;
    background: var(--main-blue);
    min-height:25vh;
}

.header-image {
    width: 100%;
    /* Remove for production? */
    /* Remove for production? not supported in IE 11 */
}

.header-nonhuman {
    object-fit: cover;
}

.header-human {
    object-fit: contain;
}

.titlecont, .subtitlecont {
    display: flex;
}

.buttons {
    display: flex;
    align-items: flex-end;
    position: relative;
}

.buttons:hover {
    cursor: pointer;
}

.title:hover + .tooltip, .subtitle:hover + .tooltip, .buttons:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.title + .tooltip, .subtitle + .tooltip, .buttons .tooltip  {
    left: 0;
}

.title + .tooltip {
    bottom: 100%;
    top: unset;
}

.title + .tooltip::after {
  content: " ";
  position: absolute;
  top: 100%;  /* At the top of the tooltip */
  bottom: unset;
  left: 50%;
  right:unset;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.title:focus::first-letter, .subtitle:focus::first-letter {
    text-transform: none;
}

.wikiglyph-titlebutton {
    display: flex;
    align-items: flex-end;
    font-size: 2.8em;
    margin-left: 0.1em;
}

.wikiglyph-subtitlebutton {
    display: flex;
    align-items: flex-end;
    font-size: 1.7em;
    margin-left: 0.1em;
}
</style>
