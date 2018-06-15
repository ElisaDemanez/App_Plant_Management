

<template>


 
   <v-toolbar class="hidden-sm-and-down navbar">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
        <v-btn flat color="teal" value="Home" :to="{name:'Home'}">
        <span>Home</span>
      </v-btn>
      <v-btn flat color="teal" value="Ajouter" :to="{name:'Ajouter'}">
        <span>Add a plant</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
/* eslint-disable */

export default {
  name: "NavigationTop",
  
  components: {
        
    },

  data() {
    return {
    
    };
  },
  mounted() {
  },
  methods: {
   
  },
  computed: {

  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped >
.navbar {

  width: 100vw;
}
</style>
