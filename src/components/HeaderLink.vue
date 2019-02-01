<template>
    <div class="link">
        <a :href="target" target="_blank" class="toolbar-item-a"><i :class="['wikiglyph', link ? 'wikiglyph-new-window' : 'wikiglyph-plus']"></i></a><span class="tooltip">{{ tooltip }}</span>
    </div>
</template>

<script>
export default {
    name: 'HeaderLink',
    props: {
        link: String,
        tooltip: String
    },
    data () {
        return {
        }
    },
    computed: {
        target() {
            if (this.link) {
                return this.link;
            } else {
                var language = this.$i18n.locale;
                var title = this.$store.state.wikidocumentaries.title;
                return "https://" + language + ".wikipedia.org/w/index.php?title=" + title + "&action=edit";
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
