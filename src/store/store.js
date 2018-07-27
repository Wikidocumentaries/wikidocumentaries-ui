
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jsonp from 'jsonp'
import turf_distance from '@turf/distance/index'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

import WIKI from './constants'

const BASE_URL = "http://localhost:3000/"


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
            id: 'Q5003624',
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
            year: 1932,
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
            year: 1908,
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
            year: 2008,
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
            year: 2012,
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
            year: 2010,
            license: "CC-BY-NC-ND 2.0"
        },
    ],
    geo: {
        location: "POINT(24.943752 60.176013)",
        admin: "Helsinki"
    },
    topicStartYear: 1784
}

var basemaps = [ // historical / old ones; source always warper.wmflabs.org
    {
        id: "File:1900_Plan_af_Helsingfors_stad.tif",
        title: "Opaskartta Helsingin kaupungista vuodelta 1900",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/1900_Plan_af_Helsingfors_stad.tif/lossy-page1-773px-1900_Plan_af_Helsingfors_stad.tif.jpg",
        year: 1900,
        server: "http://warper.wmflabs.org/",
        warperID: 148,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Belägenheten_af_Helsingfors_och_Sveaborg_1808.jpeg",
        title: "Belägenheten af Helsingfors och Sveaborg",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bel%C3%A4genheten_af_Helsingfors_och_Sveaborg_1808.jpeg/730px-Bel%C3%A4genheten_af_Helsingfors_och_Sveaborg_1808.jpeg",
        year: 1808,
        server: "http://warper.wmflabs.org/",
        warperID: 1159,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Brockhaus_and_Efron_Encyclopedic_Dictionary_b84_525-0.jpg",
        title: "Illustration from Brockhaus and Efron Encyclopedic Dictionary (1890—1907)",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Brockhaus_and_Efron_Encyclopedic_Dictionary_b84_525-0.jpg/508px-Brockhaus_and_Efron_Encyclopedic_Dictionary_b84_525-0.jpg",
        year: 1899,
        server: "http://warper.wmflabs.org/",
        warperID: 163,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Brändö_villastad.jpg",
        title: "Map of AB Brändö Villastad",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Br%C3%A4nd%C3%B6_villastad.jpg/631px-Br%C3%A4nd%C3%B6_villastad.jpg",
        year: 1910,
        server: "http://warper.wmflabs.org/",
        warperID: 1160,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Charta_Å_Then_Dehl_Af_Hagan_Vid_Glo-stran_Som_Trägårdsmästaren_Enbom_Åstundar_Til_Örtegården_Inhägna.tif",
        title: "Kartta siitä osasta Kluuvinrannan hakaa josta puutarhamestari Enbom haluaa aidata yrttitarhan",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Charta_%C3%85_Then_Dehl_Af_Hagan_Vid_Glo-stran_Som_Tr%C3%A4g%C3%A5rdsm%C3%A4staren_Enbom_%C3%85stundar_Til_%C3%96rteg%C3%A5rden_Inh%C3%A4gna.tif/lossy-page1-333px-Charta_%C3%85_Then_Dehl_Af_Hagan_Vid_Glo-stran_Som_Tr%C3%A4g%C3%A5rdsm%C3%A4staren_Enbom_%C3%85stundar_Til_%C3%96rteg%C3%A5rden_Inh%C3%A4gna.tif.jpg",
        year: 1792,
        server: "http://warper.wmflabs.org/",
        warperID: 2378,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Edbomska_Trädgården_och_Borgarehagen.tif",
        title: "Plan Af Den Så Kallade Edbomska Trädgården Och Borgare-hagen Uti Helsingfors Stad Sådan Den För Närvarande Befinnes",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Edbomska_Tr%C3%A4dg%C3%A5rden_och_Borgarehagen.tif/lossy-page1-433px-Edbomska_Tr%C3%A4dg%C3%A5rden_och_Borgarehagen.tif.jpg",
        year: 1833,
        server: "http://warper.wmflabs.org/",
        warperID: 2379,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Ehrenströmin_asemakaava.jpg",
        title: "Helsinki city plan designed by Johan Albrecht Ehrenström",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ehrenstr%C3%B6min_asemakaava.jpg/800px-Ehrenstr%C3%B6min_asemakaava.jpg",
        year: 1815,
        server: "http://warper.wmflabs.org/",
        warperID: 43,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Ehrenströmin_lopullinen_asemakaava.jpg",
        title: "Final form of Helsinki city plan designed by Johan Albrecht Ehrenström.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Ehrenstr%C3%B6min_lopullinen_asemakaava.jpg/800px-Ehrenstr%C3%B6min_lopullinen_asemakaava.jpg",
        year: 1817,
        server: "http://warper.wmflabs.org/",
        warperID: 1161,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Gamble_Helsingefors_1900.jpeg",
        title: "Gamble Helsingefors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Gamble_Helsingefors_1900.jpeg/779px-Gamble_Helsingefors_1900.jpeg",
        year: 1900,
        server: "http://warper.wmflabs.org/",
        warperID: 1162,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Geographisk_charta_öfver_Helsingfors_stad_med_dess_närmäste_belägenhet_efter_högvälborne_Herr_generalen_och_commend-_Ehrnsvärlds_befallning_år_1763.jpeg",
        title: "Geographisk charta öfver Helsingfors stad med dess närmäste belägenhet efter högvälborne Herr generalen och commend: Ehrnsvärlds befallning år 1763",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Geographisk_charta_%C3%B6fver_Helsingfors_stad_med_dess_n%C3%A4rm%C3%A4ste_bel%C3%A4genhet_efter_h%C3%B6gv%C3%A4lborne_Herr_generalen_och_commend-_Ehrnsv%C3%A4rlds_befallning_%C3%A5r_1763.jpeg/792px-Geographisk_charta_%C3%B6fver_Helsingfors_stad_med_dess_n%C3%A4rm%C3%A4ste_bel%C3%A4genhet_efter_h%C3%B6gv%C3%A4lborne_Herr_generalen_och_commend-_Ehrnsv%C3%A4rlds_befallning_%C3%A5r_1763.jpeg",
        year: 1900,
        server: "http://warper.wmflabs.org/",
        warperID: 1163,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingfors_med_omgifningar_1845.jpeg",
        title: "Helsingfors med omgifningar",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Helsingfors_med_omgifningar_1845.jpeg/771px-Helsingfors_med_omgifningar_1845.jpeg",
        year: 1845,
        server: "http://warper.wmflabs.org/",
        warperID: 1164,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingfors_svatlas.jpg",
        title: "Map of central Helsinki, Finland, in 1930.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Helsingfors_svatlas.jpg/596px-Helsingfors_svatlas.jpg",
        year: 1930,
        server: "http://warper.wmflabs.org/",
        warperID: 1165,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_asemakaava_1909.jpeg",
        title: "Helsingin asemakaava 1909",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Helsingin_asemakaava_1909.jpeg/513px-Helsingin_asemakaava_1909.jpeg",
        year: 1909,
        server: "http://warper.wmflabs.org/",
        warperID: 147,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_kartta_1909.TIF",
        title: "Helsingin kaupungin rakennustoimistossa laadittu kartta Helsingin kaupungista ja sen alueista vuodelta 1909.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Helsingin_kartta_1909.TIF/lossy-page1-432px-Helsingin_kartta_1909.TIF.jpg",
        year: 1909,
        server: "http://warper.wmflabs.org/",
        warperID: 1166,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_kartta_1932_2.jpeg",
        title: "Helsingin kartta 1932",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Helsingin_kartta_1932_2.jpeg/465px-Helsingin_kartta_1932_2.jpeg",
        year: 1932,
        server: "http://warper.wmflabs.org/",
        warperID: 1167,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_kartta_1932.jpeg",
        title: "Helsinki ympäristöineen, 1932",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Helsingin_kartta_1932.jpeg/764px-Helsingin_kartta_1932.jpeg",
        year: 1932,
        server: "http://warper.wmflabs.org/",
        warperID: 1168,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_kartta_Nummelin_1876.png",
        title: "Helsingin osoite- ja matkailukartta vuodelta 1876",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Helsingin_kartta_Nummelin_1876.png/800px-Helsingin_kartta_Nummelin_1876.png",
        year: 1876,
        server: "http://warper.wmflabs.org/",
        warperID: 178,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_matkailijakartta_1940_2.jpg",
        title: "Helsingin matkailijakartta 1940",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Helsingin_matkailijakartta_1940_2.jpg/573px-Helsingin_matkailijakartta_1940_2.jpg",
        year: 1940,
        server: "http://warper.wmflabs.org/",
        warperID: 1169,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_matkailijakartta_1940.jpg",
        title: "Helsingin matkailijakartta",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Helsingin_matkailijakartta_1940.jpg/800px-Helsingin_matkailijakartta_1940.jpg",
        year: 1949,
        server: "http://warper.wmflabs.org/",
        warperID: 1170,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_matkailijakartta_1949.jpg",
        title: "Helsingin matkailijakartta",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Helsingin_matkailijakartta_1949.jpg/800px-Helsingin_matkailijakartta_1949.jpg",
        year: 1949,
        server: "http://warper.wmflabs.org/",
        warperID: 1171,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsingin_raitiotiekartta_1_1932.jpeg",
        title: "Helsingfors spårvägskarta",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Helsingin_raitiotiekartta_1_1932.jpeg/529px-Helsingin_raitiotiekartta_1_1932.jpeg",
        year: 1932,
        server: "http://warper.wmflabs.org/",
        warperID: 1143,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_1815.jpg",
        title: "Helsingin ja Vironniemen kartta (Helsingin asemakaava) vuodelta 1815.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Helsinki_1815.jpg/486px-Helsinki_1815.jpg",
        year: 1815,
        server: "http://warper.wmflabs.org/",
        warperID: 1172,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_kartta_1696.jpeg",
        title: "Helsinki kartta 1696",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Helsinki_kartta_1696.jpeg/792px-Helsinki_kartta_1696.jpeg",
        year: 1696,
        server: "http://warper.wmflabs.org/",
        warperID: 1173,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_kartta_ja_luettelo_kaduista_ja_nähtävyyksistä_1924.jpeg",
        title: "Helsinki kartta ja luettelo kaduista ja nähtävyyksistä",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Helsinki_kartta_ja_luettelo_kaduista_ja_n%C3%A4ht%C3%A4vyyksist%C3%A4_1924.jpeg/356px-Helsinki_kartta_ja_luettelo_kaduista_ja_n%C3%A4ht%C3%A4vyyksist%C3%A4_1924.jpeg",
        year: 1924,
        server: "http://warper.wmflabs.org/",
        warperID: 1174,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_linnoitussaaret_kartta_end_of_19th_(text).jpg",
        title: "Fortress of Helsinki. Islands Vallisaari, Kuninkaansaari, Santahamina.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Helsinki_linnoitussaaret_kartta_end_of_19th_%28text%29.jpg/786px-Helsinki_linnoitussaaret_kartta_end_of_19th_%28text%29.jpg",
        year: 1895,
        server: "http://warper.wmflabs.org/",
        warperID: 1175,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_map_1645.jpg",
        title: "Helsingin kartta vuodelta 1645.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Helsinki_map_1645.jpg",
        year: 1645,
        server: "http://warper.wmflabs.org/",
        warperID: 1179,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_Map_1645.png",
        title: "Helsingin kartta vuodelta 1645.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Helsinki_Map_1645.png/442px-Helsinki_Map_1645.png",
        year: 1645,
        server: "http://warper.wmflabs.org/",
        warperID: 1180,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_map_1837_by_Claes_Wilhelm_Gyldén.jpg",
        title: "Kaupunkikartta Helsingistä vuodelta 1837.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Helsinki_map_1837_by_Claes_Wilhelm_Gyld%C3%A9n.jpg/769px-Helsinki_map_1837_by_Claes_Wilhelm_Gyld%C3%A9n.jpg",
        year: 1837,
        server: "http://warper.wmflabs.org/",
        warperID: 45,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_map_1932.jpg",
        title: "Kartta Helsingistä ja Etelä-Espoosta.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Helsinki_map_1932.jpg/800px-Helsinki_map_1932.jpg",
        year: 1932,
        server: "http://warper.wmflabs.org/",
        warperID: 1181,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Helsinki_ympäristöineen_1929.jpeg",
        title: "Helsinki ympäristöineen",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Helsinki_ymp%C3%A4rist%C3%B6ineen_1929.jpeg/800px-Helsinki_ymp%C3%A4rist%C3%B6ineen_1929.jpeg",
        year: 1929,
        server: "http://warper.wmflabs.org/",
        warperID: 1183,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Herttoniemi1856.jpg",
        title: "Itä-Helsinki Kalmbergin kartaston kartassa vuodelta 1856.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/d/de/Herttoniemi1856.jpg",
        year: 1856,
        server: "http://warper.wmflabs.org/",
        warperID: 1196,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Kaisaniemen_puisto_1918.tif",
        title: "Kaisaniemen puistosuunnitelma 1918",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Kaisaniemen_puisto_1918.tif/lossy-page1-573px-Kaisaniemen_puisto_1918.tif.jpg",
        year: 1918,
        server: "http://warper.wmflabs.org/",
        warperID: 2380,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Karta_öfver_Helsingfors_1860.jpeg",
        title: "Karta öfver Helsingfors 1860",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Karta_%C3%B6fver_Helsingfors_1860.jpeg/626px-Karta_%C3%B6fver_Helsingfors_1860.jpeg",
        year: 1860,
        server: "http://warper.wmflabs.org/",
        warperID: 1197,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Karta_öfver_Helsingfors_1866.jpeg",
        title: "Karta öfver Helsingfors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Karta_%C3%B6fver_Helsingfors_1866.jpeg/800px-Karta_%C3%B6fver_Helsingfors_1866.jpeg",
        year: 1866,
        server: "http://warper.wmflabs.org/",
        warperID: 1198,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Karta_öfver_Helsingfors_underlydande_ägor_belägna_Helsinge_socken_och_härad_af_Nylands_län_af_C_Reuter_1869.jpeg",
        title: "Karta öfver Helsingfors underlydande ägor belägna Helsinge socken och härad af Nylands län af C Reuter",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Karta_%C3%B6fver_Helsingfors_underlydande_%C3%A4gor_bel%C3%A4gna_Helsinge_socken_och_h%C3%A4rad_af_Nylands_l%C3%A4n_af_C_Reuter_1869.jpeg/430px-Karta_%C3%B6fver_Helsingfors_underlydande_%C3%A4gor_bel%C3%A4gna_Helsinge_socken_och_h%C3%A4rad_af_Nylands_l%C3%A4n_af_C_Reuter_1869.jpeg",
        year: 1869,
        server: "http://warper.wmflabs.org/",
        warperID: 1199,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Karta_över_Helsingfors_vid_1900-talets_början_(ur_Nordisk_familjebok).jpg",
        title: "Map of Helsinki at the beginning of the 1900s",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Karta_%C3%B6ver_Helsingfors_vid_1900-talets_b%C3%B6rjan_%28ur_Nordisk_familjebok%29.jpg/439px-Karta_%C3%B6ver_Helsingfors_vid_1900-talets_b%C3%B6rjan_%28ur_Nordisk_familjebok%29.jpg",
        year: 1900,
        server: "http://warper.wmflabs.org/",
        warperID: 1200,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Kjerrströms_helsingforskarta.jpg",
        title: "Engineer Claës Kjerrström's map of Helsinki from the late 1870s.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kjerrstr%C3%B6ms_helsingforskarta.jpg/660px-Kjerrstr%C3%B6ms_helsingforskarta.jpg",
        year: 1878,
        server: "http://warper.wmflabs.org/",
        warperID: 35,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Kocken_asemakaava.jpg",
        title: "Anders Kocken suunnitelma Helsingin asemakaavaksi.",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kocken_asemakaava.jpg/584px-Kocken_asemakaava.jpg",
        year: 1810,
        server: "http://warper.wmflabs.org/",
        warperID: 1201,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Map_of_Helsinki-Helsingfors_1935.jpeg",
        title: "Map of Helsinki-Helsingfors 1935",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_of_Helsinki-Helsingfors_1935.jpeg/661px-Map_of_Helsinki-Helsingfors_1935.jpeg",
        year: 1935,
        server: "http://warper.wmflabs.org/",
        warperID: 1203,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Map_of_Sveaborg_in_1808_(russian_language).jpg",
        title: "Map of Sveaborg in 1808 (on russian_language)",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Map_of_Sveaborg_in_1808_%28russian_language%29.jpg/394px-Map_of_Sveaborg_in_1808_%28russian_language%29.jpg",
        year: 1841,
        server: "http://warper.wmflabs.org/",
        warperID: 1204,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Opaskartta_Helsingin_kaupungista_vuodelta_1859.tif",
        title: "Opaskartta Helsingin kaupungista",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Opaskartta_Helsingin_kaupungista_vuodelta_1859.tif/lossy-page1-796px-Opaskartta_Helsingin_kaupungista_vuodelta_1859.tif.jpg",
        year: 1859,
        server: "http://warper.wmflabs.org/",
        warperID: 1205,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Peruskartta_1961_No_2034_06.jpg",
        title: "Peruskartta 1:20 000 vuodelta 1961, karttalehti 2034 06",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Peruskartta_1961_No_2034_06.jpg/475px-Peruskartta_1961_No_2034_06.jpg",
        year: 1961,
        server: "http://warper.wmflabs.org/",
        warperID: 2381,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Pharus-asemakaava_Helsinki.jpg",
        title: "Pharus-asemakaava Helsinki",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Pharus-asemakaava_Helsinki.jpg/451px-Pharus-asemakaava_Helsinki.jpg",
        year: 1920,
        server: "http://warper.wmflabs.org/",
        warperID: 1206,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_1863.jpeg",
        title: "Plan af Helsingfors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Plan_af_Helsingfors_1863.jpeg/797px-Plan_af_Helsingfors_1863.jpeg",
        year: 1863,
        server: "http://warper.wmflabs.org/",
        warperID: 1207,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_1876.jpeg",
        title: "Plan af Helsingfors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Plan_af_Helsingfors_1876.jpeg/753px-Plan_af_Helsingfors_1876.jpeg",
        year: 1876,
        server: "http://warper.wmflabs.org/",
        warperID: 1208,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_1893.jpeg",
        title: "Plan af Helsingfors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Plan_af_Helsingfors_1893.jpeg/725px-Plan_af_Helsingfors_1893.jpeg",
        year: 1893,
        server: "http://warper.wmflabs.org/",
        warperID: 1209,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_1899.jpeg",
        title: "Plan af Helsingfors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Plan_af_Helsingfors_1899.jpeg/733px-Plan_af_Helsingfors_1899.jpeg",
        year: 1899,
        server: "http://warper.wmflabs.org/",
        warperID: 1210,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_jemte_kartor_öfver_Finland,_hufvudstadens_omgifningar,_Saima_kanal_och_Helsingfors-Tavastehus_jernväg_samt_tjugyfyra_vyer_1860.jpeg",
        title: "Plan af Helsingfors",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Plan_af_Helsingfors_jemte_kartor_%C3%B6fver_Finland%2C_hufvudstadens_omgifningar%2C_Saima_kanal_och_Helsingfors-Tavastehus_jernv%C3%A4g_samt_tjugyfyra_vyer_1860.jpeg/750px-Plan_af_Helsingfors_jemte_kartor_%C3%B6fver_Finland%2C_hufvudstadens_omgifningar%2C_Saima_kanal_och_Helsingfors-Tavastehus_jernv%C3%A4g_samt_tjugyfyra_vyer_1860.jpeg",
        year: 1860,
        server: "http://warper.wmflabs.org/",
        warperID: 1212,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_jemte_omgifning_1880.jpeg",
        title: "Plan af Helsingfors jemte omgifning",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Plan_af_Helsingfors_jemte_omgifning_1880.jpeg/800px-Plan_af_Helsingfors_jemte_omgifning_1880.jpeg",
        year: 1880,
        server: "http://warper.wmflabs.org/",
        warperID: 1213,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_af_Helsingfors_år_1859.jpeg",
        title: "Plan af Helsingfors år 1859",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Plan_af_Helsingfors_%C3%A5r_1859.jpeg/698px-Plan_af_Helsingfors_%C3%A5r_1859.jpeg",
        year: 1859,
        server: "http://warper.wmflabs.org/",
        warperID: 1214,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_Charta_öfver_Helsingfors_Stad_Utvisande_så_väl_dess_ännu_varande_gamla_Qvarter_och_Gator_som_äfven_den_nya_af_Hans_Kejserliga_Majestät_i_Nåder_approberade_Reglering_1.jpg",
        title: "Map of Helsinki showing the remaining old quarters as well as new streets in an approved regulation by His Imperial Majesty in Grace",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Plan_Charta_%C3%B6fver_Helsingfors_Stad_Utvisande_s%C3%A5_v%C3%A4l_dess_%C3%A4nnu_varande_gamla_Qvarter_och_Gator_som_%C3%A4fven_den_nya_af_Hans_Kejserliga_Majest%C3%A4t_i_N%C3%A5der_approberade_Reglering_1.jpg/800px-thumbnail.jpg",
        year: 1823,
        server: "http://warper.wmflabs.org/",
        warperID: 2382,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_Charta_öfver_Helsingfors_Stad_Utvisande_så_väl_dess_ännu_varande_gamla_Qvarter_och_Gator_som_äfven_den_nya_af_Hans_Kejserliga_Majestät_i_Nåder_approberade_Reglering_2.jpg",
        title: "Map of Helsinki showing the remaining old quarters as well as new streets in an approved regulation by His Imperial Majesty in Grace, No 2",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Plan_Charta_%C3%B6fver_Helsingfors_Stad_Utvisande_s%C3%A5_v%C3%A4l_dess_%C3%A4nnu_varande_gamla_Qvarter_och_Gator_som_%C3%A4fven_den_nya_af_Hans_Kejserliga_Majest%C3%A4t_i_N%C3%A5der_approberade_Reglering_2.jpg/800px-thumbnail.jpg",
        year: 1823,
        server: "http://warper.wmflabs.org/",
        warperID: 2383,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Plan_de_la_Ville_de_Helsingforss_tel_qu¡l_a_-t-_approuv-_par_la_Majeste_Imperiale_1.jpg",
        title: "Plan de la Ville de Helsingfors tel qu'il a été approuvé par sa Majesté Impériale",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Plan_de_la_Ville_de_Helsingforss_tel_qu%C2%A1l_a_-t-_approuv-_par_la_Majeste_Imperiale_1.jpg/800px-Plan_de_la_Ville_de_Helsingforss_tel_qu%C2%A1l_a_-t-_approuv-_par_la_Majeste_Imperiale_1.jpg",
        year: 1817,
        server: "http://warper.wmflabs.org/",
        warperID: 2384,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Russia,_with_Teheran,_Port_Arthur,_and_Peking;_handbook_for_travellers_(1914)_(14578556159).jpg",
        title: "Russia, with Teheran, Port Arthur, and Peking; handbook for travellers",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Russia%2C_with_Teheran%2C_Port_Arthur%2C_and_Peking%3B_handbook_for_travellers_%281914%29_%2814578556159%29.jpg/800px-Russia%2C_with_Teheran%2C_Port_Arthur%2C_and_Peking%3B_handbook_for_travellers_%281914%29_%2814578556159%29.jpg",
        year: 1914,
        server: "http://warper.wmflabs.org/",
        warperID: 2385,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Senaatinkartta_Helsingistä_1870-luvulla.jpg",
        title: "Senaatinkartta Helsingistä 1870-luvulla",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Senaatinkartta_Helsingist%C3%A4_1870-luvulla.jpg/600px-Senaatinkartta_Helsingist%C3%A4_1870-luvulla.jpg",
        year: 1875,
        server: "http://warper.wmflabs.org/",
        warperID: 2386,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Sveaborg_fort.jpg",
        title: "Свеаборг карта из \"Атласа крепостей Российской империи\".",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Sveaborg_fort.jpg/518px-Sveaborg_fort.jpg",
        year: 1830,
        server: "http://warper.wmflabs.org/",
        warperID: 2387,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Tietosanakirja_(1909)_(14762482961).jpg",
        title: "Tietosanakirja",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Tietosanakirja_%281909%29_%2814762482961%29.jpg/474px-Tietosanakirja_%281909%29_%2814762482961%29.jpg",
        year: 1909,
        server: "http://warper.wmflabs.org/",
        warperID: 2388,
        municipality: "Helsinki",
        country: "Finland"
    },
    {
        id: "File:Orto_676495_10cm.tif",
        title: "Georeferoitu ortokuva Helsingistä vuodelta 1969 Ruutu 676495 Länsi-Pasila",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Orto_676495_10cm.tif/lossy-page1-600px-Orto_676495_10cm.tif.jpg",
        year: 1969,
        server: "http://warper.wmflabs.org/",
        warperID: 1284,
        municipality: "Helsinki",
        country: "Finland"
    },
];



