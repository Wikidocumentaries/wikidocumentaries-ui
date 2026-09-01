<template>
     <ToolbarMenu
        icon="wikiglyph-user-inactive"
        tooltip="Login"
        :translateItems="false"
        :items="[{id:'login', text:'Log In'}]"
        @doMenuItemAction="getCode"
    >
        <div slot="menu-title">User Profile</div>
    </ToolbarMenu>
</template>

<script>
import ToolbarMenu from '@/components/menu/ToolbarMenu'
export default {
    name: 'LoginButton',
    data(){
        return{
            CLIENT_ID : "c0860cd2f1a6e322e1b4f20597c2be7a",
            CLIENT_SECRET:"0b08788ef5274e77a8b4454422cb1866d2f6a30a"
        }
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        getCode (){
            localStorage.setItem('previouspage', window. location. href);
            let url = "https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=" + this.CLIENT_ID + "&response_type=code";
            window.location.href = url;
        },
    }
}
</script>
