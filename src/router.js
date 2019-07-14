import Vue from 'vue'
import Router from 'vue-router'
import LoginSignup from './views/LoginSignup.vue'
import Landing from './views/Landing.vue'
import Events from './views/Events.vue'
import Directory from './views/Directory.vue'

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
      path: '/landing',
      name: 'landing',
      component: Landing
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/KTP/events',
      name: 'event',
      component: Events
    },
    {
      path: '/KTP/directory',
      name: 'directory',
      component: Directory
    },
  ]
})
