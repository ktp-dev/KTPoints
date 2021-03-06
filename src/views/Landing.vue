<template>
<!-- <div class="container"> -->
  <div class="gradient pb4">
  <NavBar />
  <div class="container is-centered desktop-width">
    <div class="mt4">
      <div v-if="this.$store.state.userData.standing === 'Guest'" class="m1 landing-card p1">
        <p class="fw-sb fs-s3 has-text-centered">Welcome</p>
        <p class="fs-s6">
          Thank you for your interest in KTP. We’re excited to meet you! 
          If you would like to learn more about the fraternity, please visit: 
          <a class="fira-sans-light-italic fw-reg .sky-blue-text">kappathetapi.com/</a> <br>
          Otherwise, explore around and find out more about the brothers and
          the events we have!
        </p>
      </div>
      <div class="m1 landing-card p1">
        <p class="fw-sb fs-s3 has-text-centered">Announcements</p>
        <p class="fs-s6">
          <div v-if="this.announcements.length !== 0">
            <div v-for="announcementinfo in announcements" :key="announcementinfo.id" >
              <p>- {{announcementinfo.description}}</p>
            </div>
          </div>
          <div v-else>
            <p> No Current Announcements </p>
          </div>
        </p>
      </div>
      <div class="m1 landing-card">
          <p class="fw-sb fs-s3 has-text-centered">  Upcoming Events </p>
          <div class="card-content">
            <div class="content">
                <div class="columns is-centered">
                  <div v-for="eventinfo in events" :key="eventinfo.location" class="column event-width">
                    <EventCard v-bind='eventinfo'/>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div v-if="this.$store.state.userData.standing !== 'Guest'" class="m1">
        <div class="landing-card">
          <div class="card-content">
            <div class="content">
              <div class="columns is-centered">
                <div class="column">
                  <p class="has-text-centered fs-s3 fw-sb mb0 pb1">Meetings</p>
                  <div class="level">
                    <div class="level-item">
                      <radial-progress-bar :diameter="200"
                              :completed-steps="Math.min(this.$store.state.userData.meetings_left, this.meetingsNeeded)"
                              :total-steps="this.meetingsNeeded"
                              startColor="#59abe3"
                              stop-color="#52779c"
                              inner-stroke-color="#C1C1C1"
                      >
                        <p>Needed: {{this.meetingsNeeded}}</p>
                        <p>Completed: {{Math.min(this.$store.state.userData.meetings_left, 20)}}</p>
                      </radial-progress-bar>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <p class="has-text-centered fs-s3 fw-sb mb0 pb1">Points</p>
                  <div class="level">
                    <div class="level-item">
                      <radial-progress-bar :diameter="200"
                                          :completed-steps="Math.min(this.$store.state.userData.points, this.pointsNeeded)"
                                          :total-steps="this.pointsNeeded"
                                          startColor="#59abe3"
                                          stop-color="#52779c"
                                          inner-stroke-color="#C1C1C1"
                      >
                        <p>Needed: {{this.pointsNeeded}}</p>
                        <p>Completed: {{this.$store.state.userData.points}}</p>
                      </radial-progress-bar>
                    </div>
                  </div>
                </div>
              </div>
              <h2 class="has-text-centered"> Recently Attended Events </h2>
                <div>
                  <div v-if="this.attendedEmpty" >
                    <div class="has-text-centered">
                      Oh No! You haven't attended any events yet!
                    </div>
                  </div>
                  <div v-if="!this.attendedEmpty" class='columns is-centered'>
                    <div v-for="eventinfo in userEvents" :key="eventinfo.location" class="column event-width">
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
  </div>
<!-- </div> -->
</template>

<script>
import store from '@/store.js'
import RadialProgressBar from 'vue-radial-progress'
import EventCard from '@/components/EventCard.vue';
import NavBar from '@/components/NavBar.vue'
import * as firebase from 'firebase/app';
import { db, auth } from '@/main.js';
import { setTimeout } from 'timers';

export default {
  store,
  name: 'events',
  data () {
    return {
      events: [
      ],
      announcements: [],
      userEvents: [],
      attendedEmpty: false,
      show: false,
      pointsNeeded: 0,
      meetingsNeeded: 0,
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  components: {
    EventCard,
    NavBar,
    RadialProgressBar
  },
  mounted() {
    // console.log(this.$store.state.userData)
    // Firebase Events DB Call
    if (store.state.userData.standing === "Pledge") {
      this.pointsNeeded = 450
      this.meetingsNeeded = 55
    }
    else {
      this.pointsNeeded = 100
      this.meetingsNeeded = 20
    }
    let myTimestamp = parseInt(new Date().getTime()/1000);
    let fbtime = new firebase.firestore.Timestamp(myTimestamp, 0)
    let userStanding = this.$store.state.userData.standing

    // Event Display for eboard members
    if (userStanding === 'Eboard') {
      db.collection("events").where('start_time', '>=', fbtime).limit(3)
      .onSnapshot((querySnapshot) => {
        this.events = []
        querySnapshot.forEach((doc) => {
            this.events.push(doc.data());
            this.events[this.events.length-1].id = doc.id;
        })
        if (auth.currentUser) {
          this.show = true;
        }
      });
    }
    // For non-eboard members
    else if (userStanding != 'Guest') {
      db.collection("events").where('start_time', '>=', fbtime).limit(10)
      .onSnapshot((querySnapshot) => {
        this.events = []
        querySnapshot.forEach((doc) => {
          const category = doc.data().category
          if (category != 'Eboard' && this.events.length < 4) {
            this.events.push(doc.data());
            this.events[this.events.length-1].id = doc.id;
          }
        })
        if (auth.currentUser){
          this.show = true;
        }
      });
    }
    // For guests
    else {
      db.collection("events").where('start_time', '>=', fbtime).where('category','==','Public').limit(3)
        .onSnapshot((querySnapshot) => {
          this.events = []
          querySnapshot.forEach((doc) => {
            this.events.push(doc.data());
            this.events[this.events.length - 1].id = doc.id;
          })
          if (auth.currentUser) {
            this.show = true;
          }
      });
    }
    //Getting announcements
    db.collection("announcements").where('expires_at', '>=', fbtime)
      .onSnapshot((querySnapshot) => {
        this.announcements = []
        querySnapshot.forEach((doc) => {
          this.announcements.push(doc.data());
          this.announcements[this.announcements.length - 1].id = doc.id;
        })
    });
    this.userEvents = []
    if (store.state.userData.attended === undefined || store.state.userData.attended.length === 0) {
        this.attendedEmpty = true;
    }
    else {
      this.userEvents = []
      let amount = Math.min(3, store.state.userData.attended.length)
      for (var i = 0; i < amount; i++) {
        let docRef = db.collection("events").doc(store.state.userData.attended[i])
        docRef.get().then((doc) => {
          if (doc.exists) {
              this.userEvents.push(doc.data())
          } else {
              console.log("No such document!");
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      }
      this.attendedEmpty = false;
    }

    

  },
}
</script>
