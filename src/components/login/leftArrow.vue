<template>
    <div v-on:click="signUp()" class="column is-quarter has-text-centered pointer">
      <i class="fas fa-arrow-left fa-2x sky-blue-text"></i>
    </div>
</template>

<script>

export default {
    props: ['nextSignup'],
    data() {
        return {
            sign1: null,
            sign2: null,
            sign3: null,
            sign4: null,
        }
    },
    methods: {
        signUp: function(){
            if (this.nextSignup === "S1") {
                this.goToSignup1();
            } else if (this.nextSignup === "S2") {
                this.goToSignup2();
            } else if (this.nextSignup === "S3") {
                this.goToSignup3();
            } else if (this.nextSignup === "S4") {
                this.goToSignup4();
            }

            this.setUpSignup();
        },
        goToSignup1: function(){
          this.sign1 = true;
          this.sign2 = false;
          this.sign3 = false;
          this.sign4 = false;
        },

        goToSignup2: function(){
          this.sign1 = false;
          this.sign2 = true;
          this.sign3 = false;
          this.sign4 = false;
        },

        goToSignup3: function(){
          this.sign1 = false;
          this.sign2 = false;
          this.sign3 = true;
          this.sign4 = false;
        },

        goToSignup4: function(){
          this.sign1 = false;
          this.sign2 = false;
          this.sign3 = false;
          this.sign4 = true;
        },
        setUpSignup(){
            this.$emit('S1', this.sign1 );
            this.$emit('S2', this.sign2 );
            this.$emit('S3', this.sign3 );
            this.$emit('S4', this.sign4 );

        },
    },
};
</script>

<style></style>