export default new Vuex.Store({
    state: {
        wikidocumentariesDataState: WIKI.STATES.UNINITIALIZED,
        wikidocumentaries: wikidocumentaries,
        shownImages: [],
        timelineImages: [],
        historicalMapSearchPageMap: null,
        historicalMaps: [],
        basemaps: basemaps,
        selectedBasemap: null,
        selectedBasemapOpacity: 0.7,
        shouldFitMapToBasemap: false,
        photoOfTheDay: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Kulutusosuuskuntien_Keskusliiton_kokoelma_D1974_11333A_%2830804608561%29.jpg",
        mapOfTheDay: {
            id: "File:1900_Plan_af_Helsingfors_stad.tif",
            warperID: 148,
            server: "http://warper.wmflabs.org/",
            coordinates: [24.9351, 60.1658],
        }
    },
    getters: {
        topicStartYear: state => {
            
            var startYear = (new Date()).getFullYear();

            if (state.wikidocumentaries.topicStartYear != undefined) {
                startYear = state.wikidocumentaries.topicStartYear;
            }
            if (state.wikidocumentaries.images.length > 0) {
                for (var i = 0; i < state.wikidocumentaries.images.length; i++) {
                    //console.log("state.wikidocumentaries.images[i]", state.wikidocumentaries.images[i]);
                    //console.log("state.wikidocumentaries.images[i].year", state.wikidocumentaries.images[i].year);
                    if (state.wikidocumentaries.images[i].year != null &&
                        startYear > state.wikidocumentaries.images[i].year) {
                        if (!isWikidataBasedUnchangableStartYear(state.wikidocumentaries)) {
                            startYear = state.wikidocumentaries.images[i].year;
                        }
                    }
                }
            }

            //console.log(startYear);

            return startYear;
        }
    },
    mutations: {
        resetState(state) {

            state.wikidocumentariesDataState = WIKI.STATES.UNINITIALIZED;

            state.wikidocumentaries = {
                title: null,
                headerImageURL: null,
                wikipedia: {
                    html: "",
                    wikipediaURL: null,
                },
                wikidata: {
                    id: null,
                    instance_of: {
                        id: null,
                        value: null,
                        url: null
                    },
                    statements: []
                },
                images: [],
                geo: {
                    location: null,
                    scale: null,
                    admin: null
                },
                topicStartYear: null
            };
            state.shownImages = [];
            state.timelineImages = [];
            state.historicalMapSearchPageMap = null;
            state.historicalMaps = [];
            state.basemaps = basemaps;
            state.selectedBasemap = null;
            state.selectedBasemapOpacity = 0.7;
            state.shouldFitMapToBasemap = false;
        },
        setImagesShownOnMap(state, images) {
            state.shownImages = images;
        },
        setImagesShownOnTimeline(state, images) {
            //console.log("setImagesShownOnTimeline");
            state.timelineImages = images;
        },
        setHistoricalMapSearchPageMap(state, map) {
            state.historicalMapSearchPageMap = map;
        },
        setHistoricalMaps(state, maps) {
            state.historicalMaps = maps;
        },
        setSelectedBasemap(state, mapInfo) {
            state.selectedBasemap = mapInfo;
        },
        setSelectedBasemapOpacity(state, opacity) { // 0 - 1
            state.selectedBasemapOpacity = opacity;
        },
        setShouldFitMapToBasemap(state, value) {
            state.shouldFitMapToBasemap = value;
        },
        setWikidocumentariesTopicTitle(state, title) {
            state.wikidocumentaries.title = title;
        },
        setWikidata(state, wikidata) {
            state.wikidocumentaries.wikidata = wikidata;
        },
        setHeaderImageURL(state, URL) {
            state.wikidocumentaries.headerImageURL = URL;
        },
        setWikipediaHTML(state, html) {
            state.wikidocumentaries.wikipedia.html = html;
        },
        setWikipediaURL(state, URL) {
            state.wikidocumentaries.wikipedia.wikipediaURL = URL;
        },
        setTopicGeoLocation(state, coordinates) {
            //console.log("setTopicGeoLocation", coordinates);
            state.wikidocumentaries.geo.location = "POINT(" + coordinates.lon + " " + coordinates.lat + ")"
        },
        setWikidocumentariesDataState(state, value) {
            state.wikidocumentariesDataState = value;
        },
        setWikidocumentariesImages(state, images) {
            state.wikidocumentaries.images = images;
        },
        setTopicStartYear(state, year) {
            //console.log('setTopicStartYear');
            state.wikidocumentaries.topicStartYear = year;
        },
        setHistoricalBasemaps(state, basemaps) {
            state.basemaps = basemaps;
            if (basemaps.length > 0) {
                state.selectedBasemap = basemaps[0];
            }
        },

    },
    actions: {
        updateWikidocumentaries({dispatch, commit}, params) {
            //console.log('actions.updateWikidocumentaries');
            commit('resetState');
            commit('setWikidocumentariesDataState', WIKI.STATES.LOADING_WIKI_EXTERNAL);
            commit('setWikidocumentariesTopicTitle', params.topic.split('_').join(' '));
            var promiseWiki = dispatch('getWikiDocumentariesData', params);
            //var promiseImages = dispatch('getTopicImages', params)
            promiseWiki.then((data) => {

                //console.log(data);

                if (data.wikipedia  == null) {
                    commit('setWikidocumentariesDataState', WIKI.STATES.FAIL_WIKI_EXTERNAL);
                }
                else {
                    params.wiki = data;
                    commit('setWikidocumentariesDataState', WIKI.STATES.LOADING_IMAGES_EXTERNAL);

                    dispatch('getTopicImages', params).then((result) => {

                        commit('setWikidocumentariesDataState', WIKI.STATES.READY);
                        //console.log(result);
                        //console.log(data.wikipedia.originalimage);

                        if ( data.wikipedia.originalimage != undefined && data.wikipedia.originalimage.source != null) {
                            commit('setHeaderImageURL', data.wikipedia.originalimage.source);
                        }
                        else if (result.length > 0) { // Set the first image (not pdf) in the results as header image 
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].imageURL.indexOf('.pdf') == -1) {
                                    commit('setHeaderImageURL', result[i].imageURL);
                                    break;
                                }
                            }
                        }

                        //console.log(this.state.wikidocumentaries.geo);
                        // If the geo location could not be set from Wikipedia or Wikidata then
                        // try to calculate it from the image locations 
                        if (this.state.wikidocumentaries.geo.location == null) {
                            var location = calculateLocationFromImages(result);
                            if (location != null) {
                                commit('setTopicGeoLocation', location);
                            }
                            else {
                                // TODO
                            }
                        }
                    });
                }
            });
        },
        async getWikiDocumentariesData(context, params) {
            //console.log('getWikiDocumentariesData');
            return new Promise((resolve, reject) => {

                var requestConfig = {
                    baseURL: BASE_URL,
                    url: "/wiki",
                    method: "get",
                    params: {
                        topic: params.topic,
                        language: params.language
                    }
                };

                axios.request(requestConfig).
                    then(function (response) {
                        //console.log(response.data);

                        if (response.data.wikipedia == null) {
                            //console.log("response.data.wikipedia == null");
                            context.commit('setWikidocumentariesDataState', WIKI.STATES.FAIL_WIKI_EXTERNAL);
                        }
                        else {
                            //console.log(response.data);
                            context.commit('setWikidata', response.data.wikidata);

                            if (response.data.wikidata != undefined) {
                                var startYear = calculateTopicStartYearFromWikidata(response.data.wikidata, context.state.wikidocumentaries.topicStartYear);
                                context.commit('setTopicStartYear', startYear);
                            }

                            context.commit('setWikipediaHTML', response.data.wikipediaExcerptHTML);
                            context.commit('setWikipediaURL', response.data.wikipedia.content_urls.desktop.page);

                            if (response.data.wikipedia.coordinates != undefined) {
                                context.commit('setTopicGeoLocation', response.data.wikipedia.coordinates);
                            }
                            else if (response.data.wikidata != undefined) {
                                if (response.data.wikidata.geo.lat != null && response.data.wikidata.geo.lon != null) {
                                    context.commit('setTopicGeoLocation', response.data.wikidata.geo);
                                }
                                else {
                                    // guessTopicGeoLocationFromWikidata(params.topic, response.data.wikidata).then(data => {
                                    //     //console.log(data);
                                    //     if (data != null && data.result != null && data.result.point != null && data.result.point.coordinates != null) {
                                    //         commit('setTopicGeoLocation', {
                                    //             lon: data.result.point.coordinates[1],
                                    //             lat: data.result.point.coordinates[0]
                                    //         });
                                    //     }
                                    //     // if (location != null) {
                                    //     //     commit('setTopicGeoLocation', location);
                                    //     // }
                                    // });
                                }
                            }
                            else {
                                // // TODO
                                // commit('setTopicGeoLocation', {
                                //     lat: 0,
                                //     lon: 0
                                // });
                            }
                        }

                        resolve(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);

                        reject(error);
                    });
            });
        },
        async getTopicImages({dispatch, commit}, params) {

            //console.log('getTopicImages', params);
            
            return new Promise((resolve, reject) => {

                var requestConfig = {
                    baseURL: BASE_URL,
                    url: "/images",
                    method: "get",
                    params: {
                        topic: params.topic,
                        language: params.language
                    }
                };

                if (params.wiki.wikipedia.coordinates != undefined) {
                    requestConfig.params.lat = params.wiki.wikipedia.coordinates.lat;
                    requestConfig.params.lon = params.wiki.wikipedia.coordinates.lon;
                    requestConfig.params.maxradius = 2000; // meters
                }
                else if (params.wiki.wikidata != undefined && params.wiki.wikidata.geo.lat != null && params.wiki.wikidata.geo.lon != null) {
                    requestConfig.params.lat = params.wiki.wikidata.geo.lat;
                    requestConfig.params.lon = params.wiki.wikidata.geo.lon;
                    requestConfig.params.maxradius = 2000;
                }

                axios.request(requestConfig).
                    then(function (response) {
                        //console.log(response.data);

                        commit('setWikidocumentariesImages', response.data);

                        resolve(response.data);

                    }).catch(function (error) {
                        console.log(error);

                        reject(error);
                    });
            });
        },
        async getHistoricalBasemaps({dispatch, commit}, params) {

            var requestConfig = {
                baseURL: BASE_URL,
                url: "/basemaps",
                method: "get",
                params: params
            };

            axios.request(requestConfig).
                then(function (response) {
                    console.log(response.data);

                    commit('setHistoricalBasemaps', response.data);

                }).catch(function (error) {
                    console.log(error);
                });
        },
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
                                var thumbURL = info.imageinfo[0].thumburl;
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
                                    thumbURL: thumbURL,
                                    year: (info.imageinfo[0].extmetadata.DateTimeOriginal != undefined ? info.imageinfo[0].extmetadata.DateTimeOriginal.value : undefined),
                                    publisher: (info.imageinfo[0].extmetadata.Credit != undefined ? info.imageinfo[0].extmetadata.Credit.value.replace(/<\/?[^>]+(>|$)/g, "") : undefined),
                                    authors: (info.imageinfo[0].extmetadata.Artist != undefined ? info.imageinfo[0].extmetadata.Artist.value.replace(/<\/?[^>]+(>|$)/g, "") : undefined),
                                    institutions: (info.imageinfo[0].extmetadata.Credit != undefined ? info.imageinfo[0].extmetadata.Credit.value.replace(/<\/?[^>]+(>|$)/g, "") : undefined),
                                    license: (info.imageinfo[0].extmetadata.LicenseShortName != undefined ? info.imageinfo[0].extmetadata.LicenseShortName.value : undefined),
                                    summary: (info.imageinfo[0].extmetadata.ImageDescription != undefined ? info.imageinfo[0].extmetadata.ImageDescription.value : undefined),
                                    source: "Wikimedia Commons",
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
                        //console.log(response);

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
                                            if (record.authors.hasOwnProperty(author)) {
                                                //console.log(author);
                                                for (var key in record.authors[author]) {
                                                    //console.log(key);
                                                    if (record.authors[author].hasOwnProperty(key)) {
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
                                        imageRights: (record.imageRights != undefined ? record.imageRights.copyright : undefined),
                                        license: record.imageRights.copyright,
                                        summary: record.summary,
                                        source: "Finna",
                                        infoURL: "https://www.finna.fi/Record/" + encodeURIComponent(record.id)
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
        },
    }
});

