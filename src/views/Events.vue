<template>
  <div class="gradient pb4">
    <NavBar />
    <div class="section">
      <transition-group name='flip-list' class="columns is-centered is-multiline">
        <div v-for="eventinfo in events" :key="eventinfo.location" class="column is-3">
          <EventCard :key=0 v-bind='eventinfo'/>
        </div>
      </transition-group>

      <transition name="flip-list">
        <div v-if="this.$store.state.userData.standing === 'Eboard'" class='field is-grouped'>
          <router-link to="/event/add-event">
            <button class='button is-large'>Add Event</button>
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import store from '@/store.js'
import * as firebase from 'firebase/app';
import { db, auth } from '@/main.js'
import NavBar from '@/components/NavBar'

export default {
  name: 'events',
  data () {
    return {
      events: [],
      show: false,
    }
  },
  components: {
    EventCard,
    NavBar
  },
  mounted() {
    // Firebase Events DB Call
    let myTimestamp = parseInt(new Date().getTime()/1000);
    let fbtime = new firebase.firestore.Timestamp(myTimestamp, 0)
    let subscriber = db.collection("events").where('time', '>=', fbtime).limit(10).onSnapshot((querySnapshot) => {
      this.events = []
      querySnapshot.forEach((doc) => {
        this.events.push(doc.data())
        this.events[this.events.length-1].id = doc.id
      })
      console.log(this.events)
    })
  },
}
</script>

<style scoped>
  .flip-list-move {
    transition: transform .5s;
  }

  .flip-list-enter-active {
    transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .flip-list-leave-active {
    transition: all .5s cubic-bezier(0.42,0,0.58,1);
    position: absolute;
  }

  .flip-list-enter, .flip-list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  .flip-list-item {
    transition: all .5s cubic-bezier(0.42,0,0.58,1);
    display: inline-block;
  }
</style>