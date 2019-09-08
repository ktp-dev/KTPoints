<template>
    <div style="font-size: 0.7rem;" class="column is-half has-text-centered">
      <div class="columns is-centered is-mobile">
          <i v-bind:class="{ 'sky-blue': S1}" class="column fas fa-circle fa-xs light-grey"></i>
          <i v-bind:class="{ 'sky-blue': S2}" class="column fas fa-circle fa-xs light-grey"></i>
          <i v-bind:class="{ 'sky-blue': S3}" class="column fas fa-circle fa-xs light-grey"></i>
          <i v-bind:class="{ 'sky-blue': S4}" class="column fas fa-circle fa-xs light-grey"></i>
      </div>
    </div>
</template>

<script>

export default {
    props: ['S1', 'S2', 'S3', 'S4'],

    data() {
        return{}
    },
};
</script>

<style scoped>

</style>
