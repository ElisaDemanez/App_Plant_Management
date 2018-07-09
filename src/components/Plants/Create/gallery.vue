
<template>
<p class="text-xs-left"> Previous Images : 
  <lightbox
  id="mylightbox"
  :images="images"
  :image_class=" 'img-responsive img-rounded' "
  :album_class=" 'my-album-class' "
  > 
  </lightbox>
  </p>  
</template>

<script>
/* eslint-disable */
// credits : https://jsfiddle.net/o1037uks/
import Lightbox from "vue-simple-lightbox";

export default {
  name: "gallery",
  data() {
    return {};
  },
  props: ["imagesObj"],
  components: {
    Lightbox
  },

  methods: {},
  computed: {
    images: function() {
      var temp = [];
      for (const key in this.imagesObj) {
        if (this.imagesObj.hasOwnProperty(key)) {
          const element = this.imagesObj[key];
          console.log(key, element);
          temp.push({ src: element.url });
        }
      }
      return temp;
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped >
.my-album-class {
  display: flex !important;
  flex-wrap: wrap;
}

.my-gallery a img {
  object-fit: cover;
  width: 100%;
}
</style>
