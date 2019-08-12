<template>
<div class="gradient pb4">
  <NavBar />
  <div class="container is-centered desktop-width">
    <div class="mt4">
      <div class="card landing-card has-text-centered">
        <div class="fs-s1 fw-bold fira-mono dark-blue">
          <p>{{payload.event}}</p>
        </div>
        <div class="card-content pb0 fs-s4 is-4 columns is-multiline">
          <div class="column is-half">
            <div class="control is-expanded">
              <div class="fira-sans-light-italic slate">
                Where: 
              </div>
              <div class=""> {{payload.location}} </div>
              <div class="divider slate"></div>
            </div> 
          </div>
          <div class="column is-half">
            <div class="control is-expanded">
              <div class="fira-sans-light-italic slate">
                When: 
              </div>
              <div class=""> {{payload.time}} </div>
              <div class="divider slate"></div>
            </div> 
          </div>
          <div class="column is-half">
            <div class="control is-expanded">
              <div class="fira-sans-light-italic slate">
                Points: 
              </div>
              <div class=""> {{payload.points}} </div>
              <div class="divider slate"></div>
            </div> 
          </div>
          <div class="column is-half">
            <div class="control is-expanded">
              <div class="fira-sans-light-italic slate">
                About: 
              </div>
              <div class=""> {{payload.description}} </div>
              <div class="divider slate"></div>
            </div> 
          </div>
        </div>
        <div class="mt2 ml3 mb3">
          <p class='mt2 fs-s4 has-text-centered fw-sb pb2'>{{this.attend}}</p>
          <div class="columns">
          <p v-for="(attendee, index) in payload.attendees" :key="index" class='fira-sans-light-italic has-text-centered column is-quarter'>
            {{attendee}}
          </p>
          </div>
        </div>
        <footer class="fs-s7 ">
        <div class="divider v-light-grey mb1"></div>
        <div class="columns is-mobile mb0">
          <a class='column sky-blue-text p1'>Add to Calendar</a>
          <a class='column sky-blue-text p1' v-on:click="checkInToEvent()">{{checkInStatus}}</a>
        </div>
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class="divider"></div>
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class="columns m1">
          <a  class="column light-green-text pb1 pt0">Edit</a>
          <a  class="column light-green-text pb1 pt0">Delete</a>
        </div>
      </footer>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import store from '@/store.js'
import {db, fbOperation} from '@/main.js'
import NavBar from '@/components/NavBar.vue'

export default {
  store,
  props: ['event', 'location', 'time', 'points', 'description', 'eventhash', 'attendees'],
  data() {
    return {
      uniqname: this.$store.state.userData.uniqname,
      ATTENDING: false,
      checkInStatus: "Check in to event",
      payload: {
        event: this.event,
        location: this.location,
        points: this.points,
        description: this.description,
        attendees: this.attendees,
        time: this.time,
      },
    }
  },
  computed: {
    attend: function(){
      if (this.payload.time >  moment().format()) {
        return "Responded going"
      }
      else  {
        return "Attended"
      }
    }
  },

  components: {
    NavBar,
  },
  methods: {
    checkInToEvent: function(){
      if (this.ATTENDING){
        db.collection('events').doc(this.eventhash).update({
          attendees: fbOperation.FieldValue.arrayRemove(this.uniqname)
        }).then(() => {
          this.payload.attendees.splice(this.payload.attendees.indexOf(this.uniqname), 1)
          this.ATTENDING = !this.ATTENDING
          this.checkInStatus = 'Check in to event';
        })
        
      }
      else {
        db.collection('events').doc(this.eventhash).update({
          attendees: fbOperation.FieldValue.arrayUnion(this.uniqname)
        }).then(() => {
          this.ATTENDING = !this.ATTENDING
          this.payload.attendees.push(this.uniqname)
          this.payload.attendees.sort()
          this.checkInStatus = 'Check out of event';
        });
      }
    }
  },
  
  mounted(){
    console.log(this.payload.attendees)
    if(this.event === undefined){
      // 'event', 'location', 'time', 'points', 'description', 'attendees'
      // make firebase call and set the above information using the eventhash
      db.collection('events').doc(this.eventhash).get().then((doc)=>{
        this.payload = doc.data();
        let utcSeconds = this.payload.time.seconds;
        let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date.setUTCSeconds(utcSeconds);
        this.payload.time = moment(date).format('MMMM Do YYYY, h:mm:ss a')
      })
      .then(() => {
        if (this.payload.attendees.includes(this.uniqname)){
          this.ATTENDING = true;
          this.checkInStatus = 'Check out of event';
        }
      })
    }
    else if (this.payload.attendees.includes(this.uniqname)){
      this.ATTENDING = true;
      this.checkInStatus = 'Check out of event';
    }
  }
}
</script>