<template>
    <div v-on:click="toggle()" class="card has-text-centered">
        <div class="card-content">
            <div class="media">
                <!-- <div class="media-left">
                    <figure class="image is-3by3">
                        <img v-bind:src="imageURL1"/>
                    </figure>
                    </div> -->
                <div class="media-content">
                    <p class="title is-4">{{name}}</p>
                    <p class="subtitle is-6">{{this.tag}}</p>
                </div>
            </div>
        </div>

        <div class="content">
            <p> <strong>{{year}}</strong> </p>
            <div v-if="expanded">
                <p> <strong>{{major}}</strong> </p>
                <p> <strong>{{standing}}</strong> </p>
                <p> <strong>{{pledge_class}}</strong> </p>
            </div>
        </div>
    </div>
</template>


<script>
import smoothReflow from 'vue-smooth-reflow'
import {storage} from '@/main.js'

export default {
    mixins: [smoothReflow],
    props: ['major','meetings_left','name','pledge_class','points','standing','uniqname','year'],
    data(){
        return {
            expanded: false,
            tag: '@' + this.uniqname, 
            gsURL: 'gs://ktpoints-68071.appspot.com/profile_pictures/',
        }
    },
    computed: {
    },
    methods: {
        toggle: function() {
            this.expanded = !this.expanded
            console.log(this.expanded);
        },
        imgURL: function() {
            
            var gsURL = 'gs://ktpoints-68071.appspot.com/profile_pictures/';
            gsURL = gsURL.concat(this.uniqname);
            gsURL = gsURL.concat('.jpg');


            return (storage.refFromURL(gsURL).getDownloadURL().then(function(url) {
                console.log(url);
                return url;
            }));
        }
    },
    mounted() {
        this.$smoothReflow()
    }
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

</style>
