import Vue from 'vue'
import Router from 'vue-router'
import LoginSignup from './views/LoginSignup.vue'
import Landing from './views/Landing.vue'
import Events from './views/Events.vue'
import Directory from './views/Directory.vue'
import User from './views/User.vue'
import EventAdd from './views/EventAdd.vue'
import EventSingle from './views/EventSingle.vue'
import AdminTools from './views/AdminTools.vue'
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
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/directory',
      name: 'directory',
      component: Directory
    },
    {
      path: '/users/:uniqname',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/events/:eventhash',
      name: 'event',
      component: EventSingle,
      props: true
    },
    {
      path: '/event/add-event',
      name: 'add-event',
      component: EventAdd
    },
    {
      path: '/admintools',
      name: 'admintools',
      component: AdminTools
    },
  ]
})

// This runs before we enter every route
// Calling next() allows us to enter the route
// to, from: these can be used if you want to do something special for a specific URL
// fix user  call it something else
router.beforeEach((to, from, next) => {
  // If the object is null, try to add it
  if (store.state.userAuth === null){
    auth.onAuthStateChanged(function(user) {
      // if user exists and they are a verified user
      if (user && user.emailVerified) {
        // Add user to vuex store
        store.commit('addUserAuth', auth.currentUser)
        store.dispatch('addUserData').then(() => {
          // console.log(store.state.userData)
          next()
        })
      }
      // This is a guest account
      else {
        store.commit('addGuestData')
        next()
      }
    })
  }
  // User Exists
  else {
      // Only if the user is a verified user then they may casually progress the pages
      if (store.state.userAuth.emailVerified) { next(); }
      // User exists but is not verified so they will not go anywhere
      else { router.push('/'); }
  }
})

export default router
