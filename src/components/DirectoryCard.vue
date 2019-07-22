<template>
    <div v-on:click="toggle()" class="card has-text-centered is-rounded">

        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img v-bind:src="imgURL()"/>
                    </figure>
                </div>
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
            gsURL: 'gs://ktpoints-68071.appspot.com/profile_pictures/' + this.uniqname + '.jpg',
            URL: 'a'
        }
    },
    computed: {
        profile_path: function() {
            return '/KTP/users/' + this.uniqname;
        }
    },
    methods: {
        toggle: function() {
            this.expanded = !this.expanded
        },
        copyURL: function(url) {
            this.URL = url;
        },
        imgURL: function() {
                if (this.URL != 'a') {
                    return this.URL;
                }
                var gsURL = 'gs://ktpoints-68071.appspot.com/profile_pictures/';
                gsURL = gsURL.concat(this.uniqname);
                gsURL = gsURL.concat('.jpg');
                var urlRef = storage.refFromURL(gsURL);


                urlRef.getDownloadURL().then((url) => {
                    this.URL = url;
                    return url;
                }).catch(function(error) {
                    switch (error.code) {
                        case 'storage/object was not found':
                            return 'altURL';
                        case 'storage/unknown':
                            return 'altURL';
                    }
                })
                console.log(this.URL);
                return this.URL;
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
