<template>
    <div class="icon-item" @mouseleave="hideMenu">
        <a href="#" @click.prevent="switchShowMenu" class="icon-item-a">
            <i class="wikiglyph" :class="icon"></i>
        </a>
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
    name: 'IconMenu',
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
    padding: 8px 10px;
    font-size: 1.3em;
    font-weight: bold;
}

.icon-item {
    line-height: 1;
    height: 30px;
    width: 30px;
}

.icon-item a {
    height: 100%;
    display: flex;
    align-items: center;
    transition: color 80ms ease-in, background 80ms ease-in;
    justify-content: center;
    cursor: pointer;
    box-shadow: none;
    color: white;
}

.icon-item:hover {
    background: white;
}

.icon-item:hover > a {
    color: var(--main-txt-color);
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: max-content;
    -webkit-box-shadow: var(--main-shadow);
    -moz-box-shadow: var(--main-shadow);
    box-shadow: var(--main-shadow);
    z-index: 2;
    position: absolute;
}

.dropdown-content-hide {
    display: none;
}

/* Links inside the dropdown */
.dropdown-content a {
    padding: 7px 10px;
    text-decoration: none;
    display: block;
    text-transform: none;
    font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #333;
    font-weight: 400;
    width: auto;
}

/* Links inside the dropdown + Change color of dropdown links on hover */
.dropdown-content a:hover {
    background-color: var(--main-red);
    color: white;
    box-shadow: none;
    outline: none;
}

</style>
