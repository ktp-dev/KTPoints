<template>
<!-- <div class="container"> -->
  <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="title">Welcome to KTPoints {{this.$store.state.userData.name}}</p>
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
}
</script>