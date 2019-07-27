<template>
<transition name="slide-right" mode="out-in">
<section class="section" id = 'UserInfo'>
    <div class="columns is-centered">
    <div class="column is-three-fifths">
    <div class="card is-rounded">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="imgURL">
            </figure>
        </div>
    <div class="card-content is-small">
        <div class="media">
            <div class="columns is-mobile is-centered">
                <div class="column">
                    <div class="media-content">
                        <p class="title is-4">{{name}}</p>
                        <p v-if="isAlum" class="subtitle is-10"><strong>{{year}}</strong></p>
                        <p v-else class="subtitle is-10"><strong> Year: {{year}} </strong></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="columns is-mobile is-centered">
                <div class="column">
                    <p class="subtitle is-10"><strong>Major: {{major}}</strong></p>
                </div>
                <div class="column">
                    <p class="subtitle is-10"><strong>Pledge Class: {{pledge_class}}</strong></p>
                </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
                <p class="control">
                <a v-bind:href="messengerURL" class="button is-large is-rounded is-info">
                    <span class="icon is-medium">
                        <i class="fab fa-facebook-messenger"></i>
                    </span>
                </a>
                </p>
                <p class="control">
                <a v-bind:href="email" class="button is-large is-rounded is-primary">
                    <span class="icon is-medium">
                        <i class="fas fa-envelope"></i>
                    </span>
                </a>
                </p>
            </div>
            <h1>About Me</h1>
            Hello, I am in KTP - wow! 

            <h1>Career Interests</h1>
            I have interests, like many people in KTP

        </div>
    </div>
    </div>
    </div>
    </div>
</section>
</transition>
</template>


<script>
export default {
    props: ['uniqname','major','name','pledge_class','year','imgURL'], 
    computed: {
        isAlum: function() {
            if (this.year == 'Alumni') {
                return true;
            }
            return false;
        },
        email: function() {
            return 'mailto:' + this.uniqname + '@umich.edu'
        },
        messengerURL: function() {
            return 'https://www.messenger.com/'
        }
    }
}
</script>

<style scoped>
  /* Add some padding on this component for mobile */
  #UserInfo{
    padding-left: 50px;
    padding-right: 50px;
  }
</style>

<style>
    .is-horizontal-center {
      justify-content: center
    }
</style>
