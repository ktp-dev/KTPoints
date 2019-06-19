<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/user/sletap">About</router-link> -->
    </div>
    <transition name='slide-fade' mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
/*  Handles route transitioning */
.slide-fade-enter-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-fade-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
