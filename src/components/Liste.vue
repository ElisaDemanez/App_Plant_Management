<template>
  <div class="liste">

      <v-list two-line>
        <template v-for="(plant, index) in plants">

          <v-list-tile :key="plant.id" avatar ripple  @click="active =plant" @click.stop="dialog = true">
      
            <v-list-tile-content :key="index">
              <v-list-tile-title>
                #{{plant.id}}:
                <strong v-if="plant.speciesName" class="hidden-sm-and-down" v-html="plant.speciesName">
                </strong>
                <strong v-if="plant.speciesName" class="hidden-sm-and-up" v-html="plant.speciesName.slice(0, 4) + '.'">
                </strong>
                {{plant.subspName}}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <v-layout row justify-space-between>
                  <v-flex xs10>
                    <span class="text-xs-right">{{plant.exposure}}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="text-xs-left">{{plant.temperature}}°</span>
                  </v-flex>
                </v-layout>
              </v-list-tile-sub-title>

            </v-list-tile-content>
            <!-- <v-list-tile-action>

              <v-icon @click="updatePlant(plant)" color="teal">update</v-icon>

              <v-icon @click="deletePlant(plant.id)" color="deep-orange darken-2">delete</v-icon>

            </v-list-tile-action> -->
          </v-list-tile>
          <v-divider :key="index" inset></v-divider>
        </template>

      </v-list>

     <plantDetailsDialog v-if="dialog" :dialog="dialog"
      :plant="active" @close="dialog=false"/>

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
      active :'',
    };
  },
  components : {
    plantDetailsDialog :plantDetailsDialog
  },
  props: {
    plants: Array,
  },
  firebase: {
    plantsRef: {
      source: connection.ref("plants"),
      asObject: true
    },
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
</style>