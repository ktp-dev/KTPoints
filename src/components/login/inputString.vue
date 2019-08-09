<template>
    <div class="control is-expanded pb3">
        <div class="fira-sans-light-italic slate">
            {{ label }}
        </div>
        <input @input="changeInput" :value="dataLabel" class="input is-primary" v-bind:type="this.t">
        <div class="divider slate"></div>
    </div>
</template>

<script>

import router from '@/router.js'

export default {
    props: ['label', 't', 'dataLabel'],
    data() {
        return {
            newDataLabel: '',
        }
    },
    methods: {
        changeInput: function(event){
            this.newDataLabel = event.target.value;
            this.$emit('newLabel', this.newDataLabel );
        },
    },
};
</script>

<style></style>
