<template>
<div class="section">
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="card has-text-centered">
        <header class="card-header title fira-mono">
          <p>{{event}}</p>
        </header>
        <div class="card-content title is-4 fira-sans-light-italic">
          <p>{{payload.location}}</p>
          <p>{{payload.time}}</p>
          <p>{{payload.points}} points</p>
          <p>{{payload.description}}</p>
          <div class="divider slate"></div>
          <p class='mt4 has-text-left'>Attendees</p>
          <p v-for="(attendee, index) in payload.attendees" :key="index" class='has-text-left'>
            {{attendee}}
          </p>
        </div>
        <footer v-if="this.$store.state.userData.standing !== 'Guest'" class="card-footer">
          <a class='card-footer-item'>Add to Calendar</a>
          <a class='card-footer-item' v-on:click="checkInToEvent()">{{checkInStatus}}</a>
        </footer>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import store from '@/store.js'
// import * as firebase from 'firebase/app';
import {db, db_updater} from '@/main.js'

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
  methods: {
    checkInToEvent: function(){
      if (this.ATTENDING){
        db.collection('events').doc(this.eventhash).update({
          attendees: db_updater.FieldValue.arrayRemove(this.uniqname)
        }).then(() => {
          this.payload.attendees.splice(this.payload.attendees.indexOf(this.uniqname), 1)
          this.ATTENDING = !this.ATTENDING
          this.checkInStatus = 'Check in to event';
        })
        
      }
      else {
        db.collection('events').doc(this.eventhash).update({
          attendees: db_updater.FieldValue.arrayUnion(this.uniqname)
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