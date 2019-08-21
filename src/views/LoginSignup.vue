<template>
  <section id='authenticate' class="outer">
    <div class="container middle">
      <div class="columns is-centered inner">
        <div class="column is-narrow ">
          <!-- Level setup to center KTP Logo -->
          <div class="level mb4">
            <div class="mt4 level-item has-text-centered">
              <img src="@/assets/ktp_logo.png" alt="KTP Logo">
            </div>
          </div>

          <transition name="slide-left" mode="out-in">
            <div v-if="current_screen == 'landing'" key="landing" class="mt4 pt4">
              <!-- Button for Logging in -->
              <div class="control">
                <button v-on:click="goToLogin()" class="button is-medium is-rounded button-background is-fullwidth fs-s3 fira-mono fw-bold pointer">
                  Log In
                </button>
              </div>

              <!-- Button for Signing up -->
              <div class="control mt2">
                <button v-on:click="goToSignup()" class="button is-medium is-rounded button-background is-fullwidth fs-s3 fira-mono fw-bold pointer">
                  Sign up
                </button>
              </div>
              
              <!-- Continue as Guest -->
              <router-link to="/landing">
                <div class="align-center fira-sans-light-italic mt2 dark-blue">
                  or continue <a class="sky-blue-text fw-lb">  Without an Account</a>
                </div>
              </router-link>
            </div>

            <div v-if="current_screen == 'login'" key="login" >
              <!-- uniqname and @umich.edu box -->
              <div class="field has-addons">
                <div class="control is-expanded">
                  <div class="fira-sans-light-italic slate">
                    Uniqname
                  </div>
                  <input v-model='uniqname' class="input is-primary" type="text">
                  <div class="divider slate"></div>
                </div>
              </div> 

              <!-- Password -->
              <div class="field">
                <div class="control">
                  <div class="fira-sans-light-italic slate">
                    Password
                  </div>
                  <input v-on:keyup.enter="login()" v-model='password' class="input is-primary" type="password">
                   <div class="divider slate"></div>
                </div>
              </div> 
              <div class="control">
                <button v-on:click="login()" class="button is-medium is-rounded button-background is-fullwidth fs-s3 fira-mono fw-bold pointer">
                  Log In
                </button>
              </div>
              <div class="align-center fira-sans-light-italic mt3">
                Don't have an Account? 
                <a class="sky-blue-text fw-lb" v-on:click='goToSignup()'>Sign Up Here</a>
              </div>
              <div class="align-center fira-sans-light-italic mt2">
                  Forgot Password? <a class="light-green-text fw-lb"> Click here to Reset</a>
              </div>
            </div>

            <div v-if="current_screen == 'signup'" key="signup">
              <div v-if="!isSignup4" class="fs-s2 fira-mono fw-bold pb3 has-text-centered">
                Sign up
              </div>
              <!-- First Name, Last Name, KTP Standing -->
              <div v-if="isSignup1" key="signup-1">
                <div class='field' >
                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      First Name
                    </div>
                    <input v-model='payload.firstname' class="input is-primary" type="text">
                    <div class="divider slate"></div>
                  </div>   
        
                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Last Name
                    </div>
                    <input v-model='payload.lastname' class="input is-primary" type="text">
                    <div class="divider slate"></div>
                  </div> 

                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      KTP Standing
                    </div>
                      <div class="select is-fullwidth no-border">
                        <select class="no-border" v-model='payload.standing'>
                          <option value=""></option>
                          <option value="Guest">Rushee</option>
                          <option value="Guest">Pledge</option>
                          <option>Active</option>
                        </select>
                      </div>  
                      <div class="divider slate"></div>      
                  </div>    

                  <div class="columns is-centered is-vcentered is-mobile">
                    <div class="column is-quarter">
                    </div>
                    <div style="font-size: 0.7rem;" class="column is-half has-text-centered">
                      <div class="columns is-centered is-mobile">
                        <i v-bind:class="{ 'sky-blue': isSignup1}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i class="column fas fa-circle fa-xs light-grey"></i>
                        <i class="column fas fa-circle fa-xs light-grey"></i>
                        <i class="column fas fa-circle fa-xs light-grey"></i> 
                      </div>
                    </div>
                    <div class="column has-text-centered pointer" v-on:click='goToSignup2()'>
                      <i class="fas fa-arrow-right fa-2x sky-blue-text"></i>
                    </div>
                  </div>

                  <div class="align-center pb1 fira-sans-light-italic mt1">
                  Already have an Account? 
                  <a class="light-green-text fw-lb" v-on:click='goToLogin()'>Login Here</a>
                  </div>
                </div>
              </div>

              <!-- Major, Year, Pledge Class -->
              <div v-if="isSignup2" key="signup-2">
                <div class='field' >
                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Major
                    </div>
                    <input v-model='payload.major' class="input is-primary" type="text">
                    <div class="divider slate"></div>
                  </div>   
        
                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Year
                    </div>
                    <div class="select is-fullwidth no-border">
                        <select class="no-border" v-model='payload.year'>
                          <option value=""></option>
                          <option>Freshman</option>
                          <option>Sophomore</option>
                          <option>Junior</option>
                          <option>Senior</option>
                          <option>Alumni</option>
                        </select>
                      </div>  
                    <div class="divider slate"></div>
                  </div> 

                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Pledge Class
                    </div>
                    <div class="select is-fullwidth no-border">
                      <select class="no-border" v-model='payload.pledge_class' :disabled='disablePledgeClass'>
                        <option value="">Pledge Class</option>
                          <option>Alpha</option>
                          <option>Beta</option>
                          <option>Gamma</option>
                          <option>Delta</option>
                          <option>Epsilon</option>
                          <option>Zeta</option>
                          <option>Eta</option>
                          <option>Theta</option>
                          <option>Iota</option>
                          <option>Kappa</option>
                          <option>Lambda</option>
                          <option>Mu</option>
                          <option>Nu</option>
                          <option>Xi</option>
                          <option>Omicron</option>
                          <option>Pi</option>
                          <option>Rushee</option>
                      </select>
                    </div>  
                    <div class="divider slate"></div>  
                  </div>    

                  <div class="columns is-centered is-vcentered is-mobile">
                    <div v-on:click="goToSignup1()" class="column is-quarter has-text-centered pointer">
                      <i class="fas fa-arrow-left fa-2x sky-blue-text"></i>
                    </div>
                    <div style="font-size: 0.7rem;" class="column is-half has-text-centered">
                      <div class="columns is-centered is-mobile">
                        <i v-bind:class="{ 'sky-blue': isSignup1}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup2}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup3}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup4}" class="column fas fa-circle fa-xs light-grey"></i> 
                      </div>
                    </div>
                    <div class="column has-text-centered pointer" v-on:click='goToSignup3()'>
                      <i class="fas fa-arrow-right fa-2x sky-blue-text"></i>
                    </div>
                  </div>

                  <div class="align-center pb1 fira-sans-light-italic mt1">
                  Already have an Account? 
                  <a class="light-green-text fw-lb" v-on:click='goToLogin()'>Login Here</a>
                  </div>
                </div>
              </div>

              <!-- Uniqname, Password -->
              <div v-if="isSignup3" key="signup-3">
                <div class='field' >

                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Uniqname
                    </div>
                    <input v-model='uniqname'  class="input is-primary" type="text">
                    <div class="divider slate"></div>  
                  </div> 

                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Password
                    </div>
                    <input v-model='password'  class="input is-primary" type="password">
                    <div class="divider slate"></div>
                  </div>   
        
                  <div class="control is-expanded pb3">
                    <div class="fira-sans-light-italic slate">
                      Confirm  Password
                    </div>
                    <input  class="input is-primary" type="password">
                    <div class="divider slate"></div>
                  </div>    

                  <div class="columns is-centered is-vcentered is-mobile">
                    <div v-on:click='goToSignup2()' class="column is-quarter has-text-centered pointer">
                      <i class="fas fa-arrow-left fa-2x sky-blue-text"></i>
                    </div>
                    <div style="font-size: 0.7rem;" class="column is-half has-text-centered">
                      <div class="columns is-centered is-mobile">
                        <i v-bind:class="{ 'sky-blue': isSignup1}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup2}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup3}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup4}" class="column fas fa-circle fa-xs light-grey"></i> 
                      </div>
                    </div>
                    <div class="column has-text-centered pointer" v-on:click='goToSignup4()'>
                      <i class="fas fa-arrow-right fa-2x sky-blue-text"></i>
                    </div>
                  </div>

                  <div class="align-center pb1 fira-sans-light-italic mt1">
                  Already have an Account? 
                  <a class="light-green-text fw-lb" v-on:click='goToLogin()'>Login Here</a>
                  </div>
                </div>
              </div>

              <!-- Notice -->
              <div v-if="isSignup4" key="signup-4">
                <div class='field' >
                  <div class="fs-s2 fira-mono fw-bold pb2 has-text-centered">
                    One Last Thing
                  </div>  
                  <div class="control fira-sans fs-s4 is-expanded pb2 has-text-centered">
                    If you are an Active or an Alumni, there will be a pending <br>
                    process while we approve your identity.
                      <br>
                      <br>
                    If you are a Pledge or Rushee, welcome! You are able to <br>
                    explore immediately, although you don't have access to <br>
                    full functionality of the app.
                  </div>
                  <div class="columns is-centered is-vcentered is-mobile pb4">
                    <div v-on:click='goToSignup3()' class="column is-quarter has-text-centered pointer">
                      <i class="fas fa-arrow-left fa-2x sky-blue-text"></i>
                    </div>
                    <div style="font-size: 0.7rem;" class="column is-half has-text-centered">
                      <div class="columns is-centered is-mobile">
                        <i v-bind:class="{ 'sky-blue': isSignup1}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup2}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup3}" class="column fas fa-circle fa-xs light-grey"></i>
                        <i v-bind:class="{ 'sky-blue': isSignup4}" class="column fas fa-circle fa-xs light-grey"></i> 
                      </div>
                    </div>
                    <div class="column has-text-centered pointer fira-sans sky-blue-text fw-lb fs-s4" >
                      <div class="control has-text-centered">
                        <button v-on:click="signup()" class="button is-small is-rounded fs-s4 fira-sans-light-italic fw-lb sky-blue-button pointer">
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router.js'
import store from '@/store.js'
import * as firebase from 'firebase/app';

