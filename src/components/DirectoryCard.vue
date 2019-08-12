<template>
    <div v-on:click="toggle()" class="card has-text-centered">

        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img v-bind:src="imageURL"/>
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{name}}</p>
                    <p class="subtitle is-6">{{year}}</p>
                </div>
            </div>
        </div>

        <div class="content fs-s5">
            <p> <strong>{{major}}</strong> </p>
            <div v-if="expanded">
                <p> <strong>{{standing}}</strong> </p>
                <p> <strong>{{pledge_class}}</strong> </p>
            </div>
        </div>

        <footer v-if="expanded" class="card-footer fs-s4">
            <!--Link to user page, passing all necessary props (including image URL)-->
            <router-link v-bind:to="{name: 'user', params: { uniqname: this.uniqname, major: this.major, name: this.name, pledge_class: this.pledge_class, year: this.year, imageURL: this.imageURL}}">
                <a class='card-footer-item is-centered'>View Profile</a>
            </router-link>
        </footer>
    </div>
</template>


<script>
import smoothReflow from 'vue-smooth-reflow'

export default {
    mixins: [smoothReflow],
    props: ['major','meetings_left','name','pledge_class','points','standing','uniqname','year', 'imageURL'],
    data() {
        return {
            expanded: false,
            tag: '@' + this.uniqname, 
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





