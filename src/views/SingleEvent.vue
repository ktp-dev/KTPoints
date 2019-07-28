<template>
<div class="section">
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="card has-text-centered">
        <header class="card-header title fira-mono">
          <p>{{event}}</p>
        </header>
        <div class="card-content title is-4 fira-sans-light-italic">
          <p>{{location}}</p>
          <p>{{time}}</p>
          <p>{{points}} points</p>
          <p>{{description}}</p>
          <div class="divider slate"></div>
          <p class='mt4 has-text-left'>Attendees</p>
          <p v-for="(attendee, index) in attendees" :key="index" class='has-text-left'>
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
      data: null,
    }
  },
  methods: {
    checkInToEvent: function(){
      if (this.ATTENDING){
        db.collection('events').doc(this.eventhash).update({
          attendees: db_updater.FieldValue.arrayRemove(this.uniqname)
        }).then(() => {
          this.attendees.splice(this.attendees.indexOf(this.uniqname), 1)
          this.ATTENDING = !this.ATTENDING
          this.checkInStatus = 'Check in to event';
        })
        
      }
      else {
        db.collection('events').doc(this.eventhash).update({
          attendees: db_updater.FieldValue.arrayUnion(this.uniqname)
        }).then(() => {
          this.ATTENDING = !this.ATTENDING
          this.attendees.push(this.uniqname)
          this.attendees.sort()
          this.checkInStatus = 'Check out of event';
        });
      }
    }
  },
  mounted(){
    if(this.attendees === undefined){
      console.log('undefined')
      // 'event', 'location', 'time', 'points', 'description', 'attendees'
      // make firebase call and set the above information using the eventhash
      db.collection('events').doc(this.eventhash).get().then((doc)=>{
        this.data = doc.data();
      })
      .then(() => {
        this.event = this.data.event;
        this.location = this.data.location;
        this.points = this.data.points;
        this.description = this.data.description;
        this.attendees = this.data.attendees;
        this.time = this.data.time;
      })
      .then(() => {
        if (this.attendees.includes(this.uniqname)){
          this.ATTENDING = true;
          this.checkInStatus = 'Check out of event';
        }
      })
    }
    else if (this.attendees.includes(this.uniqname)){
      this.ATTENDING = true;
      this.checkInStatus = 'Check out of event';
    }
  }
}
</script>