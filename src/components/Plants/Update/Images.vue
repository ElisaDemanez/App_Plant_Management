<template>
    <v-layout row wrap>
 
        <v-flex xs2 sm3 md4 v-for="(file, index) in images" v-bind:key="index" >
      
            <v-card  >
                <v-card-media :src="file.url" height="100px" width="100px" class="zoom_on_hover" @click.stop="dialog = true" @click="imageDisplayedSrc = file.url">
                </v-card-media>
                <v-btn color="primary" dark small absolute top right fab style="right: -20px;" @click="deleteImg(file, index)">
                    <v-icon>delete</v-icon>
                </v-btn>

            </v-card>
        </v-flex>

    <v-dialog
      v-model="dialog" >
         <v-card  >
                <v-card-media :src="imageDisplayedSrc" height="80vh" contain >
                </v-card-media>
            </v-card>

    </v-dialog>
    </v-layout>
</template>
<script>
/* eslint-disable */
import { connection, app } from "@/components/firebase.js";
import deleteImage from "@/components/Images/main.js";
export default {
  name: "ImagesUpdate",
  data() {
    return {
      plantID: this.$route.params.plantToUpdate.id.toString(),
      images: this.$route.params.plantToUpdate.images,
      dialog: false,
      imageDisplayedSrc: null
    };
  },

  methods: {
    deleteImg: function(file, index) {
      var self = this;
      console.log(self)
      var confirmation = confirm("Do you really want to delete the image ?");
      if (confirmation) {
        connection.ref("plants/" + self.plantID + "/images/" + index).remove();

        deleteImage(self.plantID, file.name);

        self.$bindAsObject(
          "newplant",
          connection.ref("plants").child(self.plantID)
        ).then(function() {
          self.images = self.newplant.images;
        });
      }
    }
  }
};
</script>

<style scoped >
.zoom_on_hover {
  transition: transform 0.2s;
}
.zoom_on_hover:hover {
  transform: scale(1.2);
}
</style>
