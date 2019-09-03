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
            <figure class="image is-square">
                <img :src= "payload.imageURL">
            </figure>
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
                                    <p class="title fs-s2 is-capitalized">{{ payload.name }} /</p>
                                </div>
                                <div class="level-item">
                                    <div v-if="this.editing">
                                        <p class="title fs-s2 ">
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
                    <div class="subtitle fs-s4">
                        <div v-if="this.editing">
                            <span class="fw-sb"> Major: </span>
                            <span > {{ payload.major }} </span>
                        </div>
                        <div v-else class="control">
                            <div class="select is-focused is-rounded margin-left-fix">
                                <select v-model='tempMajor'>
                                    <option value="">Select Major</option>
                                    <option>Computer Science</option>
                                    <option>SI - UX</option>
                                    <option>SI - IA</option>
                                    <option>Data Science</option>
                                    <option>Prospective SI</option>
                                    <option>Computer Engineering</option>
                                    <option>BBA</option>
                                    <option>Undeclared</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div v-if="tempMajor === 'Other'" class="mt1">
                                <input v-model='payload.major' class="input is-primary" type="text" placeholder="Enter other major here">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <div class="is-mobile is-centered">
                    <div class="subtitle">
                        <div v-if="this.editing">
                            <span class="fs-s5 fw-sb">Pledge Class:</span>
                            <span class="fs-s5"> {{ payload.pledge_class }} </span>
                        </div>
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

                <h1 class="fs-s4 fw-sb">About Me</h1>
                    <div v-if="this.editing">
                        <p>
                            {{ payload.about }}
                        </p>
                    </div>
                    <div v-else>
                        <textarea class="textarea" v-model="payload.about" ></textarea>
                    </div>


                <h1 class="fs-s4 fw-sb">Interests</h1>
                    <div v-if="this.editing">
                        <p>
                            {{ payload.interests }}
                        </p>
                    </div>
                    <div v-else>
                        <textarea class="textarea" v-model="payload.interests" ></textarea>
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


export default {
    store,
    props: ['uniqname','major','name','pledge_class','year','imageURL'],
    data(){
        return {
            editing: true,
            allChangesSaved: true,
            tempMajor: '',
            payload: {
                name: this.name,
                major: this.major,
                pledge_class: this.pledge_class,
                year: this.year,
                imageURL: this.imageURL,
                image: null,
                about: '',
                interests: '',
            },
        }
    },
    methods: {
        toggleEditing: function(){
            this.editing = !this.editing;
        },
        updateFirebase: function(){
            this.allChangesSaved = false;
            if (this.tempMajor !== 'Other') {
                this.payload.major = this.tempMajor
            }
            db.collection("users").doc(this.uniqname).update({
                imageURL: this.payload.imageURL,
                pledge_class: this.payload.pledge_class,
                year: this.payload.year,
                major: this.payload.major,
                about: this.payload.about,
                interests: this.payload.interests,
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



</style>

<style>
    .is-horizontal-center {
      justify-content: center
    }
</style>
