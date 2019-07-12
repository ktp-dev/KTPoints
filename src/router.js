import Vue from 'vue'
import Router from 'vue-router'
import LoginSignup from './views/LoginSignup.vue'
import Landing from './views/Landing.vue'
import Events from './views/Events.vue'
import AddEvent from './views/AddEvent.vue'
import { auth } from '@/main.js'

Vue.use(Router)

// function guard(to, from, next){
//   if (auth.currentUser){
//     next('/landing')
//     console.log('go to landing')
//   }
//   else{
//     next();
//   }
// }

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // beforeEnter: guard,
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
      name: 'events',
      component: Events
    },
    {
      path: '/KTP/events/add-event',
      name: 'add-event',
      component: AddEvent
    },
  ]
})
