<template>
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-3">
        <div class="card has-text-centered">
          <header class="card-header title">
            <p>Add New Event</p>
          </header>
          <div class="card-content">
            <div class="field">
              <input v-model="eventName" class="input is-primary" type="text" placeholder="Event">
              <input v-model="location" class="input is-primary" type="text" placeholder="Location">
              <input v-model="time" class="input is-primary" type="time">
              <input v-model="date" class="input is-primary" type="date">
              <input v-model="points" class="input is-primary" type="number" placeholder="Points">
              <div class="mt4">
                <textarea v-model="description" class="textarea is-primary" placeholder="Description"></textarea>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a v-on:click="goToEvents" class="card-footer-item">Cancel</a>
            <a v-on:click="createEvent" class="card-footer-item">Confirm</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as firebase from 'firebase/app';
import "firebase/firestore";
import { db } from '@/main.js'
import router from '@/router.js'

export default {
  data() {
    return {
      eventName: "",
      location: "",
      date: "",
      time: "",
      points: "",
      description: ""
    }
  },
  methods: {
    goToEvents: function(){
      router.push({ name: 'events'})
    },
    validate: function(){
      if (this.eventName != "" && this.location != "" && this.date != "" && this.time != "" && this.points != ""){
        return true;
      } 
      else {
        return false;
      }
    },
    createEvent: function(){
      if (!this.validate()){return;}
      let myTimestamp = new Date(this.date + ' ' + this.time);
      myTimestamp = myTimestamp.getTime() / 1000;

      db.collection('events').doc().set({
        event: this.eventName,
        location: this.location,
        points: this.points,
        description: this.description,
        time: new firebase.firestore.Timestamp(myTimestamp)
      })
      .then(() => {
        router.push({ name: 'events'})
      });
    },   
  },
  mounted() {
    // console.log(firebase.firestore) 
  }
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

</style>
