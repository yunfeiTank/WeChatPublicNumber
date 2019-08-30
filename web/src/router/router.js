import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import HomeFind from './homeFind'
import ModelType from '@/plugins/modelType'
Vue.use(Router)
const router = new Router({
  mode: ModelType == 1 ? 'hash' : "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/home',
      children: HomeFind
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '../components/404.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router