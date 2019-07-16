import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },

  // Change state by providing state at the minimum
  mutations: {
    addUser(state, currentUser){
      state.user = currentUser;
    }
  },

  getters: {
    
  },
  
  // Use actions to perform asynchronous calls (not possible in a mutation)
  actions: {

  }
})
