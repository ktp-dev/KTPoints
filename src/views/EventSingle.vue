<template>
<div class="section">
  <NavBar />
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="card has-text-centered">

        <!-- Not Editing View -->
        <header v-if="!EDITING" class="card-header title fira-mono">
          <p>{{payload.event}}</p>
        </header>

        <!-- Editing View -->
        <div v-if="EDITING" class="card-content title is-4 fira-sans-light-italic">
          <div class="slate has-text-left mr2">
            <p>Title</p>
          </div>
          <input class='input is-primary' v-model="payload.event" :placeholder='payload.event'>
          <div class="divider slate"></div>

          <div class="mt2 slate has-text-left">
            <p>Location</p>
          </div>
          <input class='input is-primary' v-model="payload.location" :placeholder='payload.location'>
          <div class="divider slate"></div>
          
          <div class="mt2 slate has-text-left">
            Time
          </div>
          <input v-model="newTime" class="input is-primary" type="time" placeholder="time">
          <div class="divider slate"></div>

          <div class="mt2 slate has-text-left">
            Date
          </div>
          <input v-model="date" class="input is-primary" type="date">
          <div class="divider slate"></div>

          <div class="mt2 slate has-text-left">
            <p>Points</p>
          </div>          
          <input class='input is-primary' v-model="payload.points" :placeholder='payload.points' type="number">
          <div class="divider slate"></div>

          <div class="mt2 slate has-text-left">
            <p>Description</p>
          </div>          
          <input class='input is-primary' v-model="payload.description" :placeholder='payload.description'>
          <div class="divider slate"></div>
        </div>

        <!-- Not Editing View -->
        <div v-else class="card-content title is-4 fira-sans-light-italic">
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

        <!-- show footer if not guest -->
        <footer v-if="this.$store.state.userData.standing !== 'Guest'" class="card-footer">
          <a class='card-footer-item'>Add to Calendar</a>
          <a v-on:click="triggerEditView()" v-if="this.$store.state.userData.standing === 'Eboard'" class="card-footer-item">{{EDIT_STATUS[EDITING]}}</a>
          <a class='card-footer-item' v-on:click="checkInToEvent()">{{checkInStatus}}</a>
        </footer>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import store from '@/store.js'
import NavBar from '@/components/NavBar'
import {db, fbOperation} from '@/main.js'

export default {
  store,
  props: ['event', 'location', 'time', 'points', 'description', 'eventhash', 'attendees'],
  data() {
    return {
      ATTENDING: false,
      EDITING: 0,
      EDIT_STATUS: ['Edit', 'Confirm'],
      uniqname: this.$store.state.userData.uniqname,
      checkInStatus: "Check in to event",
      newTime: "",
      date: "",
      payload: {
        event: this.event,
        location: this.location,
        points: parseInt(this.points),
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
    },
    triggerEditView: function(){
      if (this.EDITING === 1){
        if (this.date !== "" && this.newTime !== ""){

          let myTimestamp = new Date(this.date + ' ' + this.newTime);
          myTimestamp = myTimestamp.getTime() / 1000;

          db.collection('events').doc(this.eventhash).update({
            description: this.payload.description,
            event: this.payload.event,
            location: this.payload.location,
            points: this.payload.points,
            time: new fbOperation.Timestamp(myTimestamp, 0),
          })

          let date = new Date(0); 
          date.setUTCSeconds(myTimestamp);
          this.payload.time = moment(date).format('MMMM Do YYYY, h:mm:ss a');

        }
        else {
          db.collection('events').doc(this.eventhash).update({
            description: this.payload.description,
            event: this.payload.event,
            location: this.payload.location,
            points: this.payload.points,
          })
        }     
      }
      this.EDITING = 1 - this.EDITING;
    },
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