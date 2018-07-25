<template>
    <div class="wait-page">
        <div class="bars">
            <div class="yellow"></div>
            <div class="orange"></div>
            <div class="red"></div>
            <div class="purple"></div>
            <div class="turquoise"></div>
            <div class="green"></div>
        </div>
       {{ $t("WaitPage.waitMessage") }}
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
    height: 20px;
    display: flex;
    flex-wrap: nowrap;
}

</style>
