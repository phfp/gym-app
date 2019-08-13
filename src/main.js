import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSession from 'vue-session'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify/lib';


Vue.use(VueSession)
Vue.use(VeeValidate)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')