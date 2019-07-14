<template>
    <section id='userDisplay'>
        <div class="reflow">
            <template v-if= "searchBool">
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input v-model='input' class="input is-primary" type="text" placeholder="Member Name">
                    </div>
                    <div class="control">
                        <button v-on:click="toggle()" class="button">
                            Cancel search
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="control">
                    <button v-on:click="toggle()" class="button is-large is-rounded">
                        Search
                    </button>
                </div>
            </template>
        </div>



        <transition-group name='flip-list' class="columns is-centered is-multiline">
            <div v-for="directoryInfo in searchResults(this.input)" :key="directoryInfo.uniqname" class="column is-3">
                <directoryCard :key=0 v-bind='directoryInfo'/>
            </div>
        </transition-group>


    </section>
</template>


<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import * as firebase from 'firebase/app';
import {database} from '@/main.js';

export default {
    data() {
        return {
            searchBool: true,
            input: '',
            users: 
            [
                
            ],
        }
    },
    methods: {
        searchResults: function(input) {
            //console.log("COMPUTED FUNCTION HERE");

            return this.users.filter(function (user) {
                return input == user.name.substring(0,input.length) || input == user.uniqname.substring(0,input.length)
            })
        },
        toggle: function() {
            this.searchBool = !this.searchBool;
            if (!this.searchBool) {
                this.input = '';
            }
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









<style>
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