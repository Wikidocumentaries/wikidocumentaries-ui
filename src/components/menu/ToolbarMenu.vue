<template>
    <div class="toolbar-item">
        <a href="#" @click.prevent="switchShowMenu" class="toolbar-item-a"><i class="wikiglyph" v-bind:class="icon"></i></a>
        <div :class="[shouldShowMenu ? showClass : hideClass]">
            <div class="menu-title">
                <slot name="menu-title"></slot>
            </div>
            <a v-for="item in items" :key="item.id" href="#" @click.prevent="doMenuItemAction(item)">{{  $t(item.text) }}</a>
            <slot name="custom-menu-item"></slot>
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
            //console.log("doMenuItemAction:", item);
            this.hideMenu();
            this.$emit('doMenuItemAction', item);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.menu-title {
    color: black;
    padding: 6px 12px;
    font-size: 0.8em;
}

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
    background-color: white;
    width: max-content;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 2;
    right: 0;
    border: 1px solid var(--main-txt-color);
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

/* Links inside the dropdown + Change color of dropdown links on hover */
.dropdown-content a:hover {
    background-color: var(--main-red);
    color: white;
    box-shadow: none;
    outline: none;
}

</style>
