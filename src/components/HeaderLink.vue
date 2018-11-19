<template>
    <div class="link">
        <a v-if="link" v-bind:href="link" target="_blank"><i class="wikiglyph wikiglyph-new-window"></i></a>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
    padding-right: 10px;
    padding-top: 5px;
}

</style>
