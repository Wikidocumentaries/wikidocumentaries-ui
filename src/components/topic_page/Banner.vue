<template>
<div v-if="(isHeritage && active == true)">
  <div class="banner">
      <div class="bannercontent"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/LUSITANA_WLM_2011_d.svg">
      <div class="message"><span class="gallery-title">Photograph this cultural heritage site and participate in the <a href='https://www.wikilovesmonuments.org/'>Wiki Loves Monuments 2020</a> photography competition!</span></div>
      <a :href="campaignLink" class="noshadow"><div class="upload-button">Upload image</div></a>
      </div>
  </div>
</div>
</template>
<script>
export default {
    name: 'Banner',
    data: function() {
        return {
        participating: [
/*     {
        "country": "Algeria",
        "qid": "Q262",
        "campaign": "wlm-dz",
        "start": "2020-10-01",
        "end": "2020-10-31"
    },
    {
        "country": "Armenia",
        "qid": "Q399",
        "campaign": "wlm-am",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Aruba",
        "qid": "Q21203",
        "campaign": "wlm-aw",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Austria",
        "qid": "Q40",
        "campaign": "wlm-at",
        "start": "2020-09-01",
        "end": "2020-10-04"
    },
    {
        "country": "Azerbaijan",
        "qid": "Q227",
        "campaign": "wlm-az",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Bangladesh",
        "qid": "Q902",
        "campaign": "wlm-bd",
        "start": "2020-11-01",
        "end": "2020-11-30"
    },
    {
        "country": "Benin",
        "qid": "Q962",
        "campaign": "wlm-bj",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Croatia",
        "qid": "Q224",
        "campaign": "wlm-hr",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Egypt",
        "qid": "Q79",
        "campaign": "wlm-eg",
        "start": "2020-10-01",
        "end": "2020-10-31"
    }, */
    {
        "country": "Finland",
        "qid": "Q33",
        "campaign": "wlm-fi-rephotography-wikidata",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
/*     {
        "country": "France",
        "qid": "Q142",
        "campaign": "wlm-fr",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Georgia",
        "qid": "Q4962",
        "campaign": "wlm-ge",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Guinea",
        "qid": "Q1006",
        "campaign": "wlm-gn",
        "start": "2020-10-01",
        "end": "2020-10-31"
    }, */
    {
        "country": "India",
        "qid": "Q668",
        "campaign": "wlm-in",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
/*     {
        "country": "Iraq",
        "qid": "Q796",
        "campaign": "wlm-iq",
        "start": "2020-10-01",
        "end": "2020-10-31"
    },
    {
        "country": "Ireland",
        "qid": "Q22890",
        "campaign": "wlm-ie",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Malaysia",
        "qid": "Q833",
        "campaign": "wlm-np",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Nepal",
        "qid": "Q837",
        "campaign": "wlm-np",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Norway",
        "qid": "Q20",
        "campaign": "wlm-no",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Peru",
        "qid": "Q419",
        "campaign": "wlm-pe",
        "start": "2020-10-01",
        "end": "2020-10-31"
    },
    {
        "country": "Philippines",
        "qid": "Q928",
        "campaign": "wlm-ph",
        "start": "2020-10-01",
        "end": "2020-10-31"
    },
    {
        "country": "Poland",
        "qid": "Q36",
        "campaign": "wlm-pl",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Romania",
        "qid": "Q218",
        "campaign": "wlm-ro",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Russia",
        "qid": "Q159",
        "campaign": "wlm-ru",
        "start": "2020-10-01",
        "end": "2020-10-31"
    },
    {
        "country": "Spain",
        "qid": "Q29",
        "campaign": "wlm-es",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Sweden",
        "qid": "Q34",
        "campaign": {
            "bbr": "wlm-bbr",
            "fmi": "wlm-fmi",
            "ship": "wlm-ship",
            "arbetsl": "wlm-arbetsl"
        },
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Thailand",
        "qid": "Q869",
        "campaign": "wlm-th",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Taiwan",
        "qid": "Q865",
        "campaign": "wlm-tw",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "Ukraine",
        "qid": "Q212",
        "campaign": "wlm-ua",
        "start": "2020-09-01",
        "end": "2020-09-30"
    },
    {
        "country": "UnitedStates",
        "qid": "Q30",
        "campaign": "wlm-us",
        "start": "2020-10-01",
        "end": "2020-10-31"
    } */
]
    }
    },
    mounted: {
    },
    computed: {
        commonsCat() {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let cat;
            for (var index in statements) {
                if (statements[index].id == 'P373') {
                    cat = statements[index].values[0].value;
                }
            }
            return cat;
        },
        isHeritage() {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let heritageId;
            for (var index in statements) {
                if (statements[index].id == 'P1435') {
                    heritageId = statements[index].values[0].id;
                }
            }
            return heritageId;
        },
        countryId() {
            const statements = this.$store.state.wikidocumentaries.wikidata.statements;
            let countryId;
            for (var index in statements) {
                if (statements[index].id == 'P17') {
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
        campaignLink() {
            let titleText = this.$store.state.wikidocumentaries.title ? this.$store.state.wikidocumentaries.title : "Cultural heritage monument";
            let descTxt = this.$store.state.wikidocumentaries.description ? " - " +
            this.$store.state.wikidocumentaries.description : "";
            let lat = this.$store.state.wikidocumentaries.wikidata.geo.lat ? this.$store.state.wikidocumentaries.wikidata.geo.lat : "";
            let lon = this.$store.state.wikidocumentaries.wikidata.geo.lon ? this.$store.state.wikidocumentaries.wikidata.geo.lon : "";
            let commonsCat = this.commonsCat ? encodeURIComponent(this.commonsCat) : "";
            let campaignLink = 
            "https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=" +
            this.campaignId +
            "&id=" + 
            this.$store.state.wikidocumentaries.wikidataId + 
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
            commonsCat;
            return campaignLink;
        }
    },
}
    
</script>
<style scoped>
.banner {
    display: flex;
    justify-content: center;
    box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2);
}

.bannercontent {
    display:flex;
    justify-content:center;
    padding: 20px;
    box-sizing: border-box;
    width: 900px;
    height: 107px;
    align-items:center;
}

.banner img {
    height:100%;
}

.message {
    padding: 10px 2em;
    text-align: center;
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
.noshadow  {
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
}

</style>