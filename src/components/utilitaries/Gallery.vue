 

<template>
<v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="(image,index) in images" :key="index" xs4>
              <img :src="image.url" class="image" alt="lorem" width="100%" height="100%" style="max-height: 152px; object-fit: cover;">
            </v-flex>
          </v-layout>
        </v-container>
</template>

<script>
/* eslint-disable */
// credits : https://jsfiddle.net/o1037uks/

export default {
  name: "Gallery",
  data() {
    return {
      src: ""
    };
  },
  props: {
    images: Object
  },

  methods: {
    loadPicture(file) {
      //   let self = this;
      //   var reader = new FileReader();
      //   reader.onload = function(e) {
      //     self.src = e.target.result;
      //   };
      //   reader.readAsDataURL(file);
    }
  },
  mounted() {
    // this.loadPicture(this.file);
  }
};
</script>

<style scoped >
</style>
