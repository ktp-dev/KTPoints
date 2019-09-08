<template>
    <div class="align-center pb1 fira-sans-light-italic mt1">
        Don't remember your password?
        <a class="light-green-text fw-lb" v-on:click='reset()'>Reset it here</a>
    </div>
</template>

<script>

import router from '@/router.js'

export default {
    props: ['RPWScreen'],
    data() {
        return {
            toggleVal: null,
        }
    },
    methods: {
        reset(){
            this.toggleVal = !this.RPWScreen;
            this.$emit( 'toggledVal', this.toggleVal );
        },
    },
};
</script>

<style></style>
