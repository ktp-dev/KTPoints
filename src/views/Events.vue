<template>
  <div class="gradient pb4">
    <NavBar />

    <!-- Search Bar -->
    <div class="section">
      <div class="field">
          <div class="columns is-centered is-mobile">
            <div class="column is-four-fifths">
                <div class="field is-expanded is-centered">
                  <div class="control is-expanded has-icons-left has-icons-right">
                    <input v-model='input' class="input" type="text" placeholder="Search">
                      <span class="icon is-small is-left">
                        <i class="fas fa-calendar"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-search"></i>
                      </span>
                  </div>
                </div>
            </div>
            
            <div class="column">
              <a class="button" v-on:click="launch" >
                <span class="icon is-small is-right">
                  <i class="fas fa-cog"></i>
                </span>
              </a>
            </div>
          </div>
      </div>
    </div>

    <div class="section">
      <transition-group name='flip-list' class="columns is-centered is-multiline">
        <div v-for="eventinfo in searchResults(this.input)" :key="eventinfo.location" class="column is-3">
          <EventCard :key=0 v-bind='eventinfo'/>
        </div>
      </transition-group>

      <transition name="flip-list">
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class='field is-grouped'>
          <router-link to="/event/add-event">
            <button class='button is-large'>Add Event</button>
          </router-link>
        </div>
      </transition>
    </div>

<div class="modal" v-bind:class="{'is-active':modalActive}">
  <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Event Display Options</p>
        <button class="delete" aria-label="close" v-on:click="close"></button>
      </header>
      <section class="modal-card-body">
        <section class="modal-card-content">

          <header class="text fs-s5">Minimum Point Display</header>
          <div class="columns is-mobile">
            <div class="column">
              <div class="field is-grouped pl2">
                <p class="pr1">
                  <vb-switch type="success" size="medium" v-model="searchPoints"/>
                </p>
                <p> Search by Points</p>
              </div>
            </div>
            <div class="column">
              <div class="field pl2" v-if="searchPoints">
                <label class="label">Minimum Points</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>0 Points</option>
                      <option>10 Points</option>
                      <option>15 Points</option>
                    </select>
                  </div>
                </div>
              </div>  
            </div>
          </div>
          <div class="divider slate"></div>


            <header class="text fs-s5">Category Options</header>
            <div class="columns is-centered is-mobile">
              <div class="column">
                <div class="field is-grouped pl2">
                  <p class="pr1">
                    <vb-switch type="success" size="medium" v-model="showChapter"/>
                  </p>
                  <p> Chapter </p>
                </div>
                <div class="field is-grouped pl2">
                  <p class="pr1">
                    <vb-switch type="success" size="medium" v-model="showDesign"/>
                  </p>
                  <p> Design </p>
                </div>
                <div class="field is-grouped pl2">
                  <p class="pr1">
                    <vb-switch type="success" size="medium" v-model="showTech"/>
                  </p>
                  <p> Tech-Dev </p>
                </div>
                <div class="field is-grouped pl2">
                  <p class="pr1">
                    <vb-switch type="success" size="medium" v-model="showOther"/>
                  </p>
                  <p> Other </p>
                </div>
              </div>
            <div class="column">
              <div class="field is-grouped pl2">
                <p class="pr1">
                  <vb-switch type="success" size="medium" v-model="showMarketing"/>
                </p>
                <p> Marketing </p>
              </div>
              <div class="field is-grouped pl2">
                <p class="pr1">
                  <vb-switch type="success" size="medium" v-model="showPro"/>
                </p> 
                <p> Pro-Dev </p>
              </div>
              <div class="field is-grouped pl2">
                <p class="pr1">
                  <vb-switch type="success" size="medium" v-model="showMembership"/>
                </p>
                <p> Membership </p>
              </div>
              <div v-if="this.$store.state.userData.standing === 'Eboard'" class="field is-grouped pl2">
                  <p class="pr1">
                    <vb-switch type="success" size="medium" v-model="showEboard"/>
                  </p>
                  <p> E-Board </p>
              </div>
            </div>
          </div>
        </section>
      </section>
                        
      <footer class="modal-card-foot">
        <button class="button is-success" v-on:click="close">Apply</button>
        <button class="button" v-on:click="close">Cancel</button>
      </footer>
    </div>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import VbSwitch from 'vue-bulma-switch';
import store from '@/store.js'
import * as firebase from 'firebase/app';
import { db, auth } from '@/main.js'
import NavBar from '@/components/NavBar'

export default {
  name: 'events',
  data () {
    return {
      events: [],
      input: '',
      show: false,
      showEboard: false,
      showChapter: true,
      showTech: true,
      showPro: true,
      showDesign: true,
      showMarketing: true,
      showMembership: true,
      showOther: true,
      searchPoints: false,
      modalActive: false,
      rushee: true,
      minPoints: 0
    }
  },
  methods: {
    searchResults: function(input) {
      return this.events.filter((event) => {
        if (parseInt(event.points) < this.minPoints) {
          return false;
        }

        if ((!this.showEboard && event.category === "Eboard") ||
            (!this.showChapter && event.category === "Chapter") ||
            (!this.showTech && event.category === "Tech Dev") ||
            (!this.showPro && event.category === "Pro Dev") ||
            (!this.showDesign && event.category === "Design") ||
            (!this.showMarketing && event.category === "Marketing") ||
            (!this.showMembership && event.category === "Membership") ||
            (!this.showOther && event.category === "Other")
            ) {
          return false;
        }
        
        var temp = input.toUpperCase();
        return (temp === event.event.substring(0,input.length).toUpperCase());
      })
    },
    setMinPoints: function(minPoints) {
      this.MinPoints = minPoints;
    },
    launch: function() {
      this.modalActive = true;
    },
    close: function() {
      this.modalActive = false;
    },
  },
  components: {
    EventCard,
    NavBar,
    VbSwitch
  },
  mounted() {
    // Firebase Events DB Call
    let myTimestamp = parseInt(new Date().getTime()/1000);
    let fbtime = new firebase.firestore.Timestamp(myTimestamp, 0)
    let subscriber = db.collection("events").where('time', '>=', fbtime).limit(10).onSnapshot((querySnapshot) => {
      this.events = []
      querySnapshot.forEach((doc) => {
        this.events.push(doc.data())
        this.events[this.events.length-1].id = doc.id
      })
    })
  },
}
</script>

<style scoped>
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

  .flip-list-enter, .flip-list-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }

  .flip-list-item {
    transition: all .5s cubic-bezier(0.42,0,0.58,1);
    display: inline-block;
  }
</style>