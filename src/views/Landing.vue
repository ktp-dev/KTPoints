<template>
<!-- <div class="container"> -->
  <div>
  <NavBar />
  <div class="container is-centered desktop-width">
    <div class=" mt4">
      <div class="light-green-bg m1">
        <p class="title">Welcome to KTPoints {{$route.params.username}}</p>
          Tell the new kids some shit about KTP and how absolutely fire we are
      </div>
      <div class="sky-blue-bg m1">
        <p class="title">Announcement {{$route.params.username}}</p>
          Read this you little shits
      </div>
      <div class="light-green-bg m1">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Upcoming Events
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
                <div class="container is-centered event-width">
                  <div v-for="eventinfo in events" :key="eventinfo.location" class="is-3">
                    <EventCard v-bind='eventinfo'/>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sky-blue-bg m1">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Points and Shit
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Points Earned: 15
              <br>
              Meetings Completed: 16
              <br>
              <h2 class="has-text-centered"> Most Recently Earned Points </h2>
                <div class="container is-centered event-width">
                  <div v-for="eventinfo in events" :key="eventinfo.location" class="is-3">
                    <EventCard v-bind='eventinfo'/>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
<!-- </div> -->
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import NavBar from '@/components/NavBar.vue'
import * as firebase from 'firebase/app';
import { db, auth } from '@/main.js';
import { setTimeout } from 'timers';

export default {
  name: 'events',
  data () {
    return {
      events: [

      ],
      show: false,
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  components: {
    EventCard,
    NavBar
  },
  mounted() {
    // Firebase Events DB Call
    let myTimestamp = parseInt(new Date().getTime()/1000);
    let fbtime = new firebase.firestore.Timestamp(myTimestamp, 0)
    //Can change based on specific type of user later
    db.collection("events").where('time', '>=', fbtime).limit(3)
    .onSnapshot((querySnapshot) => {
      this.events = []
      let numEvents =  0
      querySnapshot.forEach((doc) => {
        this.events.push(doc.data())
        numEvents += 1
        if (numEvents == 3) { return; }
        // console.log(doc.data().time)
      })
      if (auth.currentUser){
        console.log("how many times did we go through this")
        // console.log(auth.currentUser)
        this.show = true;
      }
    })
  },
  destroyed() {
    console.log('we out of there')
  }
}
</script>