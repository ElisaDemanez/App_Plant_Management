<template>
    <v-layout row wrap>
 
        <v-flex xs3 sm2 v-for="(file, index) in $route.params.plantToUpdate.images" v-bind:key="index">
      
            <v-card>
                <v-card-media :src="file.url" height="100px" width="100px" class="zoom_on_hover">
                </v-card-media>
                <v-btn color="primary" dark small absolute top right fab style="right: -20px;" @click="deleteImg(file, index)">
                    <v-icon>delete</v-icon>
                </v-btn>

            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
/* eslint-disable */
import { connection,app } from "@/components/firebase.js";

import deleteImage from "@/components/Images/main.js";
export default {
  name: "ImagesUpdate",
  data() {
    return {
      plantID: this.$route.params.plantToUpdate.id.toString()
    };
  },

  methods: {
    deleteImg: function(file, index) {
      var self = this;
      var confirmation = confirm("Do you really want to delete the image ?");
      if (confirmation) {
        connection.ref("plants/" + self.plantID + "/images/" + index).remove();

        deleteImage(self.plantID, file.name)
         console.log('ici, besoin refresh');
          // this.$router.push({
          //   name: "Ajouter",
          //   params: {
          //     id: plantID,
          //     plantToUpdate: connection.ref("plants/" + plantID)
          //   }
          // })
    
      }
    }
  },
  watch: {}
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
