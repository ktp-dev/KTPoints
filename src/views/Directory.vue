<template>
        <section id='directory'>
            <div class="gradient pb4">
            <NavBar />
            <section id='searchBar'>
                <!-- For searching without the extra options -->
                <transition name="slide-right" mode="in-out">
                <transition name="slide-right" mode="out-in">
                <section id='noOptSearch'>
                    <div class="field">
                            <!-- Search Bar -->
                            
                            <div class="columns is-centered is-mobile">
                                <div class="column"></div>
                                <div class="column is-four-fifths">
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
                                <div class="column">
                                    <a v-on:click="launch" class="button">
                                        <span class="icon is-small is-right">
                                            <i class="fas fa-cog"></i>
                                        </span>
                                    </a>
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
            </section>
            <div class="modal" v-bind:class="{'is-active':modalActive}">
                <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Directory Options</p>
                            <button class="delete" aria-label="close" v-on:click="close"></button>
                        </header>
                        <section class="modal-card-body">
                            <section class="modal-card-content">
                                <header class="text fs-s5">Search By: </header>
                                <div class="columns is-centered is-mobile">
                                    <div class="column">
                                        <div class="field is-grouped pl2">
                                            <p class="pr1">
                                                <vb-switch type="success" size="medium" v-model="searchYear"/>
                                            </p>
                                            <p> Year </p>
                                        </div>
                                        <div class="field is-grouped pl2">
                                            <p class="pr1">
                                                <vb-switch type="success" size="medium" v-model="searchMajor"/>
                                            </p>
                                            <p> Major </p>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field is-grouped pl2">
                                            <p class="pr1">
                                                <vb-switch type="success" size="medium" v-model="searchUniqname"/>
                                            </p>
                                            <p> Uniqname </p>
                                        </div>
                                        <div class="field is-grouped pl2">
                                            <p class="pr1">
                                                <vb-switch type="success" size="medium" v-model="searchPC"/>
                                            </p>
                                            <p> Pledge Class </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="divider slate"></div>
                                <header class="text fs-s5">Display in Directory: </header>
                                <div class="columns is-centered is-mobile">
                                    <div class="column">
                                        <div class="field is-grouped pl2">
                                            <p class="pr1">
                                                <vb-switch type="success" size="medium" v-model="activeShow"/>
                                            </p>
                                            <p> Actives </p>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field is-grouped pl2">
                                            <p class="pr1">
                                                <vb-switch type="success" size="medium" v-model="alumShow"/>
                                            </p>
                                            <p> Alumni </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                        
                        <footer class="modal-card-foot">
                            <button class="button is-success" v-on:click="close">Apply</button>
                            <button class="button" v-on:click="closeAndCancel">Cancel</button>
                        </footer>
                    </div>
            </div>
            </div>
        </section>
</template>



<script>



import DirectoryCard from '@/components/DirectoryCard.vue';
//import InfiniteLoading from 'vue-infinite-loading';
import NavBar from '@/components/NavBar.vue';
import VbSwitch from 'vue-bulma-switch';
import {db} from '@/main.js';

export default {
    name: 'directory',
    //directives: {infiniteScroll},
    data() {
        return {
            input: '',
            modalActive: false,
            activeShow: true,
            alumShow: false,
            searchOptions: false,
            searchName: true,
            searchUniqname: true,
            searchUniqnameTemp: true,
            searchYear: false,
            searchYearTemp: false,
            searchMajor: false,
            searchMajorTemp: false,
            searchPC: false,
            searchPCTemp: false,
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
        launch: function() {
            this.searchUniqnameTemp = this.searchUniqname;
            this.searchYearTemp = this.searchYear;
            this.searchPCTemp = this.searchPC;
            this.searchMajorTemp = this.searchMajor;
            this.modalActive = true;
        },
        close: function() {
            this.modalActive = false;
        },
        closeAndCancel: function() {
            this.searchUniqname = this.searchUniqnameTemp;
            this.searchYear = this.searchYearTemp;
            this.searchMajor = this.searchMajorTemp;
            this.searchPC = this.searchPCTemp;
            this.modalActive = false;
        },
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
                    return (this.searchName && temp === user.name.substring(0,input.length).toUpperCase()) || 
                           (this.searchUniqname && temp === user.uniqname.substring(0,input.length).toUpperCase()) ||
                           (this.searchYear && temp === user.year.substring(0,input.length).toUpperCase()) ||
                           (this.searchPC && temp === user.pledge_class.substring(0,input.length).toUpperCase()) ||
                           (this.searchMajor && temp === user.major.substring(0,input.length).toUpperCase());
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
        NavBar,
        VbSwitch
    },
    mounted() {
        this.users = [];

        // Only actives and e-board members will be displayed in directory
        const ref = db.collection('users').where("standing","<","Guest");
        ref.onSnapshot((querySnapshot) => {
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
      position: static;
      z-index: -1;
  }
  #searchSettings {
      position: absolute;
      right: 0px;
      z-index: 1;
      height: 100%;
  }
  .menu {
      background-color: beige;
      height: 100%;
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
    position: fixed;
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