function isWikidataBasedUnchangableStartYear(wikidocumentaries) {

    var isUnchangable = false;

    // See also https://www.wikidata.org/w/index.php?title=Special:ListProperties/time
    var unchangableStartYearProperties = [
        'P569', // date of birth
        'P580', // start time
    ];

    if (wikidocumentaries.wikidata != undefined) {
        var wikidataDates = wikidocumentaries.wikidata.dates;
        for (var i = 0; i < wikidataDates.length; i++) {
            if (unchangableStartYearProperties.indexOf(wikidataDates[i].wikidata_property) != -1) {
                isUnchangable = true;
                break;
            }
        }
    }

    return isUnchangable;
}

function calculateTopicStartYearFromWikidata(wikidata, currentStartYear) {
    // See also https://www.wikidata.org/wiki/Help:Dates and
    // https://www.wikidata.org/w/index.php?title=Special:ListProperties/time&limit=50&offset=0

    var minYear = (currentStartYear != null ? currentStartYear : (new Date()).getFullYear());

    wikidata.dates.forEach(dateItem => {

        //console.log(dateItem);

        var timeString = dateItem.value.time;

        var year = parseInt((timeString.indexOf('-') != 0 ? timeString.substring(1, timeString.indexOf('-')) : timeString.substring(0, timeString.indexOf('-', 1))), 10);

        if (year < minYear) {
            minYear = year;
        }

        // if (mainsnak.property == 'P569') {
        //     dateItem.type = "date_of_birth";
        // }
        // else if (mainsnak.property == 'P570') {
        //     dateItem.type = "date_of_death";
        // }
        // else if (mainsnak.property == 'P571') {
        //     dateItem.type = "inception"; // date founded
        // }
    });

    return minYear;
}

