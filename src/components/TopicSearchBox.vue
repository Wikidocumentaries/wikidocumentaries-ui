<template>
    <div class="topic-search-box">
        <form class="search-items">
            <input id="findTopicInput" autocomplete="off" @input="debounceFindTopics" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="pickResult" class="input-find" v-model="topicInputValue" type="search" :placeholder="$t('LandingPage.searchInputSearchOnly')">
            <button title="Search" @click.prevent="focusInput(e)" class="search-icon"><i class="wikiglyph wikiglyph-magnifying-glass" aria-hidden></i></button>

            <div class="search-results">
                <div :class="[shouldShowMenu ? 'dropdown-content' : 'dropdown-content-hide']">
                    <router-link v-for="(topic, i) in topics" :key="topic.localId" :class="{ 'is-active': i === arrowCounter }" :to="topic.internalLink"><span class="topic-title">{{ topic.wikipage }}</span><br><span class="topic-summary">{{ getSummary(topic) }}</span></router-link>
                    <!--a slot="menu-link" :href="showMoreLink" class="menu-link" target="_blank">{{ $t('LandingPage.showMore') }}</a-->
                    <a slot="menu-link" :href="newLink" class="menu-link" target="_blank">{{ $t('LandingPage.createNew') }}</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import debounce from 'debounce'
import jsonp from 'jsonp'


export default {
    name: 'TopicSearchBox',
    props: {
    },
    data () {
        return {
            topicInputValue: "",
            shouldShowMenu: false,
            topics: [],
            maxSummaryLengthInChars: 50,
            arrowCounter: -1
        }
    },
    created: function () {
        this.debounceFindTopics = debounce(this.findTopics, 500);
    },
    computed: {
        newLink() {
            let url="https://www.wikidata.org/w/index.php?title=Special:NewItem&label=" + this.topicInputValue + "&uselang=" + this.$i18n.locale;
            return url;
        }
    },
    methods: {
        showMenu(boolean) {
            this.shouldShowMenu = boolean;
            this.arrowCounter = -1;
        },
        getSummary(topic) {
            if (topic.summary === undefined) {
                return "";
            }
            else if (topic.summary.length > this.maxSummaryLengthInChars) {
                var summary = topic.summary;
                if (summary.indexOf(topic.wikipage) == 0) {
                    summary = summary.substr(topic.wikipage.length);
                }
                if (summary.indexOf(',') == 0) {
                    summary = summary.substr(1);
                }
                return summary;
            }
            else {
                return topic.summary;
            }
        },
        findTopics: function () {
            if (this.topicInputValue.length >= 3) {
                this.searchFromWikipedia(this.topicInputValue);
            } else {
                this.showMenu(false);
            }
        },
        focusInput: function() {
            document.querySelector("#findTopicInput").focus();
        },
        onArrowDown: function() {
            if (this.shouldShowMenu && this.arrowCounter < this.topics.length) {
                this.arrowCounter++;
            } else if (this.arrowCounter === this.topics.length -1) {
                this.arrowCounter = 0;
            }
        },
        onArrowUp: function() {
            if (this.shouldShowMenu && this.arrowCounter > 0) {
                this.arrowCounter--;
            } else if (this.arrowCounter === 0) {
                this.arrowCounter = this.topics.length -1;
            }
        },
        pickResult: function() {
            this.$router.push(this.topics[this.arrowCounter].internalLink);
        },
        searchFromWikipedia: function(topicInputValue) {
            var url = "https://" + this.$i18n.locale + ".wikipedia.org/w/api.php?action=opensearch&search=" +
                topicInputValue +
                "&limit=20&namespace=0&redirects=resolve"
                "&format=json" +
                "&callback=callback";

            var url = "https://www.wikidata.org/w/api.php?" +
                "action=wbsearchentities" +
                "&search=" + encodeURIComponent(topicInputValue) +
                "&language=" + this.$i18n.locale +
                "&uselang=" + this.$i18n.locale +
                "&format=json" +
                "&type=item";
                "&callback=callback";

            var topics = [];

            jsonp(url, null, (error, data) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        if (data.search.length > 0) {

                            var wikidataQueryURL = "https://" + this.$i18n.locale + ".wikipedia.org/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&redirects=resolve&titles=";

                            for (var i = 0; i < data.search.length; i++) {
                                var item=data.search[i];
                                var topic = {
                                    wikipage: item["label"],
                                    summary: item["description"],
                                    internalLink: "/" + item["id"] + "?language=" + this.$i18n.locale // assume that the user won't switch language after searching
                                };

                                topics.push(topic);
                                this.topics = topics;
                            }

                            this.showMenu(true);
                        } else {
                            // TODO let user know that there was no results
                        }

                    }
            });

        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.topic-search-box {
    height: 100%;
}

.search-items {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.input-find {
    padding: 10px;
    font-size: 11pt;
    border: none;
    text-align: right;
    right: 35px;
    height: 100%;
    box-sizing: border-box;
    width: 60px;
    flex-grow: 1;
}

.input-find:focus {
    font-weight: bold;
    color:#333;
    outline: none;
}

.input-find:focus::placeholder {
    visibility:hidden;
}

.search-results {
    position: relative;
}


/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    position: absolute;
    right: 0;
    top: 22px;
    background-color: #fff;
    min-width: 350px;
    max-width: 35vw;
    -webkit-box-shadow: var(--main-shadow);
    -moz-box-shadow: var(--main-shadow);
    box-shadow: var(--main-shadow);
    z-index: 50;
}

.dropdown-content-hide {
    display: none;
}

/* Links inside the dropdown */
.dropdown-content a {
    padding: 5px 10px;
    text-decoration: none;
    display: block;
    text-transform: none;
    font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.3;
    color: #333;
    transition: none;
}

/* Links inside the dropdown */
.dropdown-content a.is-active,
.dropdown-content a:hover {
    box-shadow: none;
    outline: none;
    background-color: var(--main-red);
    color: white;
}

.topic-title {
    font-weight: bold;
}

span.topic-summary {
    font-weight: initial;
}

button.search-icon {
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: color 80ms ease-in, background 80ms ease-in;
    transition: color 80ms ease-in, background 80ms ease-in;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
    width: 45px;
    color: #333;
    box-shadow: none;
    border: 0;
    background: white;
}

button.search-icon:hover {
    background: var(--main-txt-color);
    color: white;
}

</style>
