<template>
    <section id='directory'>
        <section id='searchBar'>
                <transition name="slide-right" mode="out-in">
                <div class="control has-icons-left has-icons-right">
                    <input v-model='input' class="input is-primary" type="text" placeholder="Search">
                    <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-search"></i>
                    </span>
                </div>
                </transition>
        </section>

        <section id='userDisplay'>
            <transition-group name='flip-list' class="columns is-centered is-multiline">
                <div v-for="directoryInfo in searchResults(this.input)" :key="directoryInfo.uniqname" class="column is-3">
                    <directoryCard :key=0 v-bind='directoryInfo'/>
                </div>
            </transition-group>
        </section>

    </section>
</template>


<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import * as firebase from 'firebase/app';
import {database} from '@/main.js';

export default {
    data() {
        return {
            searchIdx: 0,
            input: '',
            searchButtons: [
                'Search',
                'Cancel Search'
            ],
            users: 
            [
                
            ],
        }
    },
    methods: {
        searchResults: function(input) {

            return this.users.filter(function (user) {
                var temp = input.toUpperCase();
                return temp === user.name.substring(0,input.length).toUpperCase() ||
                       temp === user.uniqname.substring(0,input.length).toUpperCase();
            })
        },
        toggle: function() {
            this.searchIdx = (this.searchIdx + 1) % 2;
        }
    },
    components: {
        DirectoryCard
    },
    mounted() {
        database.collection("users").onSnapshot((querySnapshot) => {
            this.users = [];
            querySnapshot.forEach((doc) => {
                this.users.push(doc.data())
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