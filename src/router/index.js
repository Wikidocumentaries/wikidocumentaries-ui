import Vue from 'vue'
import Router from 'vue-router'
import {VueMasonryPlugin} from 'vue-masonry';
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
//import VueLayers from 'vuelayers'
//import 'vuelayers/lib/style.css'
import VueScrollTo from 'vue-scrollto'
import axios from 'axios'
import VueAxios from 'vue-axios'

import olmap from '../openlayersplugin/olplugin.js'
import 'ol/ol.css'

import page from '@/components/Main'
import LandingPage from '@/components/landing_page/LandingPage'
import devpage from '@/components/landing_page/Developer'

Vue.use(Router)
Vue.use(VueMasonryPlugin)
Vue.use(Viewer)
//Vue.use(VueLayers, {
//  dataProjection: 'EPSG:4326',
//})
Vue.use(VueScrollTo)
Vue.use(VueAxios, axios)

Vue.use(olmap)

export default new Router({
  routes: [
    {
      path: '/dev',
      name: 'DevPage',
      component: devpage
    },
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/:topic',
      name: 'TopicPage',
      component: page
    },
  ]
})
