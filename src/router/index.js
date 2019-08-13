import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/paginas/Home'
import Login from '@/paginas/Login'
import CadastroUser from '@/paginas/CadastroUser'
import Perfil from '@/paginas/Perfil'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastrouser',
      name: 'CadastroUser',
      component: CadastroUser
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
  ]
})
