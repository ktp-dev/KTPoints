<template>
  <div class="section">
      <transition-group name='flip-list' class="columns is-centered is-multiline">
        <div v-for="eventinfo in events" :key="eventinfo.location" class="column is-3">
          <EventCard :key=0 v-bind='eventinfo'/>
        </div>
    </transition-group>
    <button v-on:click="addEvent" class='button title'>Add Event</button>
    <button v-on:click="shuffle" class='button title'>Shuffle</button>
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
  transform: translateY(30px);
}

</style>

<script>
import EventCard from '@/components/EventCard.vue';
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      events: 
      [
        {
          event: "Ethics Meeting",
          location: 'North Quad 2486',
          time: '8:30 PM',
          date: '2/17/19',
          points: 20,
          description: 'Lorem hipsum flexatarian'
        },
        {
          event: "Vue Workshop",
          location: 'East Quad 1776',
          time: '4:30 PM',
          date: '6/19/19',
          points: 15,
          description: 'Lorem impsum dollar sign'
        },
      ]
    }
  },
  methods: {
    addEvent: function(){
      let myEvent = {
          event: "Vue Workshop",
          location: 'East Quad 1776',
          time: '4:30 PM',
          date: '6/19/19',
          points: 15,
          description: 'Lorem impsum dollar sign'
        };
        this.events.push(myEvent);
    },
    shuffle: function(){
        this.events.sort(() => Math.random() - 0.5);
    },
  },
  components: {
    EventCard
  },
}
</script>

