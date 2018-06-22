

<template>


 
   <v-toolbar class="hidden-sm-and-down navbar">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon>   -->
    <v-toolbar-title>Plant Management</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
        <v-btn flat color="teal" value="Home" :to="{name:'Home'}">
        <span>Home</span>
      </v-btn>
      <v-btn flat color="teal" value="Ajouter" :to="{name:'Ajouter'}">
        <span>Add a plant</span>
      </v-btn>
       <v-menu offset-y>
      <v-btn flat slot="activator" color="teal" >Miscellaneous</v-btn>
      <v-list >
        <v-list-tile   v-for="(item, index) in miscellaneous" :key="index" :to="{name: 'AjouterMisc', params : { object : item.param} }">
          <v-list-tile-title class="teal--text" >{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar-items>
  </v-toolbar>
 <!-- this.$router.push({
        name: "Ajouter",
        params: {
          id: id,
          plantToUpdate: this.plantsRef[id]
        }
      }); -->
</template>

<script>
/* eslint-disable */

export default {
  name: "NavigationTop",

  components: {},

  data() {
    return {
      miscellaneous: [
        { title: "Ajouter un vendeur", route: "addSeller", param: "sellers" },
        { title: "Ajouter une espèce", route: "addSpecie", param: "species" }
      ]
    };
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped >
.navbar {
  width: 100vw;
}
</style>
