
<template>

   <v-toolbar class="hidden-xs-only navbar">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon>   -->
    <v-toolbar-title>Plant Management</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
        <v-btn flat color="primary" value="showPlant" :to="{name:'showPlant'}">
        <span>Home</span>
      </v-btn>
      <v-btn flat color="primary" value="Ajouter" :to="{name:'Ajouter'}">
        <span>Add a plant</span>
      </v-btn>
       <v-menu offset-y>
      <v-btn flat slot="activator" color="primary" >Miscellaneous</v-btn>
      <v-list >
        <v-list-tile   v-for="(item, index) in miscellaneous" :key="index" :to="{name: item.route, params : { object : item.param} }">
          <v-list-tile-title class="primary--text" >{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
/* eslint-disable */

export default {
  name: "NavigationTop",

  components: {},

  data() {
    return {
       miscellaneous: [
        { title: "Add a seller", route :"AjouterMisc", param: "sellers" },
        { title: "Add a species",route :"AjouterMisc", param: "species" },
        { title: "Add subspecies", route: "AjouterSousespèce" }
      ]
    };
  },

};
</script>

<style scoped >
.navbar {
  width: 100vw;
}
</style>
