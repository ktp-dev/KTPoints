<template>
  <div class="section">
    <transition-group name='flip-list' class="columns is-centered is-multiline">
      <div v-for="eventinfo in events" :key="eventinfo.location" class="column is-3">
        <EventCard :key=0 v-bind='eventinfo'/>
      </div>
    </transition-group>

    <transition name="flip-list">
      <div v-if="show" class='field is-grouped'>
        <router-link to="/KTP/events/add-event">
          <button class='button is-large'>Add Event</button>
        </router-link>
        <button v-on:click="shuffle" class='button is-large'>Shuffle</button>
      </div>
    </transition>
  </div>
</template>

<style>
  .flip-list-move {
    transition: transform .5s;
  }

  .flip-list-enter-active {
    transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .flip-list-enter, .flip-list-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }
</style>

<script>
import EventCard from '@/components/EventCard.vue';
import "firebase/firestore";
import { db, auth } from '@/main.js'

export default {
  data () {
    return {
      events: [
        // {
        //   event: "Ethics Meeting",
        //   location: 'North Quad 2486',
        //   time: '8:30 PM',
        //   date: '2/17/19',
        //   points: 20,
        //   description: 'Lorem hipsum flexatarian'
        // },
      ],
      show: false,
    }
  },

  methods: {
    shuffle: function(){
        this.events.sort(() => Math.random() - 0.5);
    },
  },

  components: {
    EventCard
  },
  mounted() {
    // Firebase Events DB Call
    db.collection("events").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.events.push(doc.data())
      })
      if (auth.currentUser){
        console.log(auth.currentUser)
        this.show = true;
      }
    })
  }
}
</script>

