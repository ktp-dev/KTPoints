<template>
  <nav class="navbar white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item navimage" to="/landing">
        <img src="@/assets/ktp_logo.png" width="112" height="50">
      </router-link>

      <a role="button" v-on:click="toggleBurger()" v-bind:class="{ 'is-active': this.showBurger }"  class="navbar-burger burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to='/events' class="navbar-item">
          Events
        </router-link>
        <router-link to='/directory' class="navbar-item">
          Directory
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <router-link :to="this.profileLink" class="navbar-item">
              Profile
            </router-link>
            <a href="https://kappathetapi.com/contact-us" target="_blank" class="navbar-item">
              Contact
            </a>
            <a href="https://kappathetapi.com" class="navbar-item" target="_blank">
              KTPublic Site
            </a>
            <router-link v-if="this.$store.state.userData.standing === 'Eboard'" to='/admintools' class="navbar-item">
              Admin Tools
            </router-link>
            <hr class="navbar-divider">
            <a href="https://forms.gle/AeGywrUiu4Qqt2zi8" target="_blank" class="navbar-item">
              Report an issue
            </a>
            <hr v-if="this.$store.state.userData.uniqname !== undefined" class="navbar-divider">
            <a v-if="this.$store.state.userData.uniqname !== undefined" v-on:click="signOut()" class="navbar-item">
              Sign out
            </a>
            
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="this.$store.state.userData.uniqname === undefined"  class="buttons">
            <router-link to="/" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
          </div>
          <div v-if="this.$store.state.userData.uniqname !== undefined"  class="buttons">
            <router-link :to="this.profileLink" class="button no-border background-hover-grey">
              <img :src="this.$store.state.userData.imageURL" class="navbar-user-photo pr1">
              <p class="dark-blue fw-sb">{{this.$store.state.userData.name}}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pt2 columns has-text-centered is-desktop" v-bind:class="{ 'hide': !this.showBurger }" >
        <router-link to='/events' class="sky-blue-text fw-sb column grey-border">
          Events
        </router-link>
        <router-link to='/directory' class="light-green-text fw-sb column grey-border">
          Directory
        </router-link>
        <a href="https://kappathetapi.com" class="sky-blue-text fw-sb column grey-border" target="_blank">
          KTPublic Site
        </a>
        <router-link v-if="this.$store.state.userData.standing === 'Eboard'"  to='/admintools' class="light-green-text fw-sb column grey-border">
          Admin Tools
        </router-link>
        <router-link  :to="this.profileLink" class="light-green-text fw-sb column grey-border">
          Profile
        </router-link>
        <a href="https://kappathetapi.com/contact-us" target="_blank" class="sky-blue-text fw-sb column grey-border">
          Contact
        </a>
        <a href="https://forms.gle/AeGywrUiu4Qqt2zi8" target="_blank" class="light-green-text fw-sb column grey-border">
          Report an issue
        </a>
        <div v-if="this.$store.state.userData.uniqname !== undefined" class="sky-blue-text fw-sb column grey-border">
          <a v-on:click="signOut()">Sign Out</a>
        </div>
      </div>
  </nav>

</template>


<script>
import store from '@/store.js'
import router from '@/router.js'
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

    signOut: function(){
      auth.signOut().then(()=>{
        store.commit('signOut')
      }).then(() => {
        router.push('/')
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
