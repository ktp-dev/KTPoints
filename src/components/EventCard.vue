<template>
  <div v-on:click="toggle()" class="card has-text-centered">
    <header class="card-header title">
      <p>{{event}}</p>
      <div v-bind:class="{'expanded': expanded}" class="icon subtitle is-medium">
        <i class="fas fa-angle-down"></i> 
      </div>
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
  methods: {
    toggle: function(){
      this.expanded = !this.expanded;
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
