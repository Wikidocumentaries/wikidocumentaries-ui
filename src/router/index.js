import Vue from 'vue'
import Router from 'vue-router'
import {VueMasonryPlugin} from 'vue-masonry';
import page from '@/components/Main'

Vue.use(Router)
Vue.use(VueMasonryPlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: page
    }
  ]
})
