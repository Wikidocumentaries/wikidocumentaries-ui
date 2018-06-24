import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: page
    }
  ]
})
