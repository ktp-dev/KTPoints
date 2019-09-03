<template>
<div>
  <NavBar />  
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="card has-text-centered">
          <header class="card-header title fira-mono">
            <p>Add New Event</p>
          </header>
          <div class="card-content">
            <div class="field">
              <div class="fira-sans-light-italic slate has-text-left">
                Event
              </div>
              <input v-model="eventName" class="input is-primary" type="text">
              <div class="divider slate"></div>

              <div class="fira-sans-light-italic slate has-text-left">
                Category
              </div>
              <div class="select is-fullwidth no-border">
                <select class="no-border" v-model='category'>
                  <option value=""></option>
                  <option>Eboard</option>
                  <option>Chapter</option>
                  <option>Tech Dev</option>
                  <option>Pro Dev</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Membership</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="divider slate"></div>

              <div class="mt2 fira-sans-light-italic has-text-left">
                Location
              </div>
              <input v-model="location" class="input is-primary" type="text">
              <div class="divider slate"></div>

              <div class="mt2 fira-sans-light-italic has-text-left">
                Start Time
              </div>
              <input v-model="time" class="input is-primary" type="time">
              <div class="divider slate"></div>

              <div class="mt2 fira-sans-light-italic has-text-left">
                End Time (default is an hour)
              </div>
              <input v-model="endTime" class="input is-primary" type="time">
              <div class="divider slate"></div>

              <div class="mt2 fira-sans-light-italic has-text-left">
                Date
              </div>
              <input v-model="date" class="input is-primary" type="date">
              <div class="divider slate"></div>

              <div class="mt2 fira-sans-light-italic has-text-left">
                Points
              </div>
              <input v-model="points" class="input is-primary" type="number">
              <div class="divider slate"></div>

              <div class="mt4 fira-sans-light-italic has-text-left">
                Description
              </div>
              <textarea v-model="description" class="textarea is-primary"></textarea>
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
</div>
</template>


<script>
import NavBar from '@/components/NavBar'
import { db, fbOperation } from '@/main.js'
import router from '@/router.js'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      eventName: '',
      location: '',
      date: '',
      time: '',
      endTime: '',
      points: '',
      description: '',
      category: '',
    }
  },
  methods: {
    goToEvents: function(){
      router.push({ name: 'events'})
    },
    validate: function(){
      if (this.eventName !== "" && this.location !== "" && this.date !== "" && this.time !== "" && this.points !== "" && this.category !== ""){
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

      if (this.endTime === ''){
        db.collection('events').doc().set({
          event: this.eventName,
          location: this.location,
          points: parseFloat(this.points),
          description: this.description,
          start_time: new fbOperation.Timestamp(myTimestamp, 0),
          end_time: new fbOperation.Timestamp(myTimestamp + 3600, 0),
          attendees: [],
          password: Math.random().toString(36).substring(2), // Generates random password
          category: this.category,
        })
        .then(() => {
          router.push({ name: 'events'})
        });
      }
      // if an endtime exists
      else if (this.endTime !== '') {
        let endTimestamp = new Date(this.date + ' ' + this.endTime);
        endTimestamp = endTimestamp.getTime() / 1000;
        db.collection('events').doc().set({
          event: this.eventName,
          location: this.location,
          points: parseFloat(this.points),
          description: this.description,
          start_time: new fbOperation.Timestamp(myTimestamp, 0),
          end_time: new fbOperation.Timestamp(endTimestamp, 0),
          attendees: [],
          password: Math.random().toString(36).substring(2), // Generates random password
          category: this.category
        })
        .then(() => {
          router.push({ name: 'events'})
        });
      }
    },   
  },
}
</script>