<template>
    <div class="liste">

        <v-container fluid grid-list-sm>
            <v-layout row wrap>
                <template v-for="(plant) in plants">
                    <v-flex xs12 md6 :key="plant.id" @click="active=plant" @click.stop="dialog= true" class="my-1">
                        <v-card :key="plant.id" avatar ripple style="min-height: 113px;" >
                            <v-layout row style="min-height: 113px;" >
                                <v-flex xs8>
                                    <v-card-title primary-title class="pt-2">
                                        <div class="body-2 font-size-bigger text-xs-left">
                                            #{{plant.id}}:
                                            <strong v-if="plant.speciesName" class="hidden-sm-and-down" v-html="plant.speciesName">
                                            </strong>
                                            <strong v-if="plant.speciesName" class="hidden-sm-and-up" v-html="plant.speciesName.slice(0, 4) + '.&nbsp;'">
                                            </strong>
                                            <span class="subheading">{{plant.subspName}}</span>
                                        </div>
                                    </v-card-title>
                                    <v-card-text class="pt-0">
                                        <v-layout row justify-space-between>
                                            <v-flex xs8 class="text-xs-left">
                                                {{plant.exposure}}
                                            </v-flex>
                                            <v-flex xs4 class="text-xs-left">
                                                {{plant.temperature}}°
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-flex>
                                <v-flex xs4>
                                    <v-card-media v-if="plant.images" :src="plant.images[Object.keys(plant.images)[0]].url" height="100%">
                                    </v-card-media>
                                    <div v-else style="height:100% !important;
                            " class="grey lighten-3"></div>
                                </v-flex>
                            </v-layout>

                        </v-card>
                    </v-flex>
                </template>
            </v-layout>
        </v-container>
        <plantDetailsDialog v-if="dialog" :dialog="dialog" :plant="active" @close="dialog = false" />
    </div>
</template>
<script>
/* eslint-disable */

import { connection } from "@/components/firebase.js";
import plantDetailsDialog from "@/components/utilitaries/plantDetailsDialog";

export default {
  name: "Liste",
  data() {
    return {
      dialog: false,
      active: ""
    };
  },
  components: {
    plantDetailsDialog: plantDetailsDialog
  },
  props: {
    plants: Array
  },
  firebase: {
    plantsRef: {
      source: connection.ref("plants"),
      asObject: true
    }
  },
  computed: {},
  methods: {
    deletePlant: function(id) {
      // // Known bug : unexplained : On computer, with mobiel display : confirm is not fired and always fake
      var oui = confirm(
        "Its like, gonna be gone, like forever. Like you sure its really dead ? You could like pop it in a lil bit of water or like idk "
      );
      if (oui) {
        this.$firebaseRefs.plantsRef.child(id).remove();
      }
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
  }
};
</script>

<style scoped>
.font-size-bigger {
  font-size: 16px !important;
}
</style>