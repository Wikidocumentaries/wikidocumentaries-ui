<!-- The Login component is implement for users to initiate the login process.
It presents a "Login" button within the toolbar menu, which, when clicked, redirects the user to the
authentication page. After successful login, the user is redirected back to the previous page. -->
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
            // This is a public app with upload and edit grant
            CLIENT_ID : "f2aa70edfeb48a0eb08614c69b9148b4",
            CLIENT_SECRET:"48830e519cfc29240c9291a7f301e437d0355958"
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
