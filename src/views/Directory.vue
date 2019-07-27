<template>
    <section id='directory'>
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
                                    class="switch" checked="checked" v-model="activeShow">
                                <label for="activeSwitch">Actives</label>
                            </div>

                            <div class="column is-one-third">
                                <input id="alumSwitch" type="checkbox" name="alumSwitch" 
                                    v-on:click="toggleAlum()"
                                    class="switch" checked="unchecked" v-model="alumShow">
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
        
        <!-- Flip List User display -->
        <section id='userDisplay'>
            <div>
                <transition-group name='flip-list' class="columns is-centered is-multiline">
                <div v-for="directoryInfo in searchResults(this.input)" :key="directoryInfo.uniqname" class="column is-3">
                    <directoryCard :key=0 v-bind='directoryInfo'/>
                </div>
                </transition-group>
            </div>
        </section>

    </section>
</template>



<!--
<div class="column is-one-fifth">
                    <transition name="slide-left" mode="out-in">
                        <aside class="menu is-pulled-right">
                            <p class="menu-label">
                                Search Options
                            </p>
                        </aside>
                    </transition>
                </div>


-->

<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import * as firebase from 'firebase/app';
import {database} from '@/main.js';
//import { userInfo } from 'os';

export default {
    data() {
        return {
            input: '',
            activeShow: true,
            alumShow: false, 
            searchOptions: false,
            users: 
            [
                
            ],
        }
    },
    methods: {
        searchResults: function(input) {

            return this.users.filter((user) => {
                if (!this.alumShow && user.year == 'Alumni') {
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
        }
    },
    computed: {
        notSearchOptions: function() {
            return !this.searchOptions;
        }
    },
    components: {
        DirectoryCard
    },
    mounted() {
        database.collection("users").onSnapshot((querySnapshot) => {
            this.users = [];
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