function createGetCommonsMapInfoTask(fileName) {
    return new Promise((resolve, reject) => {
                                
        var url = "https://commons.wikimedia.org/w/api.php?" +
            "action=query" +
            "&titles=" + fileName +
            "&prop=imageinfo" +
            "&iiprop=user|url|extmetadata" +
            "&iiurlwidth=400" +
            "&iiurlheight=400" +
            "&redirects=resolve" +
            "&format=json" +
            "&callback=callback";

        jsonp(url, null, (error, data) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                //console.log(data);
                resolve(data);
            }
        });
    });
}

const locationRelatedItems = [
    'Q515', // city
    'Q15715406', // neighbourhood of Helsinki
    //'Q17468533', // former municipality of Finland
    'Q856076', // municipality of Finland
    'Q217691', // province of Finland
    'Q193512', // region of Finland
    'Q5119', // capital city
    'Q1549591', // big city
    'Q123705', // neighborhood
    'Q3624078', // sovereign state
    'Q6256', // country
    'Q179164', // unitary state
    'Q165', // sea
    'Q23397', // lake
    'Q22698', // park
    'Q4022', // river
];

const locationRelatedProperties = [
    'P131',// located in the administrative territorial entity, e.g. Helsinki
    'P17',// country
    'P276',     //P276 location, e.g. Kaisaniemen puisto
    'P36',    //P36 capital city
    'P706',    //P706 located on terrain feature
    'P4552',   //a mountain range (P4552)
    'P5130', // an island (P5130).
    'P47',    //P47 countries shares border with
    'P30',     //P30 continent of which the subject is a part
    'P150',     //P150 (list of) direct subdivisions of an administrative territorial entity
    'P206',    //P206 located in or next to body of water

    'P551',     //P551 residence (asuinpaikka)
    'P27',    //P27 country of citizenship, e.g. Suomi
    'P19',    //P19 place of birth, e.g. Tukholma (https://www.wikidata.org/wiki/Q52930)
    'P20',//P20 place of death, e.g. Tukholma
    'P2632',    //P2632 place of detention
    'P119',    //P119 place of burial
    //'P103',    //P103 native language --> indigenous to P2341
];

