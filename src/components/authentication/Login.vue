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
            // This is a personal app with upload and edit grant
            CLIENT_ID : "2cf7f32dad89c331863c1fc3a52463b0",
            CLIENT_SECRET:"e07c0f7ac8f2ccebb725c56c93d982d6f8125b59"

            // This is a public app without upload grant
            // CLIENT_ID : "c0860cd2f1a6e322e1b4f20597c2be7a",
            // CLIENT_SECRET:"0b08788ef5274e77a8b4454422cb1866d2f6a30a"
        }
    },
    components: {
        ToolbarMenu,
    },
    methods: {
        getCode (){
            // localStorage.setItem('previouspage', window. location. href);
            // let url = "https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=" + this.CLIENT_ID + "&response_type=code";
            // window.location.href = url;
            localStorage.setItem("access_token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyY2Y3ZjMyZGFkODljMzMxODYzYzFmYzNhNTI0NjNiMCIsImp0aSI6ImMwNWQ1YzliNDAwNDU2ZTRhNmI2YzNkZWRlZWU4NjVlMWJjZTVmMzBjNmI1NWUzZjBiMTAyYzBjZGZkOTA5MTAwZDEyODBhZGZhZjhkZDMxIiwiaWF0IjoxNjg4OTQ0NzE1LjIyNzM4NSwibmJmIjoxNjg4OTQ0NzE1LjIyNzM4OCwiZXhwIjozMzI0NTg1MzUxNS4yMjI4OTMsInN1YiI6IjcyOTEzNDYyIiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyIsImVkaXRwYWdlIiwiZWRpdG15Y3NzanMiLCJlZGl0bXlvcHRpb25zIiwiZWRpdGludGVyZmFjZSIsImVkaXRzaXRlY29uZmlnIiwiY3JlYXRlZWRpdG1vdmVwYWdlIiwidXBsb2FkZmlsZSIsInVwbG9hZGVkaXRtb3ZlZmlsZSJdfQ.s0ogB5NFmdri4scCoDHupx3iSnw68_6ntaBaoqRo7L8MHE5k0zoB-LmQFcrJbF0mv2KLXHom2zjOuMIDs4vyLnYPSd4-ZOuDzKfViir6GrbQjqDqkSkfuBPDt5P-mIiLknYEnesqbontLd_u1pdOr0DBttEKBx1WSvJ_0s5v9G_uX7UfsbUxPmmmiu2IekAIA-HT8iRy94ukvtgeTrCC_rzxx2S5HEakq-OpHWgySEZH0SRLVxv5RMCNo9PYQtMDw9sREfS2YWWmZYRSkEgJaygHygDxyxKgj9yuR7HRvXs0czjTSVJ2RoL228aomjgCE7whi1tjZrZ0P9Pr6YZ4eCgPB1gy0ZVTeE2yUuyeF7D0cLZEMMroZSgBtK76zJBhLdWZ6uCgC9jBsdrNR5TWSLAzWd8YD27FZRV54mTrpI-bsGpl53Qqtu6jQDjmyyNFo5TrPfJKmlgNsRvHp7Q9I0xMXYssNUGWUqARQT-jMjms4nUD5YD-xBXPZ7lmWZfHe7tR1SMu3xQsOKqG5I2iOX1Bc7SXWAu0f3I8opwQTU1Uv9hxLoZtRqzmOXcKkynwKRroWikNfzeaeNFpJYha6ji2snDWPJ20zma-ZbVxXlxZ7kr1HSSVUWa_RzbcmJ1f-wm1izLg2SIv0C36ODjPvj4hHqB0XN81nyitx9p9DOE");
            console.log("login success")
        },
    }
}
</script>
