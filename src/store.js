import Vue from 'vue'
import Vuex from 'vuex'
// to get state in a component, import the store
// put the store into the component
// call a mutation using store.commit('funcName', param1, param2)
// use a variable using this.$store.state.varName

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },

  // Change state by providing state and other parameters
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
