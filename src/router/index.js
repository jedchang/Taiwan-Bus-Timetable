import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import BusDynamics from '../views/BusDynamics.vue'
import BusFaq from '../views/BusFaq.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { title: '全台公車動態時刻查詢應用服務' }
  },
  {
    path: '/Bus-Dynamics',
    name: 'BusDynamics',
    component: BusDynamics,
    meta: { title: '公車動態 | 全台公車動態時刻查詢應用服務' }
  },
  {
    path: '/Bus-FAQ',
    name: 'BusFaq',
    component: BusFaq,
    meta: { title: '常見問題 | 全台公車動態時刻查詢應用服務' }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
