<template>
    <div class="control is-expanded pb3">
        <div class="fira-sans-light-italic slate">
            {{ label }}
        </div>
        <input @input="changeInput" class="input is-primary" type="text">
        <div class="divider slate"></div>
    </div>
</template>

<script>

import router from '@/router.js'

export default {
    props: ['label', 'dataLabel'],
    data() {
        return {
            newDataLabel: '',
        }
    },
    methods: {
        changeInput(event){
            this.newDataLabel = event.target.value;
            this.$emit('newLabel', this.newDataLabel );
        },
    },
};
</script>

<style></style>
