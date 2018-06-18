
<template>


 <v-card height="150px" flat>


    <v-bottom-nav :value="true" absolute color="transparent"  id='navbar' class="hidden-sm-and-up" >
      <v-btn flat color="teal" value="Home" :to="{name:'Home'}">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="Ajouter" :to="{name:'Ajouter'}">
        <span>Add a plant</span>
        <v-icon>add</v-icon>
      </v-btn>
  
    </v-bottom-nav>

 
  </v-card>

</template>

<script>
/* eslint-disable */

export default {
  name: "NavigationBottom",

  data() {
    return {
    
    };
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped >
#navbar {

    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