function guessTopicGeoLocationFromWikidata(topic, wikidata) {
    
    //console.log(wikidata);

    return new Promise((resolve, reject) => {

        var place = "";
        //console.log(wikidata.instance_of.id);
        if (locationRelatedItems.indexOf(wikidata.instance_of.id) != -1) {
            //console.log("wikidata.instance_of.id in locationRelatedItems");
            place += topic;
            geocode(place).then(data => {

                if (data == null) {
                    var result = guessTopicGeoLocationFromProperties(topic, wikidata).then(data => {
                        resolve(data);
                    });
                    if (result == null) {
                        resolve(null);
                    }
                }
                else {
                    resolve(data);
                }
                //
            });
        }
        else {
            var result = guessTopicGeoLocationFromProperties(topic, wikidata);
            if (result == null) {
                resolve(null);
            }
            else {
                result.then(data => {
                    resolve(data);
                });
            }
        }
    });
}

function guessTopicGeoLocationFromProperties(topic, wikidata) {
 
    for (var i = 0; i < wikidata.statements.length; i++) {
        var statement = wikidata.statements[i];
        for (var j = 0; j < locationRelatedProperties.length; j++) {

            if (statement.id == locationRelatedProperties[j]) {

                var place = "";
                if (locationRelatedItems.indexOf(wikidata.instance_of.id) != -1) {
                    place += topic + ",";
                }
                place += statement.value;

                return geocode(place);
            }
        }
    }

    return null;
}

