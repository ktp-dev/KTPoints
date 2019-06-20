<template>
  <div v-on:click="expanded = !expanded" class="card has-text-centered">
    <header class="card-header title">
      {{event}}
    </header>
    <div class="card-content">
      <p> <strong>{{location}}</strong>  </p>
      <p> <strong>{{time}} {{date}}</strong> </p>
      <p> <strong>{{points}} Points</strong> </p>
        <div v-if="expanded">
          <br>
          <p class='title'>About</p>
          <p> {{description}} </p>
        </div>
    </div>
  </div>
</template>


<script>
export default {
  mixins: [SmoothReflow],
  props: ['event', 'location', 'time', 'date', 'points', 'description'],
  data(){
    return {
      expanded: false,
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
</style>
