<template>
<transition name="slide-right" mode="out-in">
<section class="section" id = 'UserInfo'>
    <div class="card" id="user-container">
    <div class="columns is-centered is-vcentered">
    <div class="column is-two-fifths">
        <div class="card-image">
            <figure class="image is-square">
                <img :src= "payload.imageURL">
            </figure>
        </div>
        <div class="button-links field is-grouped is-grouped-centered buttons are-large">
            <a v-bind:href="messengerURL" class=" button is-rounded is-info"target="_blank">
                <span class="icon is-medium">
                    <i class="fab fa-facebook-messenger"></i>
                </span>
            </a>

            <a v-bind:href="email" class="button is-rounded is-primary" target="_blank">
                <span class="icon is-medium">
                    <i class="fas fa-envelope"></i>
                </span>
            </a>
            <div v-if="isUser">
                <div v-if="this.editing" v-on:click="toggleEditing()" class=" has-text-centered">
                    <a class="button is-success is-rounded">Edit</a>
                </div>
                <div v-else v-on:click="toggleEditing(); updateFirebase()" class=" has-text-centered ">
                    <a class="button is-danger is-rounded">Save</a>
                </div>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="card-content is-small">
            <div class="media">
                <div class="is-mobile is-centered">
                    <div class="">
                        <div class="media-content">
                            <div class="level has-text-weight-bold">
                                <div class="level-item">
                                    <p class="title fs-s3 is-capitalized">{{ payload.name }} /</p>
                                </div>
                                <div class="level-item">
                                    <div v-if="this.editing">
                                        <p class="title fs-s3 ">
                                             / {{ payload.year }}
                                        </p>
                                    </div>
                                    <div v-else class="control ">
                                        <div class="select is-focused">
                                            <select v-model="payload.year">
                                                <option>Freshmen</option>
                                                <option>Sophmore</option>
                                                <option>Junior</option>
                                                <option>Senior</option>
                                                <option>Alumni</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="is-mobile is-centered">
                    <div class="subtitle fs-s4 has-text-weight-bold">
                        <div v-if="this.editing">Major: {{ payload.major }}</div>
                        <div v-else class="level">
                            <div class="level-left">Major: </div>
                            <div class="level-item">
                                <input class="input is-focused is-small" type="text" v-model="payload.major">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="is-mobile is-centered">
                    <div class="subtitle fs-s4 has-text-weight-bold">
                        <div v-if="this.editing">Pledge Class: {{ payload.pledge_class }}</div>
                        <div v-else class="level">
                            <div class="level-left">Pledge Class:</div>
                            <div class="level-item">
                                <input class="input is-focused is-small" type="text" v-model="payload.pledge_class">
                            </div>
                        </div>
                    </div>
                </div>

                <h1 class="fs-s2">About Me</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h1 class="fs-s2">Career Interests</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>



        </div>
    </div>
    </div>
    </div>
</section>
</transition>
</template>


<script>

import store from '@/store.js'
import * as firebase from 'firebase/app';
import {db} from '@/main.js'

export default {
    store,
    props: ['uniqname','major','name','pledge_class','year','imageURL'],
    data(){
        return {
            editing: true,
            payload: {
                name: this.name,
                major: this.major,
                pledge_class: this.pledge_class,
                year: this.year,
                imageURL: this.imageURL,
            },
        }
    },
    methods: {
        toggleEditing: function(){
            this.editing = !this.editing;
        },
        updateFirebase: function(){
            let dbFirestone = firebase.firestore();
            console.log("imgURL:", this.payload.imageURL);


            dbFirestone.collection("users").doc(this.uniqname).update({
                imageURL: this.payload.imageURL,
                pledge_class: this.payload.pledge_class,
                year: this.payload.year,
                major: this.payload.major,
            })
            .then(() => {
                console.log("User updated!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
    },
    computed: {
        isUser: function(){
            return (this.$store.state.userData.uniqname === this.uniqname ? true : false);
        },
        email: function() {
            return 'mailto:' + this.payload.uniqname + '@umich.edu'
        },
        messengerURL: function() {
            return 'https://www.messenger.com/'
        }
    },

    mounted(){
        // If the page is refreshed/redirected to, the values are gathered here
        if(this.name === undefined){
          // Make firebase call and set the above information using the uniqname
          db.collection('users').doc(this.uniqname).get().then((doc)=>{
            this.payload = doc.data();
          })
        }
    }
}
</script>

<style scoped>
  /* Add some padding on this component for mobile */
  #UserInfo{
    padding-left: 50px;
    padding-right: 50px;
  }

  #user-container {
      padding: 10px;
  }

  .button-links {
      padding-top: 10px;
  }
  input {
      margin-left: 10px;
  }



</style>

<style>
    .is-horizontal-center {
      justify-content: center
    }
</style>
