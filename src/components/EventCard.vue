<template>
  <div class="event-card-border card has-text-centered">
    <div v-on:click="toggle()" class="card-content p1 ">
      <p class="fs-s4 fw-bold mb1">{{event}}</p>
      <p class="mb1"> {{datetime}}</p>
      <p class="fira-sans-light-italic mb0"> {{points}} Points</p>
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
          <a v-on:click="goToSingleEvent(event, location, datetime, points, description, id, attendees, password)" class="p0 sky-blue-text column">Event page</a>
        </div>
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class="divider"></div>
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class="columns m1">
          <a v-on:click="deleteEvent(id)" v-bind:class="{'delete-color': DELETE_STATUS}" v-if="this.$store.state.userData.standing === 'Eboard'" class="p0 light-green-text column">Delete</a>
        </div>
      </footer>
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
  props: ['event', 'location', 'time', 'points', 'description', 'id', 'attendees', 'password'],
  data(){
    return {
      expanded: false,
      DELETE_STATUS: false,
    }
  },
  computed: {
    datetime: function(){
      let utcSeconds = this.time.seconds;
      let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(utcSeconds);
      let momentTime = moment(date).format('h:mm a -- M/D/YY')
      return momentTime;
    }
  },
  methods: {
    toggle: function(){
      this.expanded = !this.expanded;
    },

    addToCalendar: function(){
      let baseurl = 'https://www.google.com/calendar/event?action=TEMPLATE';
      let title = '&text=' + this.event;
      let description = '&details=' + this.description;
      let location = '&location=' + this.location;

      let date = new Date(0); 
      date.setUTCSeconds(this.time.seconds);
      let momentTimeBegin = moment(date).format('YYYYMMDD[T]HHmmss')
      let momentTimeEnd = moment(date).add('1', 'hours').format('YYYYMMDD[T]HHmmss')
      let dates = '&dates=' + momentTimeBegin + '/' + momentTimeEnd;
      let gcalURL = baseurl + title + description + location + dates;

      let encodedURL = encodeURI(gcalURL)
      // console.log(encodedURL)
      window.open(encodedURL, '_blank')
    },

    goToSingleEvent: function(myevent, location, datetime, points, description, id, attendees, password){
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
          password: password
        }
      })
    },

    deleteEvent: function(id){
      if (this.DELETE_STATUS === false){
        this.DELETE_STATUS = true;
        return;
      }
      db.collection("events").doc(id).delete()
      .then(function() {
        // console.log("Document successfully deleted!");
      })
      .catch(function(error) {
          // console.error("Error removing document: ", error);
      });
    }
  },
  mounted() {
    this.$smoothReflow()
  },
}
</script>

<style scoped>
  div .fa-angle-down {
      transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
      transform: none;
  }

  div.expanded .fa-angle-down {
      transform: rotate(180deg);
  }

  .delete-color {
    color: red;
  }
</style>
