<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <p> Ajouter une plante : <router-link to='/ajouter'>x</router-link></p>
    <Liste/>

  </div>
</template>

<script>
import Liste from '@/components/Liste'

export default {
  components: {
    Liste: Liste
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
