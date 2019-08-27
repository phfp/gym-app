import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSession from 'vue-session'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify/lib'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueSession)
Vue.use(VeeValidate)
Vue.use(Vuetify)

var store = {
  state:{
    exercicios: sessionStorage.getItem('exercicios') ? JSON.parse(sessionStorage.getItem('exercicios')) : null
  },
  getters:{
    getExercicios: state => {
      return state.exercicios;
    },

    getExercicioById: (state) => (id) => {
      return state.exercicios.find(exercicios => exercicios.id == id)
    }
  },
  mutations:{
    setNome(state,n){
    }
  }
};

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'http://127.0.0.1:8000'

new Vue({
  store: new Vuex.Store(store),
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')