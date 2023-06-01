<template>
    <div>
<a @click="getCode">Login Button</a>   

</div>
</template>

<script>
export default {
    name: 'LoginButton',
    data(){
        return{
            CLIENT_ID : "c0860cd2f1a6e322e1b4f20597c2be7a",
            CLIENT_SECRET:"0b08788ef5274e77a8b4454422cb1866d2f6a30a"
        }
    },

    methods: {
        getCode (){
            let url = "https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=" + this.CLIENT_ID + "&response_type=code";
            window.location.href = url;
        },
    }
}
</script>
