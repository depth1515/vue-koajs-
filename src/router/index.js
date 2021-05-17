import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login */'./../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg */'./../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget */'./../views/Forget.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      console.log(to, from)
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
