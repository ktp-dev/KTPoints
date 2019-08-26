<template>
  <div>
  <NavBar/>
  <div class="columns is-centered">
    <div class="column is-3">
      <div v-for="directoryInfo in directoryList" :key="directoryInfo.uniqname">
        <p class='title'>Points: {{directoryInfo.points}}</p>
        <DirectoryCard :key=0 v-bind='directoryInfo'/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { db } from '@/main.js';
import DirectoryCard from '@/components/DirectoryCard.vue';
import store from '@/store.js';

export default {
  name: 'leaderboard',
  store,
  data() {
    return {
      directoryList: []
    }
  },
  mounted() {
    db.collection("users").orderBy("points", "desc").limit(5).get().then((querySnapshot) => {
      querySnapshot.forEach((doc)=>{
        this.directoryList.push(doc.data())
      })
    })
  },
  components: {
    DirectoryCard, NavBar
  }
}
</script>