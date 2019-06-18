import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import bulma and custom styles
// This file opens up 
// import './../node_modules/bulma/css/bulma.css';
import './../public/static/css/bulma.css';
import './../public/static/css/style.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


