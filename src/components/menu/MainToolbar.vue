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
            <a class="main-button" @click="goToLandingPage">{{ landingPageName }}</a>
            <TopicSearchBox class="topic-search-box"></TopicSearchBox>
            <UILanguageMenu class="language-menu"></UILanguageMenu>
        </div>
    </div>
</template>

<script>
import TopicSearchBox from '@/components/TopicSearchBox'
import UILanguageMenu from '@/components/menu/UILanguageMenu'

export default {
    name: 'MainToolbar',
    data () {
        return {
            landingPageName: "Wikidocumentaries",
        }
    },
    components: {
        UILanguageMenu,
        TopicSearchBox
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
    min-width: 0;
    overflow: hidden;
    flex-shrink: 1;
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
    flex-grow: 1;
}

</style>
