<template>
<!-- <div class="container"> -->
  <div class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="title">Welcome to KTPoints {{$store.state.userData.name}}</p>
          <router-link to='/KTP/events'>
            <button class='button is-large'>EVENTS</button>
          </router-link>
        </div>
      </div>
  </div>
<!-- </div> -->
</template>

<script>
export default {
  
}
</script>