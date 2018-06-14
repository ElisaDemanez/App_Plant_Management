<template>
  <div id="app">
    <div id=navbar>
      <router-link to='/'>Accueil </router-link>
      <span>|</span>
       <router-link to='/ajouter'>Ajouter une plante : </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 400px;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
