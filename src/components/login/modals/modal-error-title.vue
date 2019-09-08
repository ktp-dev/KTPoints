<template>
    <header class="modal-card-head">
        <p class="modal-card-title"> {{ this.title }} </p>
    </header>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  props: ['title'],
  data: function() {
	return {
	}
  },
};
</script>
