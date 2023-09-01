<template>
  <div v-if="isHeritage && active == true">
    <div class="banner">
      <div class="bannercontent">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f3/LUSITANA_WLM_2011_d.svg"
        />
        <div class="message">
          <span class="gallery-title" v-html="campaignText"></span>
        </div>
        <a :href="campaignLink" class="noshadow" target="_blank"
          ><div class="upload-button">{{ $t("Banner.WLMButton") }}</div></a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Banner",
  data: function () {
    return {
      participating: [
        {
          country: "India",
          qid: "Q668",
          campaign: "wlm-in",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_India",
        },
        {
          country: "Italy",
          qid: "Q38",
          campaign: "wlm-it",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Category:Wiki_Loves_Monuments_2023_in_Italy",
        },
        {
          country: "Flanders",
          qid: "Q231",
          campaign: "wlm-be-vlg",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Category:Wiki_Loves_Monuments_2023_in_Italy",
        },
      ],
    };
  },
  mounted: {},
  computed: {
    commonsCat() {
      const statements =
        this.$store.state.wikidocumentaries.wikidata.statements;
      let cat;
      for (var index in statements) {
        if (statements[index].id == "P373") {
          cat = statements[index].values[0].value;
        }
      }
      return cat;
    },
    isHeritage() {
      const statements =
        this.$store.state.wikidocumentaries.wikidata.statements;
      let heritageId;
      for (var index in statements) {
        if (statements[index].id == "P1435") {
          heritageId = statements[index].values[0].id;
        } else if (statements[index].id == "P1133") {
          heritageId = statements[index].values[0].id; // Wallonia
        } else if (statements[index].id == "P1764") {
          heritageId = statements[index].values[0].id; // Flanders
        } else if (statements[index].id == "P5942") {
          heritageId = statements[index].values[0].id;
        }
        }
      return heritageId;
    },
    countryId() {
      const statements =
        this.$store.state.wikidocumentaries.wikidata.statements;
      let countryId;
      for (var index in statements) {
        if (statements[index].id == "P3600") {
          countryID = "Q240"; // Brussels
        } else if (statements[index].id == "P1133") {
          countryID = "Q231"; // Wallonia
        } else if (statements[index].id == "P1764") {
          countryID = "Q231"; // Flanders
        } else if (statements[index].id == "P5942") {
          countryID = "Q90027";
        } else if (statements[index].id == "P17") {
          countryId = statements[index].values[0].id;
        }
      }
      return countryId;
    },
    active() {
      let currentTime = new Date();
      let active = false;
      let countries = this.participating;
      for (var index in countries) {
        if (countries[index].qid == this.countryId) {
          let startTime = new Date(countries[index].start);
          let endTime = new Date(countries[index].end);
          if (startTime < currentTime && endTime > currentTime) {
            active = true;
          }
        }
      }
      return active;
    },
    campaignId() {
      let campaignId;
      let countries = this.participating;
      for (var index in countries) {
        if (countries[index].qid == this.countryId) {
          campaignId = countries[index].campaign;
        }
      }
      return campaignId;
    },
    countryName() {
      let countryName;
      let countries = this.participating;
      for (var index in countries) {
        if (countries[index].qid == this.countryId) {
          countryName = countries[index].country;
        }
      }
      return countryName;
    },
    idValue() {
      let idValue;
      switch (this.countryId) {
        case "Q33":
        case "Q668":
          idValue = this.$store.state.wikidocumentaries.wikidataId;
          break;
        default:
          idValue = this.$store.state.wikidocumentaries.wikidataId;
      }
      return idValue;
    },
    campaignText() {
      let sourceText = this.$t("Banner.WLMText");
      let web;
      let year;
      let countries = this.participating;
      for (var index in countries) {
        if (countries[index].qid == this.countryId) {
          web = countries[index].web;
          year = countries[index].start.substring(0, 4);
        }
      }
      let wlm = this.$t("Banner.WLM").replace("$1", year);
      let link = '<a href="' + web + '" target="blank"> ' + wlm + "</a>";
      let campaignText = sourceText.replace("$2", link);
      return campaignText;
    },
    campaignLink() {
      let titleText = this.$store.state.wikidocumentaries.title
        ? this.$store.state.wikidocumentaries.title
        : "Cultural heritage monument";
      let descTxt = this.$store.state.wikidocumentaries.description
        ? " - " + this.$store.state.wikidocumentaries.description
        : "";
      let lat = this.$store.state.wikidocumentaries.wikidata.geo.lat
        ? this.$store.state.wikidocumentaries.wikidata.geo.lat
        : "";
      let lon = this.$store.state.wikidocumentaries.wikidata.geo.lon
        ? this.$store.state.wikidocumentaries.wikidata.geo.lon
        : "";
      let commonsCat = this.commonsCat
        ? encodeURIComponent(this.commonsCat)
        : "";
      let uploadCat =
        "Images uploaded to WLM 2023 " +
        this.countryName +
        " from Wikidocumentaries";
      let categories = [uploadCat, commonsCat];
      categories = categories.join("|");
      let campaignLink =
        "https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=" +
        this.campaignId +
        "&id=" +
        this.idValue +
        "&descriptionlang=" +
        this.$i18n.locale +
        "&uselang=" +
        this.$i18n.locale +
        "&description=" +
        encodeURIComponent(titleText) +
        encodeURIComponent(descTxt) +
        "&lat=" +
        lat +
        "&lon=" +
        lon +
        "&categories=" +
        categories;
      return campaignLink;
    },
  },
};
</script>
<style scoped>
.banner {
  display: flex;
  justify-content: center;
  box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2);
}

.bannercontent {
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  width: 900px;
  height: 107px;
  align-items: center;
}

.banner img {
  height: 100%;
}

.message {
  padding: 10px 2em;
  text-align: center;
}

@media only screen and (max-width: 700px) {
  .message {
    padding: 10px;
    font-size: 0.6em;
  }
}

.upload-button {
  padding: 10px 15px;
  background-color: var(--main-red);
  color: white;
  font-weight: 600;
  border-radius: 3px;
  white-space: nowrap;
}

a:hover .upload-button {
  background-color: var(--main-orange);
}
.noshadow {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>