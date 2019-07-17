<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/user/sletap">About</router-link> -->
    </div>
    <!-- <transition name='slide-fade' mode="out-in"> -->
    <transition :name="transitionName" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { auth, db } from '@/main.js'
import store from '@/store.js'

export default {
  store,
  data(){
    return{
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      // if we're moving to or from landing, do a slide-up/down transition
      if (from.fullPath == '/'){
        this.transitionName = 'slide-down'
        return;
      }
      else if (to.fullPath == '/'){
        this.transitionName = 'slide-up'
        return;
      }
      // if we're moving between pages of different depths
      // transition with a slide-left/right
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth > fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  created(){
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // Add user to vuex store
        store.commit('addUserAuth', auth.currentUser)
        const email = auth.currentUser.email;
        const username = email.split('@')[0]
        db.collection('users').doc(username).get().then((doc) => {
          store.commit('addUserData', doc.data())
          console.log(doc.data())
        })
      } 
    })
  }
}
</script>

<style>
/*  Handles route transitioning */
.slide-down-enter-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-down-leave-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-down-enter {
  /* transform: translateY(-100%); */
  opacity: 0;
}
.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-up-leave-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-up-enter {
  /* transform: translateY(-100%); */
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-left-leave-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-left-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-right-leave-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-right-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
