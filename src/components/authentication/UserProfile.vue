<!--  This Vue.js component represents a user profile element in a toolbar menu.
 It displays the user's name and provides an option to log out. -->
<template>
<div>
    <ToolbarMenu
        icon="wikiglyph-user-active"
        tooltip="Show profile"
        :translateItems="false"
        :items="[{id:'logout', text:'Log Out'}]"
        @doMenuItemAction="logOut"
    >
        <div slot="menu-title">{{name}}</div>
    </ToolbarMenu>
</div>
</template>


<script>
import ToolbarMenu from '@/components/menu/ToolbarMenu';

export default {
    name: 'UserProfile',
    data() {
        return{    name: '',};

  },
    mounted() {
    if (localStorage.username) {
      this.name = localStorage.username;
    }
  },
  components: {
        ToolbarMenu,
    },
  methods: {
        logOut (){
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            location. reload();
        },
    }
}
</script>