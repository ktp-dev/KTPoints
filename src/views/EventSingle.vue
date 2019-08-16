<template>
  <div class="gradient pb4">
    <NavBar />
    <div id='lrpadding' class="container is-centered desktop-width">
      <div class="mt4">
        <div class="card landing-card has-text-centered">
          <div class="fs-s1 fw-bold fira-mono dark-blue">
            <p>{{payload.event}}</p>
          </div>
          <div class="card-content pb0 fs-s4 is-4 columns is-multiline">
            <div class="column is-half">
              <div v-if="!EDITING" class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  Where: 
                </div>
                <div> {{payload.location}} </div>
                <div class="divider slate"></div>
              </div> 
              <div v-else class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  Event: 
                </div>
                <input v-model="payload.event" class="input is-primary fira-mono" type="text">
                <div class="divider slate"></div>
                <div class="mt2 fira-sans-light-italic slate">
                  Where: 
                </div>
                <input v-model="payload.location" class="input is-primary fira-mono" type="text">
                <div class="divider slate"></div>
              </div> 
            </div>
            <div class="column is-half">
              <div v-if="!EDITING" class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  When: 
                </div>
                <div class=""> {{payload.time}} </div>
                <div class="divider slate"></div>
              </div> 
              <div v-else class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  Time (optional): 
                </div>
                <input v-model="newTime" class="input is-primary fira-mono" type="time">
                <div class="divider slate"></div>
                <div class="mt2 fira-sans-light-italic slate">
                  Date (optional): 
                </div>
                <input v-model="date" class="input is-primary fira-mono" type="date">
                <div class="divider slate"></div>
              </div> 
            </div>
            <div class="column is-half">
              <div v-if="!EDITING" class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  Points: 
                </div>
                <div class=""> {{payload.points}} </div>
                <div class="divider slate"></div>
              </div> 
              <div v-else class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  Points: 
                </div>
                <input v-model="payload.points" class="input is-primary" type="number">
                <div class="divider slate"></div>
              </div> 
            </div>
            <div class="column is-half">
              <div v-if="!EDITING" class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  About: 
                </div>
                <div class=""> {{payload.description}} </div>
                <div class="divider slate"></div>
              </div> 
              <div v-else class="control is-expanded">
                <div class="fira-sans-light-italic slate">
                  About: 
                </div>
                <input v-model="payload.description" class="input is-primary" type="text">
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
            <a v-on:click="addToCalendar()" class='column sky-blue-text p1'>Add to Calendar</a>
            <a class='column sky-blue-text p1' v-on:click="checkInToEvent()">{{checkInStatus}}</a>
            <a class='column sky-blue-text p1'> Get Points </a>
          </div>
          <div v-if="this.$store.state.userData.standing === 'Eboard'" class="divider"></div>
          <div v-if="this.$store.state.userData.standing === 'Eboard'" class="columns m1">
            <a v-on:click="triggerEditView()" class="column light-green-text pb1 pt0">{{EDIT_STATUS[EDITING]}}</a>
            <a v-on:click="deleteModalToggle()" class="column light-green-text pb1 pt0">Delete</a>
            <a v-on:click="passwordModalToggle()" class="column light-green-text pb1 pt0">Edit Password</a>
          </div>
        </footer>
        </div>
      </div>
    </div>

    <div class="modal" v-bind:class="{'is-active': DELETE_TOGGLE}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Are you sure you want to delete this event?</p>
          <button v-on:click="deleteModalToggle()" class="delete" aria-label="close"></button>
        </header>
        <footer class="modal-card-foot" style="justify-content: flex-end;">
          <button v-on:click="deleteModalToggle()" class="button">Cancel</button>
          <button v-on:click="deleteEvent()" class="button is-danger">Delete Event</button>
        </footer>
      </div>
    </div>
    
    <div class="modal" v-bind:class="{'is-active': PASSWORD_MODAL}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Set Password</p>
          <button v-on:click="passwordModalToggle()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="fira-sans-light-italic slate has-text-left">
            Password
          </div>
          <input v-model="eventPassword" class="input is-primary" type="password">
          <div class="divider slate"></div> 
        </section>
        <footer class="modal-card-foot" style="justify-content: flex-end;">
          <button v-on:click="passwordModalToggle()" class="button">Cancel</button>
          <button v-on:click="updateEventPassword()" class="button is-success">Set Password</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import store from '@/store.js'
