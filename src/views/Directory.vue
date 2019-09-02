<template>
        <section id='directory'>
            <div class="gradient pb4">
            <NavBar />
            <section id='searchBar'>
                <!-- For searching with extra options -->
                <transition name="slide-right" mode="in-out">
                <transition name="slide-right" mode="out-in">
                <section v-if="searchOptions" id='optSearch'>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <!-- Search Bar -->
                            <div class="field is-expanded is-centered">
                                <div class="control is-expanded has-icons-left has-icons-right">
                                    <input v-model='input' class="input" type="text" placeholder="Search">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Search options and settings button -->
                        <div v-if="searchOptions" class="field is-pulled-right">
                            <div class="columns is-mobile is-centered">
                                <div class="column is-one-third">
                                    <input id="activeSwitch" type="checkbox" name="activeSwitch" 
                                        v-on:click="toggleActive()"
                                        class="switch is-rounded" checked="checked" v-model="activeShow">
                                    <label for="activeSwitch">Actives</label>
                                </div>

                                <div class="column is-one-third">
                                    <input id="alumSwitch" type="checkbox" name="alumSwitch" 
                                        v-on:click="toggleAlum()"
                                        class="switch is-rounded" checked="unchecked" v-model="alumShow">
                                    <label for="activeSwitch">Alumni</label>
                                </div>
                                        
                                <!-- Settings button -->
                                <div class="column is-one-third">
                                    <div class="control">
                                        <a v-on:click="toggleSearchOptions()" class="button">
                                            <span class="icon is-small is-right">
                                                <i class="fas fa-cog"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                </transition>
                </transition>
                

                <!-- For searching without the extra options -->
                <transition name="slide-right" mode="in-out">
                <transition name="slide-right" mode="out-in">
                <section v-if="notSearchOptions" id='noOptSearch'>
                    <div class="field is-horizontal">
                        <div class="field-label"></div>
                        <div class="field-body is-expanded">
                            <!-- Search Bar -->
                            <div class="field is-expanded is-centered">
                                <div class="control is-expanded has-icons-left has-icons-right">
                                    <input v-model='input' class="input" type="text" placeholder="Search">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-search"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- Settings Button -->
                            <div class="field is-pulled-right">
                                <div class="control">
                                    <a v-on:click="toggleSearchOptions()" class="button">
                                        <span class="icon is-small is-right">
                                            <i class="fas fa-cog"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                </transition>
                </transition>
            
            </section>
            <section id='userDisplay'>
                <transition-group name='flip-list' class="columns is-centered is-multiline">
                    <div v-for="directoryInfo in searchResults(this.input)" :key="directoryInfo.uniqname" class="column is-3">
                        <directoryCard :key=0 v-bind='directoryInfo'/>
                    </div>
                </transition-group>
                <!--<infinite-loading @infinite="infiniteHandler"></infinite-loading>-->
            </section>
        </div>
        </section>
</template>



<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import InfiniteLoading from 'vue-infinite-loading';
import NavBar from '@/components/NavBar.vue';
//import infiniteScroll from 'vue-infinite-scroll';
import * as firebase from 'firebase/app';
import {db} from '@/main.js';
import { setTimeout } from 'timers';

var count = 0;
export default {
    name: 'directory',
    //directives: {infiniteScroll},
    data() {
        return {
            input: '',
            activeShow: true,
            alumShow: false, 
            searchOptions: false,
            busy: false, 
            users:
            [

            ],
            uniqnames: 
            [

            ],
            last_uniqname: '',
            num_entries: 0,
        }
    },
    methods: {
        /*infiniteHandler($state) {
            const ref = db.collection("users");
            let newUsers = ref.orderBy('uniqname').startAfter(this.last_uniqname);
            const lim = 10;
            let done = false;
            newUsers.limit(lim).get().then((snapshot) => {
            let last = snapshot.docs[snapshot.docs.length - 1];
            this.last_uniqname = last.data().uniqname;
            
            snapshot.forEach((doc) => {
                var user = doc.data();
                if (!this.uniqnames.includes(user.uniqname)) {
                    this.users.push(user);
                    this.uniqnames.push(user.uniqname)
                }
                $state.loaded();
            })
            }).catch((error) => {
                $state.complete();
            })    
        },
        */
        searchResults: function(input) {
            /*
            if (this.last_uniqname <  input) {
                //let end_point = input.substring(0, input.length - 1) + String.fromCharCode(input.charCodeAt(input.length - 1) + 1)
                const ref = db.collection('users');
                let searchUsers = ref.orderBy('uniqname').startAt(input)
                const lim = 3;
                setTimeout(() => {
                    searchUsers.limit(lim).get().then((snapshot) => {
                        //let last = snapshot.docs[snapshot.docs.length - 1];
                        //this.last_uniqname = last.data().uniqname;
                        snapshot.forEach((doc) => {
                            const user = doc.data();
                            if (!this.uniqnames.includes(user.uniqname)) {
                                this.users.push(user);
                                this.uniqnames.push(user.uniqname)
                            }
                        })
                    })
                },1000)
            }
            */
            return this.users.filter((user) => {
                if (!this.alumshow && user.year == 'Alumni') {
                    return false;
                }
                else if (!this.activeShow && user.year != 'Alumni') {
                    return false;
                }
                else {
                    var temp = input.toUpperCase();
                    return temp === user.name.substring(0,input.length).toUpperCase() || 
                           temp === user.uniqname.substring(0,input.length).toUpperCase();
                }
            })         
        },
        toggleActive: function() {
            this.activeShow = !this.activeShow
        },
        toggleAlum: function() {
            this.alumShow = !this.alumShow
        },
        toggleSearchOptions: function() {
            this.searchOptions = !this.searchOptions;
        },
    },
    computed: {
        notSearchOptions: function() {
            return !this.searchOptions;
        }
    },
    components: {
        DirectoryCard, 
        //InfiniteLoading,
        NavBar
    },
    created() {
        this.users = [];
        const ref = db.collection('users');
        ref.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.users.push(doc.data());
            })
        })
    }
}

</script>



<style scoped>
  #searchBar {
      padding-bottom: 10px;
      padding-left: 40px;
      padding-right: 40px;
      padding-top: 20px;
  }
  #userDisplay {
      padding-bottom: 10px;
      padding-right: 40px; 
      padding-left: 40px;
      padding-top: 20px;
  }
  
  .slide-right-move {
      transition: all .5s cubic-bezier(0.42,0,0.58,1);
  }
  .slide-right-enter {
      transition: all .5s;
      opacity: 0;
  }
  .slide-right-leave-active {
      transition: all .5s cubic-bezier(0.42,0,0.58,1);
      position: absolute;
  }
  .slide-right-enter-active {
      transition: all .5s cubic-bezier(0.42, 0,0.58, 1);
  }
  .slide-right-leave {
      transition: all .5s
  }

  .flip-list-move {
    transition: transform .5s;
  }
  .flip-list-enter-active {
    transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
  }
  .flip-list-leave-active {
    transition: all .5s cubic-bezier(0.42,0,0.58,1);
    position: absolute;
  }
  .flip-list-enter, .flip-list-leave-to {
    transition: all .5s;
    opacity: 0;
    transform: translateY(-30px);
  }
  .flip-list-item {
  transition: all .5s cubic-bezier(0.42,0,0.58,1);
  display: inline-block;
  }

</style>



