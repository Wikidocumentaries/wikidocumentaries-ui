<!-- The LoginSuccess Vue.js component manages the post-login process. It is responsible for acquiring
an access token, retrieving user profile information, and redirecting the user back to the previous page.
This component also provides a loading animation, which is modified from wait-page, with a success message. -->
<template>
  <div class="wait-page">
    <div class="bars">
      <div class="yellow"></div>
      <div class="orange"></div>
      <div class="red"></div>
      <div class="purple"></div>
      <div class="turquoise"></div>
      <div class="green"></div>
    </div>
    <div class="wait">
      <div class="lds-heart">
        <div></div>
      </div>
      <div class="message">Login successful. You are being redirected back to Wikidocumentaries.</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginSuccess",
  data() {
    return {
      CLIENT_ID : "f2aa70edfeb48a0eb08614c69b9148b4",
      CLIENT_SECRET:"48830e519cfc29240c9291a7f301e437d0355958",
      profileUrl:
        "https://meta.wikimedia.org/w/rest.php/oauth2/resource/profile"
    };
  },
  methods: {
    
    async getAccessToken() {
      const code = this.$route.query.code;
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("client_id", this.CLIENT_ID);
      params.append("client_secret", this.CLIENT_SECRET);
      console.log(params);
      const fetchDataRes = await axios.request({
        url: "/w/rest.php/oauth2/access_token",
        method: "post",
        baseURL: "https://meta.wikimedia.org",
        data: params
      });
      console.log(fetchDataRes.data.access_token);
      localStorage.setItem("access_token", fetchDataRes.data.access_token);
    },
    async getUserProfile() {
      let response = await fetch(this.profileUrl, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      });
      response.json().then(c => localStorage.setItem("username", c.username));
    },
    returnToPage(){
      let url = localStorage.getItem('previouspage');
      localStorage.removeItem('previouspage');
      window.location.href = url;
    },
  },

  mounted: async function() {
    await this.getAccessToken();
    await this.getUserProfile();
    this.returnToPage();
  }
};
</script>

<style scoped>
.wait {
  padding: 20px;
  display: flex;
  align-items: center;
}

.message {
    padding-left: 20px;
}
.bars {
  flex: 1 0 100%;
  height: 18px;
  display: flex;
  flex-wrap: nowrap;
}
</style>

