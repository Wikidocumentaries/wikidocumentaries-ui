<!-- The Login component is for users to initiate the login process.
It presents a "Login" button within the toolbar menu, which, when clicked, redirects the user to the
authentication page. After successful login, the user is redirected back to the previous page. -->
<template>
     <ToolbarMenu
        icon="wikiglyph-user-inactive"
        :tooltip="$t('login.loginMenu.tooltip')"
        :translateItems="false"
        :items="[{id:'login', text:itemtext}]"
        @doMenuItemAction="getCode"
    >
        <div slot="menu-title">{{ $t('login.loginMenu.title') }}</div>
    </ToolbarMenu>
</template>

<script>
import pkceChallenge from "@/pkce-challenge";

import ToolbarMenu from '@/components/menu/ToolbarMenu'
export default {
    name: 'LoginButton',
    data(){
        return{
            // This is a public app with upload and edit grant
            CLIENT_ID : process.env.OAUTH_CLIENT_ID || "f2aa70edfeb48a0eb08614c69b9148b4",
            itemtext: this.$t('login.loginMenu.item')
        }
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        async getCode() {
            localStorage.setItem('previouspage', window.location.href);

            const challenge = await pkceChallenge();
            localStorage.setItem('codeVerifier', challenge.code_verifier);

            const params = new URLSearchParams();
            params.append("client_id", this.CLIENT_ID);
            params.append("response_type", "code");
            params.append("code_challenge", challenge.code_challenge);
            params.append("code_challenge_method", "S256");

            // Redirect the browser to the OAuth 2 login page
            const url = "https://meta.wikimedia.org/w/rest.php/oauth2/authorize?" + params;
            window.location.href = url;
        },
    }
}
</script>
