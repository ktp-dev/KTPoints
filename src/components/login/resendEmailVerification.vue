<template>
    <div class="align-center pb1 fira-sans-light-italic mt1">
        Didn't recieve a verification email?
        <a class="sky-blue-text fw-lb" v-on:click='resend()'>Resend it</a>
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
        resend(){
            
        },
    },
};
</script>

<style></style>