function geocode(place) {
    var requestConfig = {
        baseURL: BASE_URL,
        url: "/geocode",
        method: "get",
        responseType: 'json',
        params: {
            place: place
        }
    }

    return axios.request(requestConfig).then((response) => {
        //console.log(response.data);
        return response.data;
        
    }).catch(error => {
        console.log("error in geocode");
        return null;
        //reject(error);
        //console.log(error);
    });
}

function calculateLocationFromImages(images) {
    
    
    var centerCoordinates = null;

    // if (images.length > 0) {

    //     var imageLocations = [];

    //     // var lonSum = 0;
    //     // var latSum = 0;
    //     // var count = 0;

    //     images.forEach(image => {
    //         var imageLocation = getFirstGeoLocationAsPoint(image);
    //         if (imageLocation != null) {
    //             imageLocations.push(imageLocation);
    //             // lonSum += imageLocation[0];
    //             // latSum += imageLocation[1];
    //             // count++;
    //         }
    //     });

    //     var noDeletions = false;

    //     while (noDeletions == false) {

    //         var center = getCentroid(imageLocations);

    //         var maxDistanceToCentroid = 0;
    //         var maxDistanceIndex = -1;

    //         imageLocations.forEach((location, index) => {
    //             var distance = turf_distance(location, center);
    //             if (distance > maxDistanceToCentroid) {
    //                 maxDistanceToCentroid = distance;
    //                 maxDistanceIndex = index;
    //             }
    //         });

    //         var maxAllowedDistance = 5; // km

    //         if (maxDistanceToCentroid > maxAllowedDistance) {
    //             //console.log("maxDistanceToCentroid", maxDistanceToCentroid);
    //             imageLocations.splice(maxDistanceIndex, 1);
    //         }
    //         else {
    //             //console.log("noDeletions");
    //             noDeletions = true;
    //         }
    //     }

    //     if (imageLocations.length > 3) { // Considered to be too unreliable if less than 4 images
    //         centerCoordinates = {
    //             lat: center[1],
    //             lon: center[0]
    //         }
    //     }
    // }

    return centerCoordinates;
}

