// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import mavonEditor from 'mavon-editor'
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Vuex from 'vuex'


export default function (Vue, { router, head, isClient, appOptions }) {
  // Vue.use(Vant)
  Vue.use(ElementUI)
  Vue.use(mavonEditor)
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      Token: ""
    },
    mutations: {
      increment (state,payload) {
        state.Token = payload
      }
    }
  })

  // Vue.use(mavonEditor)
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
