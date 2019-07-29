<template>
<div class="container">
  <p class="title">{{event}}</p>
  <p class="title">{{location}}</p>
  <p class="title">{{time}}</p>
  <p class="title">{{points}}</p>
  <p class="title">{{description}}</p>
  <p class="title">{{id}}</p>
  <p class="title">{{attendees}}</p>
  <div v-if="this.$store.state.userData.standing !== 'Guest'">
    <p v-on:click="addToEvent()">CHECK IN</p>
  </div>
</div>
</template>

<script>
import store from '@/store.js'

export default {
  store,
  props: ['event', 'location', 'time', 'points', 'description', 'id', 'attendees'],
  data() {
    return {
    }
  },
  mounted(){
    console.log(this.$store)
  }
}
</script>