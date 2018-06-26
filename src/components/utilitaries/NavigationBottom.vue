
<template>

 <v-card class="hidden-sm-and-up" flat>

    <v-bottom-nav :value="true" absolute color="white"  id='navbar' >
      <v-btn flat color="primary" value="Home" :to="{name:'Home'}">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="Ajouter" :to="{name:'Ajouter'}">
        <span>Add a plant</span>
        <v-icon>add</v-icon>
      </v-btn>
   <v-menu offset-y>
      <v-btn flat slot="activator" color="primary" >Miscellaneous        <v-icon>accessible_forward</v-icon></v-btn>

      <v-list >
        <v-list-tile   v-for="(item, index) in miscellaneous" :key="index" :to="{name: item.route, params : { object : item.param} }">
          <v-list-tile-title class="primary--text" >{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-bottom-nav>
 
  </v-card>

</template>

<script>
/* eslint-disable */

export default {
  name: "NavigationBottom",

  data() {
    return {
      miscellaneous: [
        { title: "Add a seller", route :"AjouterMisc", param: "sellers" },
        { title: "Add a species",route :"AjouterMisc", param: "species" },
        { title: "Add subspecies", route: "AjouterSousespèce" }
      ]
    };
  }
};
</script>

<!-- Add '' attribute to limit CSS to this component only -->
<style scoped >
#navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
