<template>
<v-app id="app">
 
<NavigationTop />
  <v-container class ="body-container" d-flex  color="purple">
      <v-layout row wrap>
        <v-flex xs12 sm10 md8 lg8 xl4 offset-sm1 offset-md2 offset-lg2  >
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
  margin: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
* :not(.material-icons){
  font-family: "Avenir", Helvetica, Arial, sans-serif !important;
}
h2 {
  font-weight: 100 !important;
}

@media (max-width: 960px) {
  .body-container {
    padding-bottom: 13vh !important;
  }
}
.my-album-class {

  min-height: 150px!important;
}

.my-gallery a img {

height: 100px;
object-fit: cover;
}
</style>
