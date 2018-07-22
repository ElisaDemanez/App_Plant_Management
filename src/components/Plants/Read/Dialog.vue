<template>
    <div class='details'>
        <v-dialog lazy v-model="dialog" max-width="500px">
            <v-card class="text-xs-left">
                <v-card-media v-if="plant.images" :src="plant.images[Object.keys(plant.images)[0]].url" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <h3 class="headline mb-0">
                        <span> #{{plant.id}}: </span>

                        <span class="weight-800">{{plant.speciesName}} </span>
                        <span class="grey--text weight-100">{{plant.subspName}} </span>
                    </h3>
                </v-card-title>

                <v-card-text>
                    <h4 class="primary--text">Infos</h4>
                    <p class="grey--text text--darken-3 subheading mb-1">Seller : {{plant.sellerName}}</p>

                    <p class="grey--text text--darken-3 subheading">Exposure : {{plant.exposure}}</p>
                    <h4 class="primary--text mb-1" v:if="plant.description">Details</h4>
                    <p> {{plant.description}}</p>
                      <h4 class="primary--text mb-1" v:if="plant.images">Gallery</h4>
                         
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="updatePlant(plant)" icon>
                        <v-icon color="primary">update</v-icon>
                    </v-btn>
                    <v-btn @click="deletePl(plant.id)" icon>
                        <v-icon color="deep-orange darken-2">delete</v-icon>
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
/* eslint-disable */

import { connection, app } from "@/components/firebase.js";
import  deletePlant from "@/components/Plants/Delete/main.js";

export default {
  name: "Dialog",

  data() {
    return {
      options: {
        closeText: "X"
      }
    };
  },
  props: {
    dialog: Boolean,
    plant: Object
  },
  components: {},
  firebase: {
    db: {
      source: connection.ref(),
      asObject: true
    },
    plantsRef: {
      source: connection.ref("plants"),
      asObject: true
    }
  },

  computed: {
    plantDescription: function() {
      this.$bindAsObject("user", connection.ref("plants").child(this.plant.id));
      return this.user.description;
    }
  },
  methods: {
    deletePl: function(id) {
      console.log('ici')
      deletePlant(this, id);
    },

    updatePlant: function(plant) {
      this.$router.push({
        name: "Ajouter",
        params: {
          id: plant.id,
          plantToUpdate: plant
        }
      });
    }
  },
  watch: {
    dialog: function() {
      if (!this.dialog) this.$emit("close");
    }
  }
};
</script>

<style >
.weight-100 {
  font-weight: 100 !important;
}
.weight-800 {
  font-weight: 800 !important;
}

.my-album-class {
  display: flex !important;
  flex-wrap: wrap;
}

.my-gallery a img {
  object-fit: cover;
  width: 100%;
}
</style>
