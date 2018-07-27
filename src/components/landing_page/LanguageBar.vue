<template>
        <div class="language-bar">
            <div class="flag">
                <a href="#" @click.prevent="setLanguage('en')"><span class="flag-icon flag-icon-gb"></span></a>
            </div>
            <div class="flag">
                <a href="#" @click.prevent="setLanguage('fi')"><span class="flag-icon flag-icon-fi"></span></a>
            </div>
            <div class="flag">
                <a href="#" @click.prevent="setLanguage('sv')"><span class="flag-icon flag-icon-se"></span></a>
            </div>
        </div>
</template>

<script>
export default {
    name: 'LanguageBar',
    props: {
    },
    data () {
        return {
        }
    },
    methods: {
        setLanguage(language) {
            this.$i18n.locale = language;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.language-bar {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.flag {
    flex: 1 1 50%;
    width: 50px;
    text-align: center;
    font-size: 20pt;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.3);
}

</style>
