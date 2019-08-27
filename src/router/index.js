import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/paginas/Home'
import Login from '@/paginas/Login'
import CadastroUser from '@/paginas/CadastroUser'
import Perfil from '@/paginas/Perfil'
import Exercicios from '@/paginas/exercicios/Exercicios'
import CadastroExercicio from '@/paginas/exercicios/CadastroExercicio'
import Exercicio from '@/paginas/exercicios/Exercicio'

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
    {
      path: '/exercicios',
      name: 'Exercicios',
      component: Exercicios
    },
    {
      path: '/cadastroexercicio',
      name: 'CadastroExercicio',
      component: CadastroExercicio
    },
    {
      path: '/exercicios/exercicio/:id',
      name: 'Exercicio',
      component: Exercicio
    }
  ]
})
