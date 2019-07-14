<template>
<!-- <div class="container"> -->
  <div class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="title">Welcome to KTPoints {{$route.params.username}}</p>

          <div class="field">
            <router-link to='/KTP/events'>
              <button class="button is-large is-primary">Events</button>
            </router-link>
          </div>

          <div class="field">
            <router-link to='/KTP/directory'>
              <button class="button is-large is-primary">Explore!</button>
            </router-link>
          </div>


        </div>
      </div>
  </div>
<!-- </div> -->
</template>

<script>
export default {
  
}
</script>