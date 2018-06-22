import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ajouter from '@/components/AddPlant'
import AjouterObjet from '@/components/AddObject'

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
      component: Ajouter,
      
    },
    {
      path: '/ajouter/:id/:plantToUpdate',
      name: 'Modifier',
      component: Ajouter
    },
    {
      path: '/ajoutermisc/:object',
      name: 'AjouterMisc',
      component: AjouterObjet
    } 
  ]
})

// children: [
//   {
//     // UserProfile will be rendered inside User's <router-view>
//     // when /user/:id/profile is matched
//     path: 'profile',
//     component: UserProfile
//   },