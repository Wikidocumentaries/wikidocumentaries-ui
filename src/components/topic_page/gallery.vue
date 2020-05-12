<template>
	<div class="gallery-component">
		<div class="toolbar">
            <h1 class="header-title">{{ $t('topic_page.Gallery.headerTitle') }}</h1>
            <ToolbarMenu icon="wikiglyph-funnel" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('topic_page.Gallery.menuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="gallery">
            <!--img :src="wikidocumentaries.galleryImageURL" class="gallery-image"/-->
            <router-link tag="div" v-for="image in images" :key="image.id" :to="image.qid" class="gallery-item">
                <img :src="image.src" class="gallery-image"/>
                <div class="thumb-image-info">
                    <div class="thumb-title">{{ image.title }}</div>
                    <div class="thumb-credit">{{ image.credits }}</div>
                </div>
                <div class="thumb-image-header">
                    <div class="left-align">
                        <!--ImagesActionMenu></ImagesActionMenu-->
                    </div>
                    <div class="right-align">
                        <!--ImagesRemoveMenu></ImagesRemoveMenu-->
                    </div>
                </div>
            </router-link>
        </div>
	</div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    SHOW_BORN: 0,
    SHOW_DIED: 1,
    SHOW_BURIED: 2,
    SHOW_RELATED: 3,
    SHOW_ALL: 4
}

export default {
    name: 'Gallery',
    props: {
    },
    data () {
        return {
            toolbarActionMenuItems: [
            {
                id: MENU_ACTIONS.SHOW_BORN,
                text: 'topic_page.Gallery.showBorn'
            },
            {
                id: MENU_ACTIONS.SHOW_DIED,
                text: 'topic_page.Gallery.showDied'
            },
            {
                id: MENU_ACTIONS.SHOW_BURIED,
                text: 'topic_page.Gallery.showBuried'
            },
            {
                id: MENU_ACTIONS.SHOW_RELATED,
                text: 'topic_page.Gallery.showRelated'
            },
            {
                id: MENU_ACTIONS.SHOW_ALL,
                text: 'topic_page.Gallery.showAll'
            },
            ],
            images : [
                {
                    title: "Edith Södergran",
                    qid: "Q466595",
                    credits: "Finnish author (1898 - 1234). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edith_S%C3%B6dergran_-_14150403530.jpg/264px-Edith_S%C3%B6dergran_-_14150403530.jpg"
                },
                {
                    title: "Oskar Merikanto",
                    qid: "Q455630",
                    credits: "Finnish composer (1868 - 1928). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://www.finna.fi/Cover/Show?id=musketti.M012%3AHK19720913%3A4.21c&index=0&size=large&w=1200&h=1200"
                },
                {
                    title: "Venny Soldan",
                    qid: "Q4009687",
                    credits: "Finnish painter (1863-1945). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://upload.wikimedia.org/wikipedia/commons/5/55/Venny_Soldan-Brofeldt_painting_by_Hanna_Pauli.jpg"
                },
                {
                    title: "Edith Södergran",
                    qid: "Q466595",
                    credits: "Finnish author (1898 - 1234). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edith_S%C3%B6dergran_-_14150403530.jpg/264px-Edith_S%C3%B6dergran_-_14150403530.jpg"
                },
                {
                    title: "Oskar Merikanto",
                    qid: "Q455630",
                    credits: "Finnish composer (1868 - 1928). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://www.finna.fi/Cover/Show?id=musketti.M012%3AHK19720913%3A4.21c&index=0&size=large&w=1200&h=1200"
                },
                {
                    title: "Venny Soldan",
                    qid: "Q4009687",
                    credits: "Finnish painter (1863-1945). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://upload.wikimedia.org/wikipedia/commons/5/55/Venny_Soldan-Brofeldt_painting_by_Hanna_Pauli.jpg"
                },
                {
                    title: "Edith Södergran",
                    qid: "Q466595",
                    credits: "Finnish author (1898 - 1234). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edith_S%C3%B6dergran_-_14150403530.jpg/264px-Edith_S%C3%B6dergran_-_14150403530.jpg"
                },
                {
                    title: "Oskar Merikanto",
                    qid: "Q455630",
                    credits: "Finnish composer (1868 - 1928). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://www.finna.fi/Cover/Show?id=musketti.M012%3AHK19720913%3A4.21c&index=0&size=large&w=1200&h=1200"
                },
                {
                    title: "Venny Soldan",
                    qid: "Q4009687",
                    credits: "Finnish painter (1863-1945). Resident in xx.",
                    description: "",
                    birthyear: "",
                    deathyear: "",
                    connectproperty: "",
                    src: "https://upload.wikimedia.org/wikipedia/commons/5/55/Venny_Soldan-Brofeldt_painting_by_Hanna_Pauli.jpg"
                }
            ]
        }
    },
    components: {
        ToolbarMenu
    },
    mounted: function () {
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
    },
    watch: {
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case MENU_ACTIONS.SEARCH_TOPIC_FROM_NEWSPAPER_ARCHIVES:
                window.open('https://digi.kansalliskirjasto.fi/sanomalehti/search?query="' + encodeURIComponent(this.wikidocumentaries.title) + '"&requireAllKeywords=true&fuzzy=false&hasIllustrations=false&orderBy=RELEVANCE&pages=&formats=NEWSPAPER&searchBindings=false&page=1&set_language=' + this.$i18n.locale, '_blank');
                break;
            case MENU_ACTIONS.ADD_CLIP:
                // TODO show dialog that allows adding photo URL and saving it.
                break;
            case MENU_ACTIONS.HELP:
                break;
            }
        },
        fitTitle (title) {
            var newTitle = title;
            return newTitle;
        },
        getCredits (item) {
            var newAuthors = (item.authors != "" ? (item.authors + ', ') : '');
            var newYear = (item.year != "" ? (item.year) + ". " : '');
            var newInstitutions = (item.institutions != "" ? (item.institutions + ', ') : '');
            var newLicense = (item.license != "" ? (item.license + ', ') : '');

            var credits = newAuthors + newYear + newInstitutions + newLicense;

            if (credits.length > 0 && credits.slice(-2) == ", ") {
                credits = credits.substr(0, credits.length - 2);
            }

            return credits;
        },
        navigate(target) {
            this.$router.push({ target });
        }
    }
}
</script>

<style scoped>

.gallery {
    height: 35vh;
    display: flex;
    padding-left: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.gallery-item {
    height: 100%;
    margin-right: 10px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
}

.gallery-item *{
    opacity:1;
}

.gallery-item > img {
    height: 100%;
}

.gallery-item:hover * {
    transition: opacity 80ms ease-in;
}

.thumb-title {
    font-family: barlow condensed;
    text-transform: uppercase;
    font-size: 1.2em;
    padding-bottom: 2px;
}

</style>