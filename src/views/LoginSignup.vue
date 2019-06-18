<template>
  <section id='authenticate' class="hero is-fullheight">
    
    <div class="columns is-centered">
      <div class="column is-narrow">
        <!-- Level setup to center KTP Logo -->
        <div class="level">
          <div class="mt4 level-item has-text-centered">
            <img src="@/assets/ktp_logo.png" alt="KTP Logo">
          </div>
        </div>

        <!-- uniqname and @umich.edu box -->
        <div class="field has-addons">
          <div class="control is-expanded">
            <input v-model='uniqname' class="input is-primary" type="text" placeholder="Uniqname">
          </div>
          <div class="control">
            <button class="button is-static">
              @umich.edu
            </button>
          </div>
        </div> 

        <!-- Password -->
        <div class="field">
          <div class="control">
            <input v-on:keyup.enter="authenticate()" v-model='password' class="input is-primary" type="password" placeholder="Password">
          </div>
        </div> 

        
        <div class="reflow">
          <div class='field' v-show="button_index">
            <div class="field is-grouped">
              <div class="control is-expanded">
                <input v-model='payload.firstname' class="input is-primary" type="text" placeholder="First Name">
              </div>   
    
              <div class="control is-expanded">
                <input v-model='payload.lastname' class="input is-primary" type="text" placeholder="Last Name">
              </div> 
            </div>

            <div class="field is-grouped">

            <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model='payload.standing'>
                    <option value="">KTP Standing</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pledge</option>
                    <option>Rushee</option>
                  </select>
                </div>        
            </div>    

            <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model='payload.year'>
                    <option value="">Class Standing</option>
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>        
            </div>

            <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model='payload.pledge_class' :disabled='disablePledgeClass'>
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
            </div>

          </div>

          </div>
        </div>


        <div class="field mt4 mb4">
          <div class="control">
            <button v-on:click="authenticate()" class="button is-large is-rounded button-background is-fullwidth">
              {{button_name[button_index]}}
            </button>
          </div>
        </div>
        
        <a v-on:click='toggleButton()'>{{link_name[button_index]}}</a>

      </div>
    </div>

  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router.js'
import * as firebase from 'firebase/app';

export default {
  data: function() {
    return {
      uniqname: '',
      password: '',
      loggedin: false,
      button_name: ['Sign in', 'Sign up'],
      link_name: ["Sign up now!", "Have an account?"],
      button_index: 0,
      payload: {
        major: "",
        meetings_left: 0,
        firstname: "",
        lastname: "",
        pledge_class: "", 
        points: 0,
        standing: '',
        uniqname: '',
        year: ''
      },
    disablePledgeClass: false
    }
  },
  computed: {
    email: function(){
      return this.uniqname + "@umich.edu"
    }
  },
  methods: {
    login: function(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('we made it');
        this.loggedin = true;
        router.push('user/' + this.uniqname + '/') // -> /user/myName
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
      db.collection("users").doc(this.uniqname).set({
        name: this.payload.firstname + " " + this.payload.lastname,
        pledge_class: this.payload.pledge_class,
        standing: this.payload.standing,
        uniqname: this.uniqname,
        year: this.payload.year,
        major: "CS",
        points: 0,
        meetings_left: 0,
      })
      .then(function() {
          console.log("Document successfully written!");
          let username = this.uniqname;
          router.push({ name: 'user', params: { username } }) // -> /user/myName
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    },

    toggleButton: function(){
      this.button_index = 1 - this.button_index;
    },

    authenticate: function(){
      if (this.button_index === 0){
        this.login();
      }
      else if (this.button_index === 1){
        this.signup();
      }
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
  mounted() {
    // this.$smoothReflow({
    //   el: '.reflow'
    // })
  },
};
</script>
