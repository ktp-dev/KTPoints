<template>
  <div class="card has-text-centered">
    <header v-on:click="toggle()" class="card-header title fira-mono">
      <p>{{event}}</p>
      <div v-bind:class="{'expanded': expanded}" class="icon subtitle is-medium">
        <i class="fas fa-angle-down"></i> 
      </div>
    </header>

    <div v-on:click="toggle()" class="card-content fira-sans-light-italic">
      <p> <strong>{{location}}</strong>  </p>
      <p> <strong>{{datetime}}</strong> </p>
      <p> <strong>{{points}} Points</strong> </p>
      <div v-if="expanded">
        <br>
        <p class='title'>About</p>
        <p> {{description}} </p>
      </div>      
    </div>

    <div v-if="expanded">
      <footer class="card-footer">
        <a class="card-footer-item" v-on:click="addToCalendar()" target="_blank">Add to Cal</a>
        <a v-if="this.$store.state.userData.standing === 'Eboard'" class="card-footer-item">Edit</a>
        <a v-if="this.$store.state.userData.standing === 'Eboard'" class="card-footer-item">Delete</a>
        <a v-on:click="goToSingleEvent(event, location, datetime, points, description, id, attendees)" class="card-footer-item">See Event</a>
      </footer>
    </div>      

  </div>
</template>


<script>
import smoothReflow from 'vue-smooth-reflow'
import router from '@/router.js'
import store from '@/store.js'

export default {
  store,
  mixins: [smoothReflow],
  props: ['event', 'location', 'time', 'points', 'description', 'id', 'attendees'],
  data(){
    return {
      expanded: false,
    }
  },
  computed: {
    datetime: function(){
      let utcSeconds = this.time.seconds;
      let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(utcSeconds);
      let momentTime = moment(date).format('MMMM Do YYYY, h:mm:ss a')
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

      // console.log(this.time)
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
    goToSingleEvent: function(myevent, location, time, points, description, id, attendees){
      router.push({ name: 'event', 
      params: 
        { 
          event: myevent, 
          location: location, 
          time: time, 
          points: points,
          description: description,
          eventhash: id,
          attendees: attendees
        }
      })
    }
  },
  mounted() {
    this.$smoothReflow()
  },
}
</script>

<style lang="scss">
.card.has-text-centered {
  .card-header,
  .card-content,
  .card-footer {
    justify-content: center;
    align-items: center;
  }
}

div .fa-angle-down {
    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: none;
}

div.expanded .fa-angle-down {
    transform: rotate(180deg);
}

</style>
