<template>
<a @click="getCode">Login Button</a>   
</template>

<script>
import axios from "axios";
export default {
    name: 'LoginButton',
    data(){
        return{
            server : 'https://apiclient.wiki/',
            CLIENT_ID : "c0860cd2f1a6e322e1b4f20597c2be7a",
            CLIENT_SECRET:"0b08788ef5274e77a8b4454422cb1866d2f6a30a"
        }
    },

    methods: {
        getCode (){
            console.log(111111111111);
            let url = "https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=" + this.CLIENT_ID + "&response_type=code";
            window.location.href = url;
        },
        async lgbigfatpig(){
            console.log(222222222222);
            console.log(this.$route.query);
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('scope', 'public');
            params.append('client_id', this.CLIENT_ID);
            params.append('client_secret', this.CLIENT_SECRET);
            const fetchDataRes = await axios.request({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/w/rest.php/oauth2/access_token',
                method: 'post',
                baseURL: 'https://commons.wikimedia.org',
                data: params
            });
        },
    }
}
</script>
