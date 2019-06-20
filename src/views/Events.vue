<template>
  <div class="section">
    <div class="columns is-centered">
      <div v-for="eventinfo in events" :key="eventinfo.location" class="column is-3">
        <EventCard v-bind='eventinfo'/>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
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
  components: {
    EventCard
  }
}
</script>