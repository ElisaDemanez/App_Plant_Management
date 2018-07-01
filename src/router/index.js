import Vue from 'vue'
import Router from 'vue-router'
import showPlant from '@/components/showPlant'
import Ajouter from '@/components/AddPlant'
import AjouterObjet from '@/components/AddObject'
import AddSubspecies from '@/components/AddSubspecies'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showPlant',
      component: showPlant
    },
    {
      path: '/add',
      name: 'Ajouter',
      component: Ajouter,
      
    },
    {
      path: '/add/:id/:plantToUpdate',
      name: 'Modifier',
      component: Ajouter
    },
    {
      path: '/misc/add/:object/',
      name: 'AjouterMisc',
      component: AjouterObjet
    },
    {
      path: '/subsp/add',
      name: 'AjouterSousespèce',
      component: AddSubspecies
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