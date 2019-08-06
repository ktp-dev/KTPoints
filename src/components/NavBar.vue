<template>
  <nav class="navbar white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="@/assets/ktp_logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>
        <router-link to='/KTP/Events' class="navbar-item">
          Events
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <router-link to='/KTP/directory' class="navbar-item">
              Directory
            </router-link>
            <a class="navbar-item">
              Leaderboard
            </a>
            <router-link class="navbar-item" v-bind:to="{name: 'user1', params: { uniqname: getUniqname(), major: getMajor(), name: getName(), pledge_class: getPledgeClass(), year: getYear(), imgURL: getImgURL()}}">
                Profile
            </router-link>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="this.$store.state.userData.standing == rushee"  class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
          <div v-if="this.$store.state.userData.standing != rushee"  class="buttons">
            <a class="button is-primary">
              <strong>{{this.$store.state.userData.name}}</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import store from '@/store.js'

export default {
  store,
  methods: {
      getImgURL: function(){
          return this.$store.state.userData.imageURL;
      },
      getUniqname: function(){
          return this.$store.state.userData.uniqname;
      },
      getMajor: function(){
          return this.$store.state.userData.major;
      },
      getName: function(){
          return this.$store.state.userData.name;
      },
      getPledgeClass: function(){
          return this.$store.state.userData.pledge_class;
      },
      getYear: function(){
          return this.$store.state.userData.year;
      }
  }
}
</script>

<style lang="scss">

</style>
