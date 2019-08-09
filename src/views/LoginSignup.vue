<template>
  <section id='authenticate' class="outer">
    <div class="modal" v-bind:class="{ 'is-active': signup_error }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Oops!</p>
        </header>
        <section class="modal-card-body">
          <p>It appears we recieved the error <span class="has-text-danger">"{{this.error_message}}"</span> while trying to sign you up, please try again!</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-on:click="disable_error()">Close</button>
        </footer>
      </div>
      <button class="modal-close is-large" v-on:click="disable_error()" aria-label="close"></button>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': !passwordsMatch }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Oops!</p>
        </header>
        <section class="modal-card-body">
          <p>It appears we recieved the error <span class="has-text-danger">Your passwords did not match! Please try again!</span> while trying to sign you up, please try again!</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-on:click="disable_error()">Close</button>
        </footer>
      </div>
      <button class="modal-close is-large" v-on:click="disable_error()" aria-label="close"></button>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': sent_email_verification }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Email Sent!</p>
        </header>
        <section class="modal-card-body">
          <p>A verification email was sent to <span class="light-green">"{{this.email}}"</span> please check your email
          and follow the instructions to continue. <br><br> Not recieving the email? Click <span class="has-text-link">here</span> to resend</p>

        </section>
        <footer class="modal-card-foot">
          <button class="button" v-on:click="disable_error()">Close</button>
        </footer>
      </div>
      <button class="modal-close is-large" v-on:click="disable_error()" aria-label="close"></button>
    </div>

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
                <button v-on:click="goToLogin()" class="button is-medium is-rounded button-background is-fullwidth fs-s2 fira-mono fw-bold pointer">
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


                  <!-- <InputString label="First Name" :dataLabel="payload.firstname" @newLabel="payload.firstname = $event"/> -->
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
                          <option>Rushee</option>
                          <option>Pledge</option>
                          <option>Active</option>
                          <option>Eboard</option>
                        </select>
                      </div>
                      <div class="divider slate"></div>
                  </div>

                  <div class="columns is-centered is-vcentered is-mobile">
                    <div class="column is-quarter"></div>

                    <Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />
                    <RightArrow nextSignup="S2" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>

                  </div>

                  <AlreadyHaveAccount @screenChanged="current_screen = $event"/>

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
                        <option>Kappa</option>
                        <option>Lambda</option>
                        <option>Mu</option>
                        <option>Nu</option>
                        <option>Xi</option>
                        <option>Omicron</option>
                        <option>Pi</option>
                      </select>
                    </div>
                    <div class="divider slate"></div>
                  </div>

                  <div class="columns is-centered is-vcentered is-mobile">
                    <LeftArrow nextSignup="S1" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>

                    <Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />

                    <RightArrow nextSignup="S3" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>

                  </div>

                  <AlreadyHaveAccount @screenChanged="current_screen = $event"/>

                </div>
              </div>

              <!-- Uniqname, Password, Confirm Password -->
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
                      Confirm Password
                    </div>
                    <input v-model='confirmPassword' class="input is-primary" type="password">
                    <div class="divider slate"></div>
                  </div>

                  <div class="columns is-centered is-vcentered is-mobile">
                    <LeftArrow nextSignup="S2" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>

                    <Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />

                    <RightArrow nextSignup="S4" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
                  </div>

                  <AlreadyHaveAccount @screenChanged="current_screen = $event"/>

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
                    <LeftArrow nextSignup="S3" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>

                    <Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />

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
import Dots from '@/components/login/dots.vue';
import AlreadyHaveAccount from '@/components/login/alreadyHaveAccount.vue';
import RightArrow from '@/components/login/rightArrow.vue';
import LeftArrow from '@/components/login/leftArrow.vue';
import InputString from '@/components/login/inputString.vue';

export default {
  store,
  data: function() {
    return {
        fname: '',
      uniqname: '',
      password: '',
      confirmPassword: '',
      loggedin: false,
      current_screen: 'landing',
      isSignup1: true,
      isSignup2: false,
      isSignup3: false,
      isSignup4: false,
      passwordsMatch: true,
      error_message: '',
      sent_email_verification: false,
      link_name: ["Signup now", "Have an account?"],
      signup_error: false,
      payload: {
        major: "",
        meetings_left: 0,
        firstname: "",
        lastname: "",
        points: 0,
        standing: '',
        year: '',
      },
    disablePledgeClass: false
    }
  },
  components: {
      Dots,
      AlreadyHaveAccount,
      RightArrow,
      LeftArrow,
      InputString,
  },
  computed: {
    email: function(){
      return this.uniqname + "@umich.edu"
    }
  },
  methods: {
      check(){
          console.log(this.payload.firstname);
          console.log("hello");
      },
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

      var user = firebase.auth().currentUser;
      console.log(user)
      console.log('now making account')

      //Setting for passing state through an email
      var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://www.ktpoints.netlify.com/',
      // This must be true.
      handleCodeInApp: false,
      };
      user.sendEmailVerification().then(function() {
        // Email sent.
        window.localStorage.setItem('emailForSignIn', email);
        this.sent_email_verification = true
        }).catch(function(error) {
          // An error happened.
          console.log(error)
        });



      //Need to refactor so that all verification stuff happens and then user is created
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(() => {
          console.log('in verification')
          this.sent_email_verification = true
          // Email sent.
        }).then(() => {
          console.log("new user " + this.email + " signed up")
          console.log(firebase.auth().currentUser)
          // this.addInfo();
        })
        .catch((error) => {
          this.display_error(error.code, error.message)
          console.log('bad signup');
        });
      })
      .catch((error) => {
        this.display_error(error.code, error.message)
        console.log('bad signup');
      });
    },

    addInfo: function(){
      let db = firebase.firestore();
      db.collection("users").doc(this.uniqname).set({
        name: this.payload.firstname + " " + this.payload.lastname,
        pledge_class: this.payload.pledge_class,
        standing: this.payload.standing,
        uniqname: this.uniqname,
        year: this.payload.year,
        major: this.payload.major,
        points: 0,
        meetings_left: 0,
      })
      .then(() => {
          console.log("New user registered!");
          router.push({ name: 'landing', params: { username: this.uniqname } });
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    },

    checkPasswords: function(){
        return this.passwordsMatch = (this.password === this.confirmPassword ? true : false);
    },

    display_error: function(code, message){
      console.log(code)
      console.log(message)
      this.error_message = message
      this.signup_error = true;
      //probably should try to actually display some type of info about error at some point
    },

    disable_error: function(){
      this.signup_error = false;
      this.passwordsMatch = !this.passwordsMatch;
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
