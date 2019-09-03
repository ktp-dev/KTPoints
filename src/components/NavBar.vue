<template>
  <nav class="navbar white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item navimage" href="https://kappathetapi.com/" target="_blank">
        <img src="@/assets/ktp_logo.png" width="112" height="50">
      </a>

      <a role="button" v-on:click="toggleBurger()" v-bind:class="{ 'is-active': this.showBurger }"  class="navbar-burger burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to='/landing' class="navbar-item">
          Home
        </router-link>
        <router-link to='/events' class="navbar-item">
          Events
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <router-link to='/directory' class="navbar-item">
              Directory
            </router-link>
            <router-link :to="this.profileLink" class="navbar-item">
              Profile
            </router-link>
            <a href="https://kappathetapi.com/contact-us" target="_blank" class="navbar-item">
              Contact
            </a>
            <router-link v-if="this.$store.state.userData.standing === 'Eboard'" to='/admintools' class="navbar-item">
              Admin Tools
            </router-link>
            <hr class="navbar-divider">
            <a href="https://forms.gle/AeGywrUiu4Qqt2zi8" target="_blank" class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="this.$store.state.userData.uniqname === null"  class="buttons">
            <router-link to="/" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
          </div>
          <div v-if="this.$store.state.userData.uniqname !== null"  class="buttons">
            <router-link :to="this.profileLink" class="button is-primary">
              <strong>{{this.$store.state.userData.name}}</strong>
            </router-link>
            <router-link :to="'/'" class="button is-primary">
              <strong v-on:click="signOut()">Sign Out</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pt2 columns has-text-centered is-desktop" v-bind:class="{ 'hide': !this.showBurger }" >
        <router-link to='/landing' class="light-green-text fw-sb column grey-border">
          Home
        </router-link>
        <router-link to='/events' class="sky-blue-text fw-sb column grey-border">
          Events
        </router-link>
        <router-link to='/directory' class="light-green-text fw-sb column grey-border">
          Directory
        </router-link>
        <router-link  to='/admintools' class="sky-blue-text fw-sb column grey-border">
          Admin Tools
        </router-link>
        <router-link  :to="this.profileLink" class="sky-blue-text fw-sb column grey-border">
          Profile
        </router-link>
        <a href="https://kappathetapi.com/contact-us" target="_blank" class="light-green-text fw-sb column grey-border">
          Contact
        </a>
        <a href="https://forms.gle/AeGywrUiu4Qqt2zi8" target="_blank" class="sky-blue-text fw-sb column grey-border">
          Report an issue
        </a>
        <router-link :to="'/'" class="light-green-text fw-sb column grey-border">
          <p v-on:click="signOut()">Sign Out</p>
        </router-link>
      </div>
  </nav>

</template>


<script>
import store from '@/store.js'
import { auth } from '@/main.js'
export default {
  store,

  data: function() {
    return {
      showBurger: false,
    }
  },
  computed: {
    profileLink: function(){
      if (this.$store.state.userData.uniqname === undefined){
        return '/'
      }
      return "/users/" + this.$store.state.userData.uniqname
    }
  },
  methods: {
    toggleBurger: function(){
      this.showBurger = !this.showBurger
    },
    // getImgURL: function(){
    //     return this.$store.state.userData.imageURL;
    // },

    signOut: function(){
      auth.signOut().then(()=>{
        store.commit('signOut')
      })
    }
  }
};
</script>

<style scoped>
.navimage {
  width: 105px;
  height: 55px;
}
</style>
