<template>
    <section id='directory'>
        <section id='searchBar'>
                <transition name="slide-right" mode="out-in">
                <div class="field is-horizontal">
                    <div class="field-label"></div>
                    <div class="field-body">
                        <div class="field is-expanded is-left">
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
                        <div class="field is-right">
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
                </transition>
        </section>

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


<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import * as firebase from 'firebase/app';
import {database} from '@/main.js';
//import { userInfo } from 'os';

export default {
    data() {
        return {
            searchIdx: 0,
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
        toggle: function() {
            this.searchIdx = (this.searchIdx + 1) % 2;
        },
        toggleSearchOptions: function() {
            this.searchOptions = !this.searchOptions;
            this.alumShow = !this.alumShow;
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
  }

  .flip-list-move {
    transition: transform .5s;
  }
  .flip-list-enter-active {
    transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
  }
  .flip-list-enter, .flip-list-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }
</style>