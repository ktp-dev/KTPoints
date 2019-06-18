import Vue from 'vue'
import Router from 'vue-router'
import LoginSignup from './views/LoginSignup.vue'
import Landing from './views/Landing.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginSignup
    },
    {
      path: '/user/:username',
      name: 'user',
      component: Landing
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
