import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import VueFlashMessage from 'vue-flash-message';

require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.config.productionTip = false
 
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3300,
    important: true,
  }
});
Vue.use(VModal)


Vue.mixin({
  data: function() {
    return {
      get authHeader() {
        const webtoken = localStorage.getItem('jwt');
        return { headers: {
          Authorization:'Bearer ' + webtoken
        } 
      };
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
