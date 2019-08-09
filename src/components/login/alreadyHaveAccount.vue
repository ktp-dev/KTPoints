<template>
    <div class="align-center pb1 fira-sans-light-italic mt1">
        Already have an Account?
        <a class="light-green-text fw-lb" v-on:click='goToLogin()'>Login Here</a>
    </div>
</template>

<script>

import router from '@/router.js'

export default {
    props: [],
    data() {
        return {
            newScreen: '',
        }
    },
    methods: {
        goToLogin(){
            if (this.$store.state.userAuth !== null){
                router.push('/landing');
            }
            this.newScreen = "login";
            this.$emit('screenChanged', this.newScreen );
        },
    },
};
</script>

<style></style>