import NavBar from '@/components/NavBar'
import {db, fbOperation} from '@/main.js'
import router from '@/router.js'

export default {
  store,
  components: {
    NavBar
  },
  props: ['event', 'location', 'time', 'points', 'description', 'eventhash', 'attendees', 'password'],
  data() {
    return {
      ATTENDING: false,
      EDITING: 0,
      EDIT_STATUS: ['Edit', 'Confirm'],
      PASSWORD_MODAL: false,
      GET_POINTS: false,
      DELETE_TOGGLE: false,
      passwordAttempt: "",
      eventPassword: "",
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
        password: this.password,
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
          this.payload.time = moment(date).format('h:mm a -- M/D/YY');

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
    deleteModalToggle: function(){
      this.DELETE_TOGGLE = !this.DELETE_TOGGLE;
    },
    passwordModalToggle: function(){
      this.PASSWORD_MODAL = !this.PASSWORD_MODAL;
    },
    updateEventPassword: function(){
      db.collection('events').doc(this.eventhash).update({
        password: this.eventPassword
      })
      .then(() => {
        this.eventPassword = "";
        this.passwordModalToggle();
      })
    },
    addToCalendar: function(){
      let baseurl = 'https://www.google.com/calendar/event?action=TEMPLATE';
      let title = '&text=' + this.payload.event;
      let description = '&details=' + this.payload.description;
      let location = '&location=' + this.payload.location;

      let momentDate = new Date(this.payload.time.replace("--", ""))
      let momentTimeBegin = moment(momentDate).format('YYYYMMDD[T]HHmmss')
      let momentTimeEnd = moment(momentDate).add('1', 'hours').format('YYYYMMDD[T]HHmmss')
      let dates = '&dates=' + momentTimeBegin + '/' + momentTimeEnd;
      let gcalURL = baseurl + title + description + location + dates;

      let encodedURL = encodeURI(gcalURL)
      window.open(encodedURL, '_blank')
    },
    deleteEvent: function(){
      db.collection("events").doc(this.eventhash).delete()
      .then(function() {
        this.deleteModalToggle();
        router.push({ name: 'events' })
        // console.log("Document successfully deleted!");
      })
      .catch(function(error) {
          // console.error("Error removing document: ", error);
      });
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
  
  mounted(){
    if(this.event === undefined){
      // 'event', 'location', 'time', 'points', 'description', 'attendees'
      // make firebase call and set the above information using the eventhash
      db.collection('events').doc(this.eventhash).get().then((doc)=>{
        this.payload = doc.data();
        let utcSeconds = this.payload.time.seconds;
        let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date.setUTCSeconds(utcSeconds);
        this.payload.time = moment(date).format('h:mm a -- M/D/YY')
      })
      .then(() => {
        if (this.payload.attendees.includes(this.uniqname)){
          this.ATTENDING = true;
          this.checkInStatus = 'Check out of event';
        }
        if (this.$store.state.userData.standing !== 'Guest'){
          // check if event is in attended event array
          if (!this.$store.state.userData.attended.includes(this.eventhash)){
            this.GET_POINTS = true;
           }
        }
      })
    }
    else if (this.payload.attendees.includes(this.uniqname)){
      this.ATTENDING = true;
      this.checkInStatus = 'Check out of event';
    }
    if (this.$store.state.userData.standing !== 'Guest'){
      // check if event is in attended event array
      if (!this.$store.state.userData.attended.includes(this.eventhash)){
        this.GET_POINTS = true;
      }
    }
  }
}
</script>

<style scoped>
  #lrpadding {
    padding-left: 10px;
    padding-right: 10px;
  }
</style>