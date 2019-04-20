// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/store.js'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import * as messages from './store/messages.js'
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
