<template>
<div v-if="showModal" class="popup" >
    <div class="popup-inner">
        <slot></slot>
        <button class="popup-close" @click.prevent="hide">
        Close
        </button>
    </div>

</div>
</template>
<script>
export default{
    name: 'PopUp',  data() {
    return {
      showModal: false,}},
    methods: {
        show(){
            this.showModal = true;
        },
        hide() {
      this.showModal = false;
    },

    }
}
</script>
<style scoped>
.popup{
    position: fixed;
    top: 0;
    left:0;
    right:0;
    bottom:0;
    z-index:99;
    background: rgba(0,0,0,0.5);
    display:flex;
    align-items: center;
    justify-content: center;


}
.popup-inner{
    background: #FFF;
    padding:32px;
    }

</style>