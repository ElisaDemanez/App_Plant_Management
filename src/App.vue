<template>
<v-app id="app">
 
<NavigationTop />
  <v-container d-flex  color="purple">
      <v-layout row wrap>
        <v-flex xs12 sm8 md6 lg6 xl4 offset-sm2 offset-md3 offset-lg3 offset-sm5 >
          <router-view/>
        </v-flex>
      </v-layout>
  </v-container>

<NavigationBottom />
</v-app>
</template>

<script>
import NavigationBottom from "@/components/utilitaries/NavigationBottom.vue";
import NavigationTop from "@/components/utilitaries/NavigationTop.vue";

export default {
  name: "App",
  components: {
    NavigationBottom,
    NavigationTop
  }
};
</script>

<style>
#app {
  /* width: 400px; */
  margin: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
