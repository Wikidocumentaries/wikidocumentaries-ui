
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jsonp from 'jsonp'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const wikidocumentaries = {
    title: 'Vapaamuurarin hauta',
    headerImageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Helsinki_Kaisaniemi_Freemason%27s_grave_1908_I_K_Inha.png',
    wikipedia: {
        html: '<p><strong>Vapaamuurarin hauta</strong> on <a href="https://fi.wikipedia.org/wiki/Helsinki" title="Helsinki">Helsingin</a> <a href="https://fi.wikipedia.org/wiki/Kaisaniemen_puisto" title="Kaisaniemen puisto">Kaisaniemen puistossa</a> sijaitseva yksinäinen nimetön hautakivi, joka on peräisin 1700-luvun lopulta. Hauta sijaitsee nykyisen Kaisaniemen urheilukentän koilliskulman tuntumassa <a href="https://fi.wikipedia.org/wiki/Helsingin_yliopiston_kasvitieteellinen_puutarha" title="Helsingin yliopiston kasvitieteellinen puutarha">Kasvitieteellisen puutarhan</a> ympärysaidan vieressä.</p><p>Hautakivessä ei ole vainajan nimeä vaan salaperäinen kirjoitus: &quot;Lika godt / om verlden vet hvem här hvilar / alt nog / Gud käńer hvad Han gjort / och / Uſlingen välſignar / HANS minne&quot;. (&quot;Yhdentekevää, tietääkö maailma, kuka tässä lepää. Joka tapauksessa Jumala tuntee hänen tekonsa ja kurja siunaa hänen muistoaan.&quot;)<a href="https://fi.wikipedia.org/wiki/Vapaamuurarin_hauta#cite_note-1">[1]</a> Vapaamuurarin hauta on Helsingin vanhin julkinen muistomerkki.</p><p>Haudassa lepää majuri <a href="https://fi.wikipedia.org/wiki/Fredrik_Granatenhjelm" title="Fredrik Granatenhjelm">Fredrik Granatenhjelm</a> (1708–1784), joka oli toivonut saada tulla haudatuksi juuri tälle paikalle, koska siinä hänen oli tapana levätä päiväkävelyllään silloisessa Edbomin puutarhassa. Granatenhjelmin on oletettu kuuluneen <a href="https://fi.wikipedia.org/wiki/Vapaamuurarit" title="Vapaamuurarit">vapaamuurareihin</a> ja osallistuneen järjestön hyväntekeväisyystoimintaan,<a href="https://fi.wikipedia.org/wiki/Vapaamuurarin_hauta#cite_note-2">[2]</a> mutta mahdollisesti hän ei eläessään kuulunut mihinkään seuraan, vaikka kuoltuaan saikin arvostusta monessa. <a href="https://fi.wikipedia.org/wiki/Valhalla-seura" title="Valhalla-seura">Valhalla-seuran</a> jäsenet kantoivat hänen arkkunsa hautaan ja olivat olleet aloitteentekijöinä, että kuningas <a href="https://fi.wikipedia.org/wiki/Kustaa_III" title="Kustaa III">Kustaa III</a> oli Parolan joukkojentarkastuksensa yhteydessä antanut erivapauden haudata Granatenhjelm hautausmaan ulkopuolelle; ja myös Valhalla-seura postuumisti korotti Granatenhjelmin kunniajäsenekseen. Muistomerkin pystytti eversti Lars <a href="https://fi.wikipedia.org/wiki/J%C3%A4gerhorn_af_Storby" title="Jägerhorn af Storby">Jägerhorn af Storby</a>, kun toiveet patsaan pystyttämisestä olivat hiipuneet. Hautaa ympäröi takorautainen aita, jossa on vapaamuurarien ja Granatenhjelmin aselajin, <a href="https://fi.wikipedia.org/wiki/Tykist%C3%B6" title="Tykistö">tykistön</a>, tunnukset.</p>',
        wikipediaURL: 'https://fi.wikipedia.org/wiki/Vapaamuurarin_hauta'
    },
    wikidata: {
        id: 'Q5501061',
        instance_of: {
            value: 'muistomerkki',
            url: 'https://www.wikidata.org/wiki/Q5003624'
        },
        statements: [
            {
                id: 'P361',
                label: 'osa kohdetta',
                value: 'Kaisaniemen puisto ja kasvitieteellinen puutarha',
                url: 'https://www.wikidata.org/wiki/Q30506322'
            },
            {
                id: 'P18',
                label: 'kuva',
                value: "Kaisaniemi Freemason's-Grave.JPG",
                url: 'https://commons.wikimedia.org/wiki/File:Kaisaniemi_Freemason%27s-Grave.JPG'
            },
            {
                id: 'P17',
                label: 'maa',
                value: "Suomi",
                url: "https://www.wikidata.org/wiki/Q33"
            },
            {
                id: 'P131',
                label: 'sijaitsee hallinnollisessa yksikössä',
                value: "Kluuvi",
                url: "https://www.wikidata.org/wiki/Q1393571"
            },
            {
                id: 'P276',
                label: 'sijainti',
                value: 'Kaisaniemen puisto',
                url: 'https://www.wikidata.org/wiki/Q3062877'
            },
            {
                id: 'P625',
                label: 'koordinaatit',
                value: '60.175556, 24.944028',
                url: 'https://tools.wmflabs.org/geohack/geohack.php?params=60.17555556_N_24.94402778_E_globe:earth&language=en'
            },
            {
                id: 'P373',
                label: 'Commons-luokka',
                value: "Freemason's Tomb (Helsinki)",
                url: "https://commons.wikimedia.org/wiki/Category:Freemason's%20Tomb%20(Helsinki)"
            },
        ]
    },
    images: [
        {
            id: 'musketti.M012:HK19670603:7117',
            source: 'finna',
            imageURL: "https://www.finna.fi/Cover/Show?id=musketti.M012:HK19670603:7117&index=0&size=large",
            title: "Vapaamuurarin hauta Kaisaniemessä",
            authors: "Pietinen",
            institutions: "Museovirasto",
            infoURL: "https://www.finna.fi/Record/musketti.M012:HK19670603:7117",
            location: "Helsinki,",
            geoLocations: ["POLYGON((24.7828131 60.0999549, 24.8356577 60.130414, 24.8513844 60.2249765, 24.8419098 60.2212043, 24.8347825 60.2585099, 24.8677628 60.2523073, 24.9473908 60.2784652, 24.9731653 60.2643801, 25.0209862 60.2893227, 25.0882105 60.2713417, 25.0823359 60.2496391, 25.1358461 60.2372286, 25.1598757 60.2488133, 25.1425242 60.2697779, 25.2545116 60.2952274, 25.2509121 60.2734979, 25.2273451 60.2611057, 25.240926 60.246305, 25.2014099 60.2181613, 25.2204176 60.1997262, 25.1800446 60.0987408, 25.1693516 59.9434386, 24.9423061 59.922486, 24.7828131 60.0999549))"],
            year: "1932",
            license: "CC BY 4.0"
        },
        {
            id: 'hkm.HKMS000005:km003ca4',
            source: 'finna',
            imageURL: "https://www.finna.fi/Cover/Show?id=hkm.HKMS000005:km003ca4&index=0&size=large",
            title: "Vapaamuurari, majuri Fredrik W. Granatenhjelmin hauta",
            authors: "Sundström Hugo",
            institutions: "Helsingin kaupunginmuseo",
            infoURL: "https://www.finna.fi/Record/hkm.HKMS000005:km003ca4",
            location: "Helsinki",
            geoLocations: ["ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"],
            year: "1908",
            license: "CC-BY 4.0"
        },
        {
            id: "File:Kaisaniemi Freemason's-Grave.JPG",
            source: 'Wikimedia Commons',
            imageURL: "https://upload.wikimedia.org/wikipedia/commons/5/53/Kaisaniemi_Freemason%27s-Grave.JPG",
            title: "Freemason's Grave at Kaisaniemi, Helsinki",
            authors: "KLS",
            institutions: "",
            infoURL: "https://commons.wikimedia.org/wiki/File:Kaisaniemi_Freemason%27s-Grave.JPG",
            location: "",
            geoLocations: [],
            year: "2008",
            license: "public domain"
        },
        {
            id: "File:Freemason's Tomb - Helsinki - DSC03444.JPG",
            source: 'Wikimedia Commons',
            imageURL: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Freemason%27s_Tomb_-_Helsinki_-_DSC03444.JPG",
            title: "Freemason's Tomb (Vapaamuurarin hauta),  the grave of major Fredrik Granatenhjelm (1708-84) of the Finnish artillery brigade. Dedicated in 1785. Inscription: \"Lika Godt om verlden vet hvem här vilar alt nog Gud käner hvad han gjort och uslingen välsingar hans minne\" (It means nothing if the world is ignorant of who sleeps here. God knows his deeds and the wretched bless his memory). Reference: http://www.taidemuseo.fi/english/veisto/veistossivu.html?id=291#",
            authors: "Daderot",
            institutions: "",
            infoURL: "https://commons.wikimedia.org/wiki/File:Freemason%27s_Tomb_-_Helsinki_-_DSC03444.JPG",
            location: "",
            geoLocations: [],
            year: "2012",
            license: "CC0"
        },
        {
            id: "4893739034",
            source: 'flickr',
            imageURL: "https://farm5.staticflickr.com/4119/4893739034_a33f1deaae.jpg",
            title: "Masonic memorial",
            authors: "Bushman.K",
            institutions: "",
            infoURL: "https://www.flickr.com/photos/bushman_k/4893739034/",
            location: "Helsinki",
            geoLocations: ["POINT(24.944050 60.175875)"],
            year: "2010",
            license: "CC-BY-NC-ND 2.0"
        },
    ],
    geo: {
        location: "POINT(24.943752 60.176013)",
        admin: "Helsinki"
    }
}


