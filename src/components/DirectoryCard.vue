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
                    <p class="subtitle is-6">{{year}}</p>

                    <!--Link to user page, passing all necessary props (including image URL)-->
                    <router-link :to="{name: 'user', params: { uniqname: this.uniqname, major: this.major, name: this.name, pledge_class: this.pledge_class, year: this.year, imgURL: imgURL()}}">
                        <p>{{this.tag}}</p>
                    </router-link>
                    
                    
                    <router-view></router-view>
                </div>
            </div>
        </div>

        <div class="content">
            <p> <strong>{{major}}</strong> </p>
            <div v-if="expanded">
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
    data() {
        return {
            expanded: false,
            tag: '@' + this.uniqname, 
            gsURL: 'gs://ktpoints-68071.appspot.com/profile_pictures/' + this.uniqname + '.jpg',
            URL: ''
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
                if (this.URL != '') {
                    return this.URL;
                }
                var gsURL_anon = 'gs://ktpoints-68071.appspot.com/profile_pictures/';
                var gsURL = gsURL_anon.concat(this.uniqname);
                gsURL = gsURL.concat('.jpg');
                gsURL_anon = gsURL_anon.concat('anon.jpg');
                var urlRef = storage.refFromURL(gsURL);

                
                urlRef.getDownloadURL().then((url) => {
                    this.URL = url;
                }).catch((error) => {
                    switch (error.code) {
                        case 'storage/object-not-found':
                            storage.refFromURL(gsURL_anon).getDownloadURL().then((url) => {
                                this.URL = url;
                            })
                            break;
                    }
                })
                return this.URL;
        },
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





