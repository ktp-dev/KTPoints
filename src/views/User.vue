<template>
<section class="section" id = 'UserInfo'>
    <div class="columns is-centered">
    <div class="column is-two-fifths">
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
                        <p class="subtitle is-6">Year: {{year}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="columns is-mobile is-centered">
                <div class="column">
                    <p><strong>Major: {{major}}</strong></p>
                </div>
                <div class="column">
                    <p><strong>Pledge Class: {{pledge_class}}</strong></p>
                </div>
            </div>
            <div class="columns is-mobile is-centered">
                <div class="column">
                <div class="button is-rounded">
                    Message
                </div>
                </div>
                <div class="column">
                <div class="button is-rounded">
                    Meet
                </div>
                </div>
            </div>
            <h1>About</h1>
            Hello this is my about page
        </div>
    </div>
    </div>
    </div>
    </div>
</section>
</template>


<script>
export default {
    props: ['uniqname','major','name','pledge_class','year','imgURL']
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
