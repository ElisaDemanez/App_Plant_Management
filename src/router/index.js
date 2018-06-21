import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ajouter from '@/components/AddPlant'
import AddObject from '@/components/AddObject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ajouter',
      name: 'Ajouter',
      component: Ajouter
    },
    {
      path: '/ajouter/:id/:plantToUpdate',
      name: 'Modifier',
      component: Ajouter
    },
    {
      path: '/ajouter/Misc/:object',
      name: 'AjouterMisc',
      component: AddObject
    } 
  ]
})
