<template>
<!-- <div class="container"> -->
  <div class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="title">Welcome to KTPoints {{name}}</p>
          <router-link to='/KTP/events'>
            <button class='button is-large'>EVENTS</button>
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
    console.log(this.$store.state.userData)
    if (this.$store.state.userData === null){
      this.$store.dispatch("addUserData").then(() => {
        this.name = this.$store.state.userData.name
      })
    }
    else{
      this.name = this.$store.state.userData.name
    }
  }
}
</script>