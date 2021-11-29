import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  Tabs,
  TabPane,
  Select,
  Option,
  Collapse,
  CollapseItem,
  Dialog,
  Button
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VuePictureSwipe from 'vue-picture-swipe'

Vue.component('Loading', Loading)
Vue.component('vue-picture-swipe', VuePictureSwipe)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
