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
          country: "Flanders",
          qid: "Q9337",
          campaign: "wlm-be-vlg",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://be.wikimedia.org/wiki/Wiki_Loves_Monuments/2023",
        },
        {
          country: "Brussels",
          qid: "Q240",
          campaign: "wlm-be-bru",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://be.wikimedia.org/wiki/Wiki_Loves_Monuments/2023",
        },
        {
          country: "Wallonia",
          qid: "Q231",
          campaign: "wlm-be-wal",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://be.wikimedia.org/wiki/Wiki_Loves_Monuments/2023",
        },
        {
          country: "Belgium",
          qid: "Q31",
          campaign: "wlm-be",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://be.wikimedia.org/wiki/Wiki_Loves_Monuments/2023",
        },
        {
          country: "Austria",
          qid: "Q40",
          campaign: "wlm-at",
          start: "2023-07-01",
          end: "2023-10-08",
          web: "https://de.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments_2023/%C3%96sterreich",
        },
        {
          country: "Armenia",
          qid: "Q399",
          campaign: "wlm-am",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023",
        },
        {
          country: "Azerbaijan",
          qid: "Q227",
          campaign: "wlm-az",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Azerbaijan",
        },
        {
          country: "Bangladesh",
          qid: "Q902",
          campaign: "wlm-bd",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Bangladesh",
        },
        {
          country: "Bolivia",
          qid: "Q750",
          campaign: "wlm-bo",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "https://es.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments_2023/Bolivia",
        },
        {
          country: "Brazil",
          qid: "Q155",
          campaign: "wlm-br",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Wiki_Loves_Monuments_2023/Brasil/Sobre",
        },
        {
          country: "Croatia",
          qid: "Q224",
          campaign: "wlm-hr",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Croatia",
        },
        {
          country: "Ghana",
          qid: "Q117",
          campaign: "wlm-gh",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Ghana",
        },
        {
          country: "Greece",
          qid: "Q41",
          campaign: "wlm-gr",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "",
        },
        {
          country: "India",
          qid: "Q668",
          campaign: "wlm-in",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_India",
        },
        {
          country: "Iran",
          qid: "Q794",
          campaign: "wlm-ir",
          start: "",
          end: "",
          web: "",
        },
        {
          country: "Ireland",
          qid: "Q27",
          campaign: "wlm-ie",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Ireland",
        },
        {
          country: "Italy",
          qid: "Q38",
          campaign: "wlm-it",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://www.wikimedia.it/wiki-loves-monuments/photographers/",
        },
        {
          country: "Malaysia",
          qid: "Q833",
          campaign: "wlm-my",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Malaysia",
        },
        {
          country: "Malta",
          qid: "Q233",
          campaign: "wlm-mt",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Malta",
        },
        {
          country: "Moldova",
          qid: "Q217",
          campaign: "wlm-md",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://ro.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments/Moldova",
        },
        {
          country: "Nigeria",
          qid: "Q1033",
          campaign: "wlm-ng",
          start: "2023-09-15",
          end: "2023-09-15",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Nigeria",
        },
        {
          country: "Norway",
          qid: "Q20",
          campaign: "wlm-no",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://www.wikimedia.no/en/2023/08/30/cultural-heritage-2023-photo-competition",
        },
        {
          country: "Pakistan",
          qid: "Q843",
          campaign: "wlm-pk",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "",
        },
        {
          country: "Peru",
          qid: "Q419",
          campaign: "wlm-pe",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/w/index.php?title=Commons:Wiki_Loves_Monuments_2023_in_Peru&uselang=en",
        },
        {
          country: "Poland",
          qid: "Q36",
          campaign: "wlm-pl",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://wikimedia.pl/wiki-lubi-zabytki-2023-plen/",
        },
        {
          country: "Portugal",
          qid: "Q36",
          campaign: "wlm-pl",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://wikilovesmonuments.org.pt/",
        },
        {
          country: "Qatar",
          qid: "Q846",
          campaign: "wlm-qa",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "https://wikilovesmonuments.org.pt/",
        },
        {
          country: "Russia",
          qid: "Q159",
          campaign: "wlm-ru",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Russia",
        },
        {
          country: "Serbia",
          qid: "Q403",
          campaign: "wlm-rs",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Serbia",
        },
        {
          country: "Slovenia",
          qid: "Q215",
          campaign: "wlm-si",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Serbia",
        },
        {
          country: "Spain",
          qid: "Q29",
          campaign: "wlm-es",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://www.wikilm.es/en/",
        },
        {
          country: "Suriname",
          qid: "Q730",
          campaign: "wlm-sr",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Suriname",
        },
        /*{
          country: "Sweden",
          qid: "Q34",
          campaign: "wlm-sr",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Suriname",
        }, We need a mechanism to display a different campaign based on different IDs. Similar idea has been created for countryId, where a region is chosen based on the ID used. This, however, is a different function.*/
        {
          country: "Taiwan",
          qid: "Q865",
          campaign: "wlm-tw",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Taiwan",
        },
        {
          country: "Thailand",
          qid: "Q869",
          campaign: "wlm-th",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Thailand",
        },
        {
          country: "Togo",
          qid: "Q945",
          campaign: "wlm-tg",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "",
        },
        {
          country: "Uganda",
          qid: "Q1036",
          campaign: "wlm-ug",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_Uganda",
        },
        {
          country: "Ukraine",
          qid: "Q212",
          campaign: "wlm-ua",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "https://uk.wikipedia.org/wiki/%D0%92%D1%96%D0%BA%D1%96%D0%BF%D0%B5%D0%B4%D1%96%D1%8F:%D0%92%D1%96%D0%BA%D1%96_%D0%BB%D1%8E%D0%B1%D0%B8%D1%82%D1%8C_%D0%BF%D0%B0%D0%BC%27%D1%8F%D1%82%D0%BA%D0%B8/English",
        },
        /*{
          country: "United Kingdom",
          qid: "Q145",
          campaign: "",
          start: "2023-09-01",
          end: "2023-09-30",
          web: "https://www.wikilovesmonuments.org.uk/",
        },See how to decipher the different regions*/
        {
          country: "United States",
          qid: "Q30",
          campaign: "",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_the_United_States",
        },
        {
          country: "Zambia",
          qid: "Q953",
          campaign: "wlm-zm",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2023_in_the_United_States",
        },
        {
          country: "Egypt",
          qid: "Q79",
          campaign: "wlm-eg",
          start: "2023-10-01",
          end: "2023-10-31",
          web: "",
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
        if (statements[index].id == "P5008" && statements[index].values[0].id == 'Q73852346') { // on focus list of Wikimedia project Wiki Loves Monuments in India
          heritageId = true;
          break;
        } else if (statements[index].id == "P3600") { // protected heritage site in Brussels ID
          heritageId = statements[index].values[0];
          break;
        } else if (statements[index].id == "P1133") { // Classified properties and protected areas of Wallonia ID
          heritageId = statements[index].values[0];
          break;
        } else if (statements[index].id == "P1764") { // Flemish Heritage Object ID
          heritageId = statements[index].values[0]; 
          break;
        } else if (statements[index].id == "P5942") { // Protected objects Ostbelgien ID
          heritageId = statements[index].values[0];
          break;
        } else if (statements[index].id == "P2951") { // Cultural heritage database in Austria ObjektID
          heritageId = statements[index].values[0];
          break;
        } else if (statements[index].id == "P1799") { // Maltese Islands National Inventory of Cultural Property ID
          heritageId = statements[index].values[0]; 
          break;
        } else if (statements[index].id == "P3170") { // Cultural Heritage Armenia ID
          heritageId = statements[index].values[0]; 
          break;
        } else if (statements[index].id == "P1435") { // heritage designation
          heritageId = statements[index].values[0].id;
          break; 
        } else if (statements[index].id == "P2186") { // Wiki Loves Monuments ID
          heritageId = statements[index].values[0]; 
          break;
        } else if (statements[index].id == "P2817") { // appears in the heritage monument list
          heritageId = statements[index].values[0].id; 
          break;
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
          countryId = "Q240"; // Brussels
          break;
        } else if (statements[index].id == "P1133") {
          countryId = "Q231"; // Wallonia
          break;
        } else if (statements[index].id == "P1764") {
          countryId = "Q231"; // Flanders
          break;
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
        case "Q399":
        case "Q40":
          idValue = this.isHeritage;
          break;
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