<template>
  <div class="hello">
    
    <Liste/>

  </div>
</template>

<script>
/* eslint-disable */

import Liste from "@/components/Liste";

export default {
  components: {
    Liste: Liste
  },
  data() {
    return {
    };
  }
};
</script>

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
