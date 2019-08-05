<!--<template>
    <section id='userDisplay'>
            <transition-group name='flip-list' class="columns is-centered is-multiline">
                    <div v-for="directoryInfo in displayedUsers" :key="directoryInfo.uniqname" class="column is-3">
                        <directoryCard :key=0 v-bind='directoryInfo'/>
                    </div>
            </transition-group>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </section>
</template> -->

<template>
    <section id='userDisplay'>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <transition-group name='flip-list' class="columns is-centered is-multiline">
            <div v-for="directoryInfo in userInfo" :key="directoryInfo.uniqname" class="column is-3">
                <directoryCard :key=0 v-bind='directoryInfo'/>
            </div>
            </transition-group>
        </div>
    </section>
</template>



<script>
import DirectoryCard from '@/components/DirectoryCard.vue';
//import InfiniteLoading from 'vue-infinite-loading';
import infiniteScroll from 'vue-infinite-scroll'
import {db, storage} from '@/main.js';

var count = 0;
export default {
    name: 'directory',
    directives: {infiniteScroll},
    data() {
        return {
            input: '',
            activeShow: true,
            alumShow: false, 
            searchOptions: false,
            busy: false, 
            userInfo: 
            [
                
            ],
            displayedUsers: 
            [

            ],
            users:
            [

            ],
            images:
            [

            ]
        }
    },
    methods: {
        loadMore: function() {
            this.busy = true;

            setTimeout(() => {
                for (var i = 0, j = 10; i < j; i++) {
                    const obj = this.users[count];
                    //console.log(this.users[count].uniqname)

                    var url = this.getImageURL(this.users[count].uniqname)
                    console.log(url);
                    this.userInfo.push({
                        'major': this.users[count].major,
                        'meetings_left': this.users[count].meetings_left,
                        'name': this.users[count].name, 
                        'pledge_class': this.users[count].pledge_class, 
                        'points': this.users[count].points, 
                        'standing': this.users[count].standing, 
                        'uniqname': this.users[count].uniqname,
                        'year': this.users[count].year, 
                    })
                    count++;
                }
                this.busy = false;
            }, 1000);
        },
        getImageURL: function(uniqname) {
            console.log(uniqname);
            var gsURL_anon = 'gs://ktpoints-68071.appspot.com/profile_pictures/';
            var gsURL = gsURL_anon.concat(uniqname);
            gsURL = gsURL.concat('.jpg');
            //console.log(gsURL)
            gsURL_anon = gsURL_anon.concat('anon.jpg');
            var urlRef = storage.refFromURL(gsURL);
            
            urlRef.getDownloadURL().then((url) => {
                this.images.push(url);
            }).catch((error) => {
                return 'anon_url'
            })

            var URL = this.images[this.images.length - 1]
            console.log(URL)
        },
        infiniteHandler($state) {
            setTimeout(() => {
            const temp = []
            db.collection("users")
            var end = this.displayedUsers.length + 5;
            if (end >= this.users.length) {
                end = this.users.length;
            }

            for (let i = this.displayedUsers.length; i <= end; i++) {
                temp.push(this.users[i]);
            }
        
            this.displayedUsers = this.displayedUsers.concat(temp);
            console.log(this.displayedUsers);
            $state.loaded();
            }, 1000);
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
    },
    mounted() {
        db.collection("users").onSnapshot((querySnapshot) => {
            this.users = [];
            querySnapshot.forEach((doc) => {
                this.users.push(doc.data());
            })
        })
    }, 
}














/*
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
        
        <!-- Flip List User display -->
        <section id='userDisplay'>
            <!--<transition-group name='flip-list' class="columns is-centered is-multiline">-->
                    <div v-for="directoryInfo in displayedUsers" :key="directoryInfo.uniqname" class="column is-3">
                        <directoryCard :key=0 v-bind='directoryInfo'/>
                    </div>
            <!--</transition-group>-->
        </section>

    </section>
*/
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



