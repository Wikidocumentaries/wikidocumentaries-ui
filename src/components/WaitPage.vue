<template>
    <div class="wait-page">
        <!--div class="wait-image"><img src="/static/svgs/testimage.svg"></div-->
        <div class="bars">
            <div class="yellow"></div>
            <div class="orange"></div>
            <div class="red"></div>
            <div class="purple"></div>
            <div class="turquoise"></div>
            <div class="green"></div>
        </div>
        <div class="main-toolbar">{{ $t("WaitPage.waitMessage") }}</div>
        <div class="lds-heart"><div></div></div>
    </div>
</template>

<script>
export default {
    name: 'WaitPage',
    props: {
    },
    data () {
        return {
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bars {
    flex: 1 0 100%;
    height: 18px;
    display: flex;
    flex-wrap: nowrap;
}

</style>
