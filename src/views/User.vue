<template>
<transition name="slide-right" mode="out-in">
<section class="section" id = 'UserInfo'>
    <div class="columns is-centered">
    <div class="column is-three-fifths">
    <div class="card is-rounded">
        <div class="card-image">
            <figure class="image is-square">
                <img :src= "payload.imageURL">
            </figure>
        </div>
    <div class="card-content is-small">
        <div class="media">
            <div class="columns is-mobile is-centered">
                <div class="column">
                    <div class="media-content">
                        <p class="title fs-s3">{{ payload.name }}</p>
                        <div v-if="this.editing">
                            <p class="subtitle fs-s4 has-text-weight-bold">
                                 <span v-if="!isAlum">Year: </span>{{ payload.year }}
                            </p>
                        </div>
                        <div v-else class="control columns">
                            <p class="subtitle fs-s4 column has-text-weight-bold">
                                 <span v-if="!isAlum">Year: </span>
                            </p>
                            <div class="select column">
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

        <div class="content">
            <div class="columns is-mobile is-centered">
                <div class="column">
                    <div class="fs-s4 has-text-weight-bold">
                        <div v-if="this.editing">Major: {{ payload.major }}</div>
                        <div v-else>Major: <input v-model="payload.major"></div>
                    </div>
                </div>
                <div class="column">
                    <div class="fs-s4 has-text-weight-bold">
                        <div v-if="this.editing">Pledge Class: {{ payload.pledge_class }}</div>
                        <div v-else>Pledge Class: <input v-model="payload.pledge_class"></div>
                    </div>
                </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
                <p class="control">
                <a v-bind:href="messengerURL" class="button is-large is-rounded is-info">
                    <span class="icon is-medium">
                        <i class="fab fa-facebook-messenger"></i>
                    </span>
                </a>
                </p>
                <p class="control">
                <a v-bind:href="email" class="button is-large is-rounded is-primary">
                    <span class="icon is-medium">
                        <i class="fas fa-envelope"></i>
                    </span>
                </a>
                </p>
            </div>
            <h1 class="fs-s2">About Me</h1>
            <p>Hello, I am in KTP - wow!</p>

            <h1 class="fs-s2">Career Interests</h1>
            <p>I have interests, like many people in KTP</p>


        </div>

        <div v-if="isUser" class="level buttons are-large">
            <div v-if="this.editing" v-on:click="toggleEditing()" class="level-item has-text-centered">
                <a class="button is-success is-rounded">Edit</a>
            </div>
            <div v-else v-on:click="toggleEditing(); updateFirebase()" class="level-item has-text-centered">
                <a class="button is-danger is-rounded">Save</a>
            </div>

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
        isAlum: function() {
            if (this.year == 'Alumni') {
                return true;
            }
            return false;
        },
        isUser: function(){
            return (this.$store.state.userData.uniqname === this.uniqname ? true : false);
        },
        email: function() {
            return 'mailto:' + this.uniqname + '@umich.edu'
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
</style>

<style>
    .is-horizontal-center {
      justify-content: center
    }
</style>
