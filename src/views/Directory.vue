<template>
        <section id='directory'>
            <NavBar />
            <section id='searchBar'>
                <!-- For searching without the extra options -->
                <transition name="slide-right" mode="in-out">
                <transition name="slide-right" mode="out-in">
                <section id='noOptSearch'>
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

                <section id="searchSettings">
                <transition name="slide-left" mode="out-in">
                <aside v-if="searchOptions" class="menu is-pulled-right">
                    <!--
                    <p class="menu-label">
                        Search By
                    </p>
                    <ul class="menu-list">
                        <li>
                            <label class="checkbox">
                                <input v-model="searchName" type="checkbox">
                                    Name
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchUniqname" type="checkbox">
                                    Uniqname
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchYear" type="checkbox">
                                    Year
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchMajor" type="checkbox">
                                    Major
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchPC" type="checkbox">
                                    Pledge Class
                            </label>
                        </li>
                    </ul>
                    <ul class="menu-item">
                        <div class="button is-rounded" v-on:click="toggleSearchOptions()">
                            Back
                        </div>
                    </ul> -->

                    <div v-on:click="toggleSearchOptions()" class="button">
                        >>>
                    </div>
                    <p class="title fira-sans-light slate has-text-left">
                        Search Options
                    </p>
                    <p class="subtitle fira-sans-light slate has-text-left">
                        Search By:
                    </p>
                    <ul class="menu-list">
                        <li>
                            <label class="checkbox">
                                <input v-model="searchName" type="checkbox">
                                    Name
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchUniqname" type="checkbox">
                                    Uniqname
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchYear" type="checkbox">
                                    Year
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchMajor" type="checkbox">
                                    Major
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="searchPC" type="checkbox">
                                    Pledge Class
                            </label>
                        </li>
                    </ul>

                    <p class="subtitle fira-sans-light slate has-text-left">
                        View By Year:
                    </p>
                    <ul class="menu-list">
                        <li>
                            <label class="checkbox">
                                <input v-model="freshmanshow" type="checkbox">
                                    Freshmen
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="sophomoreshow" type="checkbox">
                                    Sophomores
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="juniorshow" type="checkbox">
                                    Juniors
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="seniorshow" type="checkbox">
                                    Seniors
                            </label>
                        </li>
                        <li>
                            <label class="checkbox">
                                <input v-model="alumshow" type="checkbox">
                                    Alumni
                            </label>
                        </li>
                    </ul>
                </aside>
                </transition>
                </section>
            
            </section>
            <section id='userDisplay'>
                <transition-group name='flip-list' class="columns is-centered is-multiline">
                    <div v-for="directoryInfo in searchResults(this.input)" :key="directoryInfo.uniqname" class="column is-3">
                        <directoryCard :key=0 v-bind='directoryInfo'/>
                    </div>
                </transition-group>
                <!--<infinite-loading @infinite="infiniteHandler"></infinite-loading>-->
            </section>
        </section>
</template>



<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import InfiniteLoading from 'vue-infinite-loading';
import NavBar from '@/components/NavBar.vue';
//import infiniteScroll from 'vue-infinite-scroll';
import {db} from '@/main.js';

export default {
    name: 'directory',
    //directives: {infiniteScroll},
    data() {
        return {
            input: '',
            freshmanshow: true,
            sophomoreshow: true,
            juniorshow: true, 
            seniorshow: true,
            alumshow: false,
            searchOptions: false,
            searchName: true,
            searchUniqname: true,
            searchYear: false,
            searchMajor: false,
            searchPC: false,
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
        searchResults: function(input) {
            return this.users.filter((user) => {
                if (!this.alumshow && user.year == 'Alumni') {
                    return false;
                }
                else if (!this.freshmanshow && user.year == 'Freshman') {
                    return false;
                }
                else if (!this.sophomoreshow && (user.year == 'Sophomore' || user.year == 'Sophmore')) {
                    return false;
                }
                else if (!this.juniorshow && user.year == 'Junior') {
                    return false;
                }
                else if (!this.seniorshow && user.year == 'Senior') {
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
        //InfiniteLoading,
    },
    mounted() {
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



