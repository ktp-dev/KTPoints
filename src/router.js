import Vue from 'vue'
import Router from 'vue-router'
import LoginSignup from './views/LoginSignup.vue'
import Landing from './views/Landing.vue'
import Events from './views/Events.vue'
import Directory from './views/Directory.vue'
import User from './views/User.vue'
import EventAdd from './views/EventAdd.vue'
import EventSingle from './views/EventSingle.vue'
import store from '@/store.js'
import { auth } from '@/main.js'

Vue.use(Router)

const router = new Router({
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
      component: Landing,

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
      path: '/KTP/directory',
      name: 'directory',
      component: Directory
    },
    {
      path: '/KTP/users/:uniqname',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/KTP/event/:eventhash',
      name: 'event',
      component: EventSingle,
      props: true
    },
    {
      path: '/KTP/events/add-event',
      name: 'add-event',
      component: EventAdd
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
    auth.onAuthStateChanged(function(user_exists) {
      // if user exists, edit store
      if (user_exists) {
        // Add user to vuex store
        store.commit('addUserAuth', auth.currentUser)
        store.dispatch('addUserData').then(() => {
          // console.log(store.state.userData)
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