export default {
  store,
  data: function() {
    return {
      uniqname: '',
      password: '',
      loggedin: false,
      current_screen: 'landing',
      isSignup1: true,
      isSignup2: false,
      isSignup3: false,
      isSignup4: false,
      link_name: ["Signup now", "Have an account?"],
      payload: {
        major: '',
        meetings_left: 0,
        firstname: '',
        lastname: '',
        points: 0,
        standing: '',
        year: '',
        imageURL: '',
      },
    disablePledgeClass: false
    }
  },
  computed: {
    email: function(){
      return this.uniqname.toLowerCase() + "@umich.edu"
    }
  },
  methods: {
    login: function(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('we made it');
        this.loggedin = true;
        router.push({ name: 'landing', params: { username: this.uniqname } })
      })
      .catch(function(error) {
        console.log('BAD');
        console.log(error);
      });      
    },

    signup: function(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log("new user " + this.email + " signed up")
        this.addInfo();
      })
      .catch(function(error) {
        console.log('bad signup');
        console.log(error);
      });      
    },

    addInfo: function(){
      let db = firebase.firestore();
      db.collection("users").doc(this.uniqname.toLowerCase()).set({
        name: this.payload.firstname + " " + this.payload.lastname,
        pledge_class: this.payload.pledge_class,
        standing: this.payload.standing,
        uniqname: this.uniqname.toLowerCase(),
        year: this.payload.year,
        major: this.payload.major,
        points: 0,
        meetings_left: 0,
        about: '',
        career_interests: '',
        attended: [],
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/ktpoints-68071.appspot.com/o/profile_pictures%2Fanon.jpg?alt=media&token=d247e41a-a235-4750-9e08-b78348e54e90'
      })
      .then(() => {
          console.log("New user registered!");
          router.push({ name: 'landing', params: { username: this.uniqname } });
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    },

    goToLogin: function(){
      if (this.$store.state.userAuth !== null){
        router.push('/landing');
      }
      this.current_screen = "login";
    },

    goToSignup: function(){
      this.current_screen = "signup";
    },

    goToSignup1: function(){
      this.isSignup1 = true;
      this.isSignup2 = false;
      this.isSignup3 = false;
      this.isSignup4 = false;
    },

    goToSignup2: function(){
      this.isSignup1 = false;
      this.isSignup2 = true;
      this.isSignup3 = false;
      this.isSignup4 = false;
    },

    goToSignup3: function(){
      this.isSignup1 = false;
      this.isSignup2 = false;
      this.isSignup3 = true;
      this.isSignup4 = false;
    },

    goToSignup4: function(){
      this.isSignup1 = false;
      this.isSignup2 = false;
      this.isSignup3 = false;
      this.isSignup4 = true;
    },
  },

  watch: {
    'payload.standing': function(){
      if (this.payload.standing == 'Rushee'){
        this.disablePledgeClass = true;
        this.payload.pledge_class = '';
      }
      else{
        this.disablePledgeClass = false;
      }
    },
  },

};
</script>

<style scoped>
  /* Add some padding on this component for mobile */
  #authenticate{
    padding-left: 10px;
    padding-right: 10px;
  }
    
  .slide-left-enter-active {
    transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-left-leave-active {
    transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-left-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide-right-enter-active {
    transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-right-leave-active {
    transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-right-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
</style>

