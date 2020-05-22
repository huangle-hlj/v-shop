import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]
const router = new VueRouter({
  routes
})
//挂载全局路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  let token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router