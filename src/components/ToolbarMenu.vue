<template>
    <div class="toolbar-item">
        <a href="#" @click.prevent="switchShowMenu" class="toolbar-item-a"><i class="wikiglyph" v-bind:class="icon"></i></a>
        <div id="menuDropdown" :class="[shouldShowMenu ? showClass : hideClass]">
            <a v-for="item in items" :key="item.id" href="#" @click.prevent="doMenuItemAction(item)">{{ item.text }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToolbarMenu',
    props: {
        icon: String,
        items: Array
    },
    data () {
        return {
            shouldShowMenu: false,
            showClass: 'dropdown-content',
            hideClass: 'dropdown-content-hide'
        }
    },
    methods: {
        switchShowMenu () {
            this.shouldShowMenu = !(this.shouldShowMenu);
            //console.log(this.shouldShow);
        },
        showMenu() {
            this.shouldShowMenu = true;
        },
        hideMenu() {
            this.shouldShowMenu = false;
        },
        doMenuItemAction (item) {
            console.log("doMenuItemAction:", item);
            this.hideMenu();
            this.$emit('doMenuItemAction', item);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.toolbar-item {
    padding-right: 5px;
    margin-bottom: -5px;
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display:block;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 900%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0
}

.dropdown-content-hide {
    display: none;
}

/* Links inside the dropdown */
.dropdown-content a {
    padding: 6px 12px;
    text-decoration: none;
    display: block;
    text-transform: none;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #333;
    font-weight: 400;
}

/* Links inside the dropdown */
.dropdown-content a:hover {
    box-shadow: none;
    outline: none;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd}

</style>
