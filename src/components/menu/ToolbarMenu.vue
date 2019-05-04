<template>
    <div class="toolbar-item" @mouseleave="hideMenu">
        <a href="#" @click.prevent="switchShowMenu" class="toolbar-item-a"><i class="wikiglyph" :class="icon"></i></a><span class="tooltip">{{ tooltip }}</span>
        <div :class="[shouldShowMenu ? showClass : hideClass]">
            <div class="menu-title">
                <slot name="menu-title"></slot>
            </div>
            <div class="options">
                <a v-for="item in items" :key="item.id" href="#" @click.prevent="doMenuItemAction(item)">
                    {{ translateItems ? $t(item.text) : item.text }}
                </a>
            </div>
            <slot name="menu-link"></slot>
            <slot name="custom-menu-item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToolbarMenu',
    props: {
        icon: String,
        items: Array,
        tooltip: String,
        translateItems: {
            default: true
        },
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
    padding: 6px 10px;
    font-size: 1.3em;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    width: max-content;
    -webkit-box-shadow: var(--main-shadow);
    -moz-box-shadow: var(--main-shadow);
    box-shadow: var(--main-shadow);
    z-index: 2;
    right: 0;
}

.dropdown-content-hide {
    display: none;
}

/* Links inside the dropdown */
.dropdown-content a {
    padding: 6px 10px;
    text-decoration: none;
    display: block;
    text-transform: none;
    font-family:  'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    line-height: 1.5;
    color: #333;
    width: auto;
    height: auto;
}

/* Links inside the dropdown + Change color of dropdown links on hover */
.dropdown-content a:hover {
    background-color: var(--main-red);
    color: white;
    box-shadow: none;
    outline: none;
}

.options {
    max-height: 198px;
    overflow-y: scroll;
}

</style>
