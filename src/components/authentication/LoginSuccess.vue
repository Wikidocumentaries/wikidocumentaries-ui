<template>
  <div class="wait-page">
    <!--div class="wait-image"><img src="/static/svgs/testimage.svg"></div-->
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
      CLIENT_ID: "c0860cd2f1a6e322e1b4f20597c2be7a",
      CLIENT_SECRET: "0b08788ef5274e77a8b4454422cb1866d2f6a30a",
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

