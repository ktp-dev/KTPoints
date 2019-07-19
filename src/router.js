import Vue from 'vue'
import Router from 'vue-router'
import LoginSignup from './views/LoginSignup.vue'
import Landing from './views/Landing.vue'
import Events from './views/Events.vue'
import store from '@/store.js'
import { auth } from '@/main.js'

Vue.use(Router)

const router = new Router({
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
      component: Landing,

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
  ]
})

// This runs before we enter every route
// Calling next() allows us to enter the route
// to, from: these can be used if you want to do something special for a specific URL
router.beforeEach((to, from, next) => {
  // If the object is null, try to add it
  if (store.state.userAuth === null){
    auth.onAuthStateChanged(function(user) {
      // if user exists, edit store
      if (user) {
        // Add user to vuex store
        store.commit('addUserAuth', auth.currentUser)
        store.dispatch('addUserData').then(() => {
          console.log(store.state.userData)
          next()
        })    
      }
      // User doesn't exist
      // This is a guest account
      else {
        store.commit('addGuestData')
        next()
      }
    })
  }

  else{
    next()
  }
})

export default router