export default new Vuex.Store({
    state: {
        wikidocumentaries: wikidocumentaries,
        shownImages: [],
        historicalMapSearchPageMap: null,
        historicalMaps: []
    },
    mutations: {
        setImagesShownOnMap(state, images) {
            state.shownImages = images;
        },
        setHistoricalMapSearchPageMap(state, map) {
            state.historicalMapSearchPageMap = map;
        },
        setHistoricalMaps(state, maps) {
            state.historicalMaps = maps;
        }
    },
    actions: {
        async getHistoricalMaps({dispatch, commit}, locationParams) {
            //commit('setHistoricalMaps', maps);
            commit('setHistoricalMaps',
                await dispatch('getHistoricalMapsFromFinna', {
                    locationParams: locationParams,
                    maps: []
                })
                .then((maps) => dispatch('getHistoricalMapsFromCommons', {
                    locationParams: locationParams,
                    maps: maps
                })));
        },
        async getHistoricalMapsFromCommons(context, params) {
            return new Promise((resolve, reject) => {

                console.log(params);

                //resolve(params.maps);

                var category = "";
                switch (params.locationParams.municipality) {
                    case "Helsinki":
                        category = "Old_maps_of_Helsinki";
                        break;
                    case "Forssa":
                        category = "Old_maps_of_Forssa";
                        break;
                    case "Hämeenlinna":
                        category = "Old_maps_of_Hämeenlinna";
                        break;
                    case "Kemi":
                        category = "Old_maps_of_Kemi";
                        break;
                    case "Loimaa":
                        category = "Old_maps_of_Loimaa";
                        break;
                    case "Lohja":
                        category = "Old_maps_of_Lohja";
                        break;
                    case "Salo":
                        category = "Old_maps_of_Salo";
                        break;
                    case "Oulu":
                        category = "Old_maps_of_Oulu";
                        break;
                    case "Somero":
                        category = "Old_maps_of_Somero";
                        break;
                    case "Turku":
                        category = "Old_maps_of_Turku";
                        break;
                    default:
                        category = "Old_maps_of_cities_in_Finland";
                }

                var url = "https://commons.wikimedia.org/w/api.php?action=query" +
                    "&list=categorymembers&cmtype=file&cmtitle=Category:" + category +
                    "&format=json" +
                    "&callback=callback";

                jsonp(url, null, (error, data) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        console.log(data);

                        var tasks = [];

                        for (var i = 0; i < data.query.categorymembers.length; i++) {
                            var fileName = data.query.categorymembers[i].title;

                            var task = createGetCommonsMapInfoTask(fileName);
                            tasks.push(task);
                        }

                        Promise.all(tasks).then(allInfo => {
                            console.log(allInfo);

                            var maps = params.maps;

                            for (var i = 0; i < allInfo.length; i++) {
                                var info = Object.values(allInfo[i].query.pages)[0];
                                console.log(info);

                                var imageURL = info.imageinfo[0].url;
                                var parts = imageURL.split('.');
                                var imageExtension = parts[parts.length - 1].toLowerCase();
                                if (imageExtension == 'bmp' || imageExtension == 'jpg' || imageExtension == 'jpeg' || imageExtension == 'png' || imageExtension == 'gif') {
                                    // nothing to do
                                }
                                else {
                                    imageURL = "/static/pngs/map_placeholder.png";
                                }

                                var map = {
                                    id: info.pageid,
                                    title: info.title,
                                    geoLocations: [],
                                    images: [info.imageinfo[0].url],
                                    imageURL: imageURL,
                                    year: (info.imageinfo[0].extmetadata.DateTimeOriginal != undefined ? info.imageinfo[0].extmetadata.DateTimeOriginal.value : undefined),
                                    publisher: (info.imageinfo[0].extmetadata.Credit != undefined ? info.imageinfo[0].extmetadata.Credit.value.replace(/<\/?[^>]+(>|$)/g, "") : undefined),
                                    authors: (info.imageinfo[0].extmetadata.Artist != undefined ? info.imageinfo[0].extmetadata.Artist.value.replace(/<\/?[^>]+(>|$)/g, "") : undefined),
                                    institutions: (info.imageinfo[0].extmetadata.Credit != undefined ? info.imageinfo[0].extmetadata.Credit.value.replace(/<\/?[^>]+(>|$)/g, "") : undefined),
                                    license: (info.imageinfo[0].extmetadata.LicenseShortName != undefined ? info.imageinfo[0].extmetadata.LicenseShortName.value : undefined),
                                    summary: (info.imageinfo[0].extmetadata.ImageDescription != undefined ? info.imageinfo[0].extmetadata.ImageDescription.value : undefined),
                                    source: "commons",
                                    infoURL: info.imageinfo[0].descriptionurl
                                }
                                maps.push(map);
                            }
                        
                            context.commit('setHistoricalMaps', maps);
                            resolve(maps);
                        });
                    }
                });
            });
        },
        async getHistoricalMapsFromFinna(context, params) {
            return new Promise((resolve, reject) => {

                //resolve(params.maps);
                //return;

                var requestConfig = {
                    baseURL: "https://api.finna.fi/",
                    url: "/v1/search",
                    method: "get",
                    params: {
                        limit: 50,
                        type: "AllFields",
                        "filter[0]": '~format:"0/Map/"',
                        "filter[1]": 'online_boolean:"1"',
                        "filter[2]": '{!bbox sfield=location_geo pt=' +
                        params.locationParams.centerLon + ',' + params.locationParams.centerLat + ' d=' + params.locationParams.distance + '}',
                        "filter[2]": '~geographic_facet:"' + params.locationParams.municipality + '"',
                        "field[0]": 'id',
                        "field[1]": 'title',
                        "field[2]": 'geoLocations',
                        "field[3]": 'images',
                        "field[4]": 'year',
                        "field[5]": 'publisher',
                        "field[6]": 'authors',
                        "field[7]": 'institutions',
                        "field[8]": 'events',
                        "field[9]": 'imageRights',
                        "field[10]": 'summary',
                        "field[11]": 'onlineUrls',
                        "field[12]": 'nonPresenterAuthors',
                    }
                };
                axios.request(requestConfig).
                    then(function (response) {
                        console.log(response);

                        var maps = params.maps;

                        if (response.data.resultCount > 0) {
                            for (var i = 0; i < response.data.records.length; i++) {
                                var record = response.data.records[i];
                                if (record.images != undefined && record.images.length > 0) {
                                    var images = [];
                                    for (var j = 0; j < record.images.length; j++) {
                                        images.push("https://api.finna.fi" + record.images[j]);
                                    }

                                    var authors = "";
                                    if (record.authors != undefined) {
                                        for (var author in record.authors) {
                                            if (record.hasOwnProperty(author)) {
                                                for (var key in author) {
                                                    if (author.hasOwnProperty(key)) {
                                                        authors += key + ", ";
                                                    }
                                                }
                                            }
                                        }
                                        authors = authors.slice(0, -2);
                                    }

                                    var institutions = "";
                                    if (record.institutions != undefined) {
                                        for (var j = 0; j < record.institutions.length; j++) {
                                            institutions += record.institutions[j].translated + ', ';
                                        }

                                        institutions = institutions.slice(0, -2);
                                    }

                                    var map = {
                                        id: record.id,
                                        title: record.title,
                                        //geoLocations: record.geoLocations,
                                        images: images,
                                        imageURL: images[0],
                                        year: record.year,
                                        publisher: record.publisher,
                                        authors: authors,
                                        institutions: institutions,
                                        events: record.events,
                                        imageRights: record.imageRights,
                                        license: record.imageRights.copyright,
                                        summary: record.summary,
                                        source: "finna",
                                        infoURL: "https://www.finna.fi/Record/" + record.id
                                    }

                                    maps.push(map);
                                }
                                else { // Handle Doria Fennica maps differently
                                    if (record.onlineUrls != undefined &&
                                        record.onlineUrls[0].source != undefined && 
                                        record.onlineUrls[0].source.value != undefined &&
                                        record.onlineUrls[0].source.value == "fennica" &&
                                        record.onlineUrls[0].url != undefined
                                    ) {
                                        var images = [];
                                        images.push("/static/pngs/map_placeholder.png");
                                        //images.push("/static/wikifont/svgs/uniE032 - map.svg");

                                        var authors = "";
                                        if (record.nonPresenterAuthors != undefined && record.nonPresenterAuthors[0].name != undefined) {
                                            authors = record.nonPresenterAuthors[0].name
                                        }

                                        var institutions = "";
                                        if (record.institutions != undefined) {
                                            for (var j = 0; j < record.institutions.length; j++) {
                                                institutions += record.institutions[j].translated + ', ';
                                            }

                                            institutions = institutions.slice(0, -2);
                                        }

                                        var map = {
                                            id: record.id,
                                            title: record.title,
                                            year: record.year,
                                            authors: authors,
                                            institutions: institutions,
                                            infoURL: record.onlineUrls[0].url,
                                            images: images,
                                            imageURL: images[0],
                                            source: "finna_fennica",
                                            license: "Ks. lähde"
                                        }
        
                                        maps.push(map);
                                    }
                                }
                            }
                        }

                        context.commit('setHistoricalMaps', maps);
                        resolve(maps);
                    })
                    .catch(function (error) {
                        console.log(error);

                        reject(error);

                    });
            });
        }
    }
});

function createGetCommonsMapInfoTask(fileName) {
    return new Promise((resolve, reject) => {
                                
        var url = "https://commons.wikimedia.org/w/api.php?action=query" +
            "&titles=" + fileName +
            "&prop=imageinfo&iiprop=user|url|extmetadata" +
            "&format=json" +
            "&callback=callback";

        jsonp(url, null, (error, data) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
}


/*
        async getPhotosFromCommons(context, params) {
            return new Promise((resolve, reject) => {

                console.log(params);

                //resolve(params.maps);

                var url = "https://commons.wikimedia.org/w/api.php?action=query";
                url += "&list=geosearch";
                url += "&gsnamespace=6";
                url += "&gsbbox=" +
                    params.locationParams.topRightLat + "|" +
                    params.locationParams.bottomLeftLon + "|" +
                    params.locationParams.bottomLeftLat + "|" +
                    params.locationParams.topRightLon;
                url += "&gslimit=" + 10;
                url += "&format=json";
                url += "&callback=callback";

                jsonp(url, null, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(data);
                        resolve(params.maps);
                    }
                });
            });
        },
        */