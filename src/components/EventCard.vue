<template>
  <div class="event-card-border card has-text-centered">
    <div v-on:click="toggle()" class="card-content p1 ">
      <p class="fs-s4 fw-bold mb1">{{event}}</p>
      <p class="mb1"> {{datetime}}</p>
      <p class="mb1"> {{startTime}} - {{endTime}}</p>
      <p v-if="this.$store.state.userData.standing != 'Guest'" class="fira-sans-light-italic mb0"> {{points}} Points</p>
      <div v-if="expanded">
        <br>
        <p class='fs-s5 fw-sb mb1'>About</p>
        <p class="pb1"> {{description}} </p>
      </div>      
    </div>

    <div v-if="expanded">
      <footer class="fs-s7">
        <div class="divider v-light-grey"></div>
        <div class="columns is-mobile m1">
          <a class="sky-blue-text column p0 border-right" v-on:click="addToCalendar()" target="_blank">Add to Cal</a>
          <a v-on:click="goToSingleEvent(event, location, datetime, points, description, id, attendees, password, start_time, end_time, category)" class="p0 sky-blue-text column">Event page</a>
        </div>
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class="divider"></div>
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class="columns m1">
          <a v-on:click="deleteModalToggle()" v-if="this.$store.state.userData.standing === 'Eboard'" class="p0 light-green-text column">Delete</a>
        </div>
      </footer>
    </div>      

    <div class="modal" v-bind:class="{'is-active': DELETE_MODAL_TOGGLE}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Are you sure you want to delete this event?</p>
          <button v-on:click="deleteModalToggle()" class="delete" aria-label="close"></button>
        </header>
        <footer class="modal-card-foot" style="justify-content: flex-end;">
          <button v-on:click="deleteModalToggle()" class="button">Cancel</button>
          <button v-on:click="deleteEvent(id)" class="button is-danger">Delete Event</button>
        </footer>
      </div>
    </div>

  </div>
</template>


<script>
import smoothReflow from 'vue-smooth-reflow'
import router from '@/router.js'
import store from '@/store.js'
import { db } from '@/main.js'

export default {
  store,
  mixins: [smoothReflow],
  props: ['event', 'location', 'start_time', 'end_time', 'points', 'description', 'id', 'attendees', 'password', 'category'],
  data(){
    return {
      expanded: false,
      DELETE_MODAL_TOGGLE: false,
    }
  },
  computed: {
    datetime: function(){
      let utcSeconds = this.start_time.seconds;
      let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(utcSeconds);
      let momentTime = moment(date).format('M/D/YY')
      return momentTime;
    },
    startTime: function(){
      let utcSeconds = this.start_time.seconds;
      let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(utcSeconds);
      let momentTime = moment(date).format('h:mm a')
      return momentTime;
    },
    endTime: function(){
      let utcSeconds = this.end_time.seconds;
      let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(utcSeconds);
      let momentTime = moment(date).format('h:mm a')
      return momentTime;
    }

  },
  methods: {
    toggle: function(){
      this.expanded = !this.expanded;
    },

    deleteModalToggle: function(){
      this.DELETE_MODAL_TOGGLE = !this.DELETE_MODAL_TOGGLE;
    },

    addToCalendar: function(){
      let baseurl = 'https://www.google.com/calendar/event?action=TEMPLATE';
      let title = '&text=' + encodeURIComponent(this.event);
      let description = '&details=' + encodeURIComponent(this.description);
      let location = '&location=' + encodeURIComponent(this.location);

      let date = new Date(0); 
      date.setUTCSeconds(this.start_time.seconds);
      let momentTimeBegin = moment(date).format('YYYYMMDD[T]HHmmss')
      let momentTimeEnd = moment(date).add('1', 'hours').format('YYYYMMDD[T]HHmmss')
      let dates = '&dates=' + momentTimeBegin + '/' + momentTimeEnd;
      let gcalURL = baseurl + title + description + location + dates;

      console.log(gcalURL)
      window.open(gcalURL, '_blank')
    },

    goToSingleEvent: function(myevent, location, datetime, points, description, id, attendees, password, startTime, endTime, category){
      router.push({ name: 'event', 
      params: 
        { 
          event: myevent, 
          location: location, 
          time: datetime, 
          points: points,
          description: description,
          eventhash: id,
          attendees: attendees,
          password: password,
          startTime: startTime,
          endTime: endTime,
          category: category
        }
      })
    },

    deleteEvent: function(id){
      db.collection("events").doc(id).delete()
      .then(function() {
        this.deleteModalToggle();
      })
      // .catch(function(error) {
      //     // console.error("Error removing document: ", error);
      // });
    }
  },
  mounted() {
    this.$smoothReflow()
  },
}
</script>