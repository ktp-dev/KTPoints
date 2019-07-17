import Vue from 'vue'
import Vuex from 'vuex'
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
    
  },
  
  // Use actions to perform asynchronous calls (not possible in a mutation)
  actions: {

  }
})
