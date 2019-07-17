<template>
<!-- <div class="container"> -->
  <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="title">Welcome to KTPoints {{name}}</p>
          <router-link to='/KTP/events'>
            <button class='button is-large is-link'>EVENTS</button>
          </router-link>
        </div>
      </div>
  </div>
<!-- </div> -->
</template>

<script>
import store from '@/store.js'
export default {
  store,
  data() {
    return {
      name: ''
    }
  },
  mounted(){
    // Dispatches if there is no userData
    if (this.$store.state.userData === null){
      /* 
      // This timeout is here so we wait a little bit
      // so that the userAuth object is not null but 
      // I HATE THIS IT'S GARBAGE
      */ 
      setTimeout(() => {
        this.$store.dispatch("addUserData").then(() => {
          this.name = this.$store.state.userData.name
        })
      }, 2000);
    }
    // 
    else{
      this.name = this.$store.state.userData.name
    }
  }
}
</script>