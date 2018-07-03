 

<template>
  <v-flex xs12 md6 >
    <img  :src="src" alt="" style="width:100%">
  </v-flex>
</template>

<script>
/* eslint-disable */
// credits : https://jsfiddle.net/o1037uks/

export default {
  name: "ImagePreview",
  data() {
    return {
      src: ""
    };
  },
  props: ["file"],

  methods: {
    loadPicture(file) {
      let self = this;
      var reader = new FileReader();
      reader.onload = function(e) {
        self.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  mounted() {
    this.loadPicture(this.file);
  }
};
</script>

<style scoped >
</style>
