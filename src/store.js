import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main.js'
// to get state in a component, import the store
// put the store into the component
// call a mutation using store.commit('funcName', param1, param2)
// use a variable using this.$store.state.varName

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Use this auth object to updatePassword, get email, etc
    userAuth: null,

    // Use this firestore dictionary object to get information about a user e.g. pledgeclass
    // here is what it looks like
    // USER OBJECTS:
    // standing, major, meetings_left, name, pledge_class, points, uniqname, year
    userData: null,
    number: 5
  },

  // Change state by providing state and other parameters
  mutations: {
    addUserAuth(state, currentUserAuth){
      state.userAuth = currentUserAuth;
    },
    
    addUserData(state, currentUserInfo){
      state.userData = currentUserInfo;
    }
  },

  getters: {
    uniqname(state){
      const email = state.userAuth.email;
      return email.split('@')[0]  
    }
  },
  
  // Use actions to perform asynchronous calls (not possible in a mutation)
  actions: {
    addUserData({commit, getters}) {
      return new Promise((resolve) => {
        db.collection('users').doc(getters.uniqname).get().then((doc, response) => {
          commit('addUserData', doc.data())
          resolve(response);
        })  
      })
    },
  }
})
