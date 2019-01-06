<template>
    <div id="main-toolbar" class="main-toolbar">
        <div class="stripe">
            <div class="yellow"></div>
            <div class="orange"></div>
            <div class="red"></div>
            <div class="purple"></div>
            <div class="turquoise"></div>
            <div class="green"></div>
        </div>
        <div id="top-toolbar" class="top-toolbar">
            <div class="left-align">
                <a class="main-button" v-on:click="goToLandingPage">{{ landingPageName }}</a>
            </div>
            <div class="right-align">
                <TopicSearchBox class="topic-search-box"></TopicSearchBox>
                <LanguageMenu class="language-menu"></LanguageMenu>
            </div>
        </div>
    </div>
</template>

<script>
import TopicSearchBox from '@/components/TopicSearchBox'
import LanguageMenu from '@/components/menu/LanguageMenu'

export default {
    name: 'MainToolbar',
    data () {
        return {
            landingPageName: "Wikidocumentaries",
        }
    },
    components: {
        LanguageMenu,
        TopicSearchBox
    },
    created () {
        //console.log(window.location);
        var langParam = null;
        var langParamIndex = window.location.search.indexOf('language');
        if (langParamIndex != -1) {
            langParam = window.location.search.substr(langParamIndex + 9, 2);
        }
        //console.log/(langParam);

        var language = (langParam != null ? langParam : this.$i18n.locale);
        this.$i18n.locale = language;
    },
    methods: {
        goToLandingPage(event) {
            this.$router.push('/');
        }
    }
}

</script>

<style scoped>

.main-toolbar {
    width: 100%;
}

.stripe {
    flex: 1 0 100%;
    height: 18px;
    display: flex;
    flex-wrap: nowrap;
}

.main-button {
    font-weight: bold;
    font-size: 16pt;
    margin-left: 20px;
    color: #333;
    cursor: pointer;
}

a.main-button:hover {
    box-shadow: none;
    color: var(--main-red);
}

.top-toolbar {
    display: -ms-flexbox;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-toolbar-buttons {
     flex: 1 1 60%;
    /* align-self: flex-end; */
    -webkit-box-flex: 1;
    -ms-flex: 1 1 60%;
    -ms-flex-item-align: end;
    margin-left: 25px;
   font-size: 22px;
    font-weight: bold;
}

.topic-search-box {
    display: flex;
    flex-direction: column;
}

</style>