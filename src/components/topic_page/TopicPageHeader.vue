<template>
    <div :class="( wikidocumentaries.headerImageURL ? 'header' : 'header-compact')">
        <img :src="coatOfArms" class="header-coa" />
        <img :src="wikidocumentaries.headerImageURL" class="header-image" :class="( isHumanTopic ? 'header-human' : 'header-nonhuman')"/>
        <!--<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Kaisaniemi_Freemason%27s-Grave.JPG" class="header-image"/> -->
        <div class="header-contents">
        <div id="shade" :class="(wikidocumentaries.headerImageURL ? 'bottomshade' : 'noshade')">
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
        },
        coatOfArms () {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements
            let coaid;
            for (var index in statements) {
                if (statements[index].id == 'P94') {
                    coaid = statements[index].values[0].value;
                    return "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"+coaid;
                }
            }
        }
    //     compactHeight() {
    //         return 'height:' + this.$refs.shade.clientHeight;
    //         console.log('height:' + this.$refs.shade.clientHeight);
    //   }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
    position:relative;
    background: var(--main-modal-color);
    height: 60vh;
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
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0) 100%);
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
    position:relative;
    color: #fff;
    margin: 0 20px;
    bottom: 20px;
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
