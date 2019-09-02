<template>
<div>
<div class="gradient pb4">
<NavBar />
<transition name="slide-right" mode="out-in">
<section class="section" id = 'UserInfo'>

    <div class="card" id="user-container">
    <div class="columns is-centered is-vcentered">
    <div class="column is-two-fifths">
        <div class="card-image">
            <div v-if="this.editing">
                <figure class="image is-square">
                    <img :src= "payload.imageURL">
                </figure>
            </div>
            <div v-if="!this.editing" class="cropper-wrapper">
                <div :style="{backgroundImage: 'url(' + payload.imageURL + ')'}" class="cropper-background"></div>
                <Cropper
                    class="cropper"
                    @change="change"
                    :src= "payload.imageURL"
                    :stencilProps="{
                        aspectRatio: 1/1
                    }"
                />
            </div>
        </div>
        <div class="button-links field is-grouped is-grouped-centered buttons are-large">
            <a v-bind:href="messengerURL" class=" button is-rounded is-info" target="_blank">
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
                <div v-else  class=" level has-text-centered ">
                    <div class="level-item margin-fix">
                        <a class="button is-light is-rounded" @click="onPickFile">Upload a file</a>
                        <input type="file"
                            style="display: none;"
                            ref="fileInput"
                            accept="image/*"
                            @change="onFilePicked"
                            >
                    </div>
                    <div v-on:click="updateFirebase(); toggleEditing()" class="level-item">
                        <a class="button is-danger is-rounded" v-bind:class="{'is-loading':!this.allChangesSaved}">Save</a>
                    </div>


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
                                        <div class="select is-focused is-rounded margin-left-fix">
                                            <select v-model="payload.year">
                                                <option>Freshman</option>
                                                <option>Sophomore</option>
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
                                <input class="input is-focused is-small is-rounded" type="text" v-model="payload.major">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="is-mobile is-centered">
                    <div class="subtitle fs-s4 has-text-weight-bold">
                        <div v-if="this.editing">Pledge Class: {{ payload.pledge_class }}</div>
                        <div v-else class="level">
                            <div class="level-left">Pledge Class:</div>
                            <div class="level-item pledge-class-select">
                                <div class="select is-focused is-rounded is-small pledge-class-select">
                                    <select v-model="payload.pledge_class">
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
                                    </select>
                                </div>
                                <!-- <input class="input is-focused is-small" type="text" v-model="payload.pledge_class"> -->
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
</div>
</div>

</template>


<script>

import store from '@/store.js';
import {db, storage} from '@/main.js';
import NavBar from '@/components/NavBar.vue';
import { Cropper } from 'vue-advanced-cropper'


export default {
    store,
    props: ['uniqname','major','name','pledge_class','year','imageURL'],
    data(){
        return {
            editing: true,
            allChangesSaved: true,
            payload: {
                name: this.name,
                major: this.major,
                pledge_class: this.pledge_class,
                year: this.year,
                imageURL: this.imageURL,
                image: null,
            },
            coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0
			},
			image: null
        }
    },
    methods: {
        toggleEditing: function(){
            this.editing = !this.editing;
        },
        change({coordinates, canvas}) {
            console.log(coordinates, canvas)
        }, 
        updateFirebase: function(){
            this.allChangesSaved = false;
            db.collection("users").doc(this.uniqname).update({
                imageURL: this.payload.imageURL,
                pledge_class: this.payload.pledge_class,
                year: this.payload.year,
                major: this.payload.major,
            })
            .then(() => {
                this.allChangesSaved = true;
                console.log("User updated!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },
        onPickFile(){
            this.$refs.fileInput.click();
        },
        onFilePicked(event){
            this.allChangesSaved = false;
            const fileIMG = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(fileIMG)

            // Use file reader so that the image can be previewed
            this.payload.image = fileIMG;

            reader.addEventListener('load', () => {
                this.payload.imageURL = reader.result;
                // Store the image in the storage section of Firebase
                storage.ref('profile_pictures/' + this.uniqname + '.jpg').put(this.payload.image)
                .then((fileData) => {
                    // Get the URL generated from uploading the image
                    fileData.ref.getDownloadURL()
                    .then((url) => {
                        // Setting the imageURL appropriately
                        this.payload.imageURL = url;
                        console.log("Image fully uploaded");
                        this.allChangesSaved = true;
                    })
                    // gsImageURL = fileData.metadata.downloadURLs[0];
                })
            })
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
        },
    },components: {
      NavBar,
      Cropper,
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
  .pledge-class-select{
      justify-content: left;
      margin-left: 0.25rem;
  }
  .margin-left-fix {
      margin-left: 0.5rem;
  }
  .margin-fix{
      margin-right: 0.5rem;
  }
  .cropper-wrapper {
	position: relative;
	height: 400px;
	background: black;
}
.cropper-background {
	position: absolute;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: 50%;
	filter: blur(5px);
	opacity: 0.25;
}



</style>

<style>
    .is-horizontal-center {
      justify-content: center
    }
</style>