function getFirstGeoLocation(image) {
    var geoLocation = null;
    if (image.geoLocations.length > 0) {
        var wkt = image.geoLocations[0];
        if (wkt.indexOf("POINT") != -1) { 
            // "POINT(24.9600002 60.1796223)"
            var coordPart = wkt.split('(')[1].split(')')[0];
            //console.log(coordPart);
            geoLocation = coordPart.split(' ').map(Number);
        }
        else if (wkt.indexOf("LINESTRING") != -1) {
            // "LINESTRING(24.9697848 60.1877939,24.9695072 60.1876021)"
            var coordPart = wkt.split('(')[1].split(')')[0];
            var pointParts = coordPart.split(',');
            geoLocation = [];
            for (var i = 0; i < pointParts.length; i++) {
                geoLocation.push(pointParts[i].split(' ').map(Number));
            }
        }
        else if (wkt.indexOf("POLYGON") != -1) {
            // "POLYGON((24.7828131 60.0999549, 24.8356577 60.130414, 24.8513844 60.2249765, 24.8419098 60.2212043, 24.8347825 60.2585099, 24.8677628 60.2523073, 24.9473908 60.2784652, 24.9731653 60.2643801, 25.0209862 60.2893227, 25.0882105 60.2713417, 25.0823359 60.2496391, 25.1358461 60.2372286, 25.1598757 60.2488133, 25.1425242 60.2697779, 25.2545116 60.2952274, 25.2509121 60.2734979, 25.2273451 60.2611057, 25.240926 60.246305, 25.2014099 60.2181613, 25.2204176 60.1997262, 25.1800446 60.0987408, 25.1693516 59.9434386, 24.9423061 59.922486, 24.7828131 60.0999549))"
            geoLocation = [];
            var parenthesisPart = wkt.substring(wkt.indexOf('('));
            //console.log(parenthesisPart);
            var parenthesisPartInner = parenthesisPart.substr(1, parenthesisPart.length - 2);
            //console.log(parenthesisPartInner);
            var polygonPartCount = parenthesisPartInner.match(/\(/g).length;
            //console.log(polygonPartCount);
            var parts = parenthesisPartInner.split('(').slice(1);
            //console.log(parts);
            var partsWithoutParenthesis = [];
            for (var i = 0; i < parts.length; i++) {
                var part = null;
                if (parts[i].substr(parts[i].length -1, 1) == ',') {
                    part = parts[i].substr(0, parts[i].length - 1);
                }
                else {
                    part = parts[i];
                }
                partsWithoutParenthesis.push(part.slice(0, -1));
            }
            //console.log(partsWithoutParenthesis);

            for (var i = 0; i < partsWithoutParenthesis.length; i++) {
                var pointParts = partsWithoutParenthesis[i].split(',');
                var polygonPart = [];
                for (var j = 0; j < pointParts.length; j++) {
                    polygonPart.push(pointParts[j].trim().split(' ').map(Number));
                }
                geoLocation.push(polygonPart);
            }
            //console.log(geoLocation);
        }
        else if (wkt.indexOf("ENVELOPE") != -1) {
            // "ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"
            var coordPart = wkt.split('(')[1].split(')')[0];
            var pointParts = coordPart.split(',').map(Number);
            //console.log(pointParts);
            var envelopePolygon = [[pointParts[0], pointParts[3]], [pointParts[0], pointParts[2]], [pointParts[1], pointParts[2]], [pointParts[1], pointParts[3]], [pointParts[0], pointParts[3]]];
            //console.log(envelopePolygon);
            geoLocation = [envelopePolygon];
        }
    }
    return geoLocation;
}

function getFirstGeoLocationAsPoint(image) {
    var geoLocation = getFirstGeoLocation(image)
    if (image.geoLocations.length > 0) {
        var wkt = image.geoLocations[0];
        if (wkt.indexOf("POINT") != -1) { 
            // "POINT(24.9600002 60.1796223)"
            var coordPart = wkt.split('(')[1].split(')')[0];
            //console.log(coordPart);
            geoLocation = coordPart.split(' ').map(Number);
        }
        else if (wkt.indexOf("LINESTRING") != -1) {
            geoLocation = getCentroid(geoLocation);
        }
        else if (wkt.indexOf("POLYGON") != -1) {
            geoLocation = getCentroid(geoLocation[0]); // We do not care of the possible holes in the polygon
        }
        else if (wkt.indexOf("ENVELOPE") != -1) {
            // "ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"
            var coordPart = wkt.split('(')[1].split(')')[0];
            var pointParts = coordPart.split(',').map(Number);
            //console.log(pointParts);
            var lng = (pointParts[0] + pointParts[1]) / 2;
            var lat = (pointParts[2] + pointParts[3]) / 2;
            //var envelopePolygon = [[pointParts[0], pointParts[3]], [pointParts[0], pointParts[2]], [pointParts[1], pointParts[2]], [pointParts[1], pointParts[3]], [pointParts[0], pointParts[3]]];
            //console.log(envelopePolygon);
            geoLocation = [lng, lat];
        }
    }

    return geoLocation;
}

function getCentroid(coords) {
    var center = coords.reduce(function (x,y) {
        return [x[0] + y[0]/coords.length, x[1] + y[1]/coords.length]; 
    }, [0,0])
    return center;
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
       