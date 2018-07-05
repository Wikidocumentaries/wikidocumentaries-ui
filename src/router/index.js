import Vue from 'vue'
import Router from 'vue-router'
import {VueMasonryPlugin} from 'vue-masonry';
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import page from '@/components/Main'

Vue.use(Router)
Vue.use(VueMasonryPlugin)
Vue.use(Viewer)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: page
    }
  ]
})
