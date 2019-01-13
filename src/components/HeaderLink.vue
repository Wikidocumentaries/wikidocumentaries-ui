<template>
    <div class="link">
        <a v-if="link" :href="link" target="_blank" class="toolbar-item-a"><i class="wikiglyph wikiglyph-new-window"></i></a>
        <a v-else :href="link" target="_blank" class="toolbar-item-a"><i class="wikiglyph wikiglyph-plus"></i></a>
    </div>
</template>

<script>
export default {
    name: 'HeaderLink',
    props: {
        link: String
    },
    data () {
        return {
        }
    },
    computed: {
        newTopic() {
            return {
                value: "https://fi.wikipedia.org/"
                //"https://" + language + "wikipedia.org/wiki/" + title;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
