<template>
  <div class="liste">
    

            <!-- <v-subheader v-if="plant.header" :key="plant.header">{{ plant.header }}</v-subheader>
            <v-divider v-else-if="plant.divider" :inset="plant.inset" :key="index"></v-divider> -->
            <!-- <v-list-tile v-else :key="plant.id" avatar > -->

        <v-card >
       <v-list two-line>
          <template v-for="(plant, index) in plants">
            
           <v-list-tile  :key="plant.id" avatar ripple @click="{}">
              <v-list-tile-content :key="index">
                <v-list-tile-title>
                  #{{plant.id}}:   
                  <strong v-if="plant.speciesName"  v-html="plant.speciesName">
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
              <v-list-tile-action>
         
              <v-icon  @click="updatePlant(plant.id)"   color="teal">update</v-icon>
            
              <v-icon  @click="deletePlant(plant.id)" color="deep-orange darken-2">delete</v-icon>
              
            </v-list-tile-action>
           </v-list-tile>
            <v-divider :key="index" inset ></v-divider>
          </template>
            <v-pagination :length="totalPages" v-model="activePage"></v-pagination>
        </v-list>
  </v-card>
  </div>
</template>

<script>
/* eslint-disable */

import { connection, sellers } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      loading: true,

      totalPages: null,
      activePage: 1,
      plantsPerPage: 6
    };
  },
  firebase: {
    plantsRef: {
      source: connection.ref("plants"),
      asObject: true
    },
    sellersRef: {
      source: connection.ref("sellers"),
      asObject: true
    },
    speciesRef: {
      source: connection.ref("species"),
      asObject: true
    }
  },
  created: function() {
    // plantsRef is undefined at the creation, so for now a each page change im checking if it contains plants
    // this.plantsObject = this.plantsRef;
    // // delete last object that is the name of the table
    // var lastItemKey = Object.keys(this.plantsObject)[
    //   Object.keys(this.plantsObject).length - 1
    // ];
    // console.log(this.plantsRef[lastItemKey]);
    // // apparently delete is bad. sorry.
    // delete this.plantsObject[lastItemKey];
  },

  computed: {
    plants: function() {
      var plantsArray = [];
      var self = this;
      var plantsObject = this.plantsRef;

      // pagination
      var keys = Object.keys(plantsObject).filter(function(key) {
        return plantsObject[key];
      });
      // -1 because there's one i don't display at the end
      this.totalPages = Math.ceil((keys.length - 1) / this.plantsPerPage);
      const lastPlant = this.activePage * this.plantsPerPage;
      const firstPlant = lastPlant - this.plantsPerPage;

      for (let index = firstPlant; index < lastPlant; index++) {
        const element = keys[index];

        if (typeof plantsObject[element] != "string" && plantsObject[element]) {
          var plantObj = plantsObject[element];

          // else for the last page, it bugs
          if (typeof plantObj !== "undefined" && element !== ".key") {
            plantObj["speciesName"] = this.speciesRef[plantObj.species].name.slice(0, 4) + ".";
            plantObj["sellerName"] = this.sellersRef[plantObj.seller].name;
            var subsp = this.speciesRef[plantObj.species][plantObj.subsp];
            plantObj["subspName"] = subsp.name ;
            plantObj["temperature"] = subsp.temperature;
            plantObj["exposure"] = subsp.exposure;

            plantsArray.push(plantObj);
          }
        }
      }
      return plantsArray;
    }
  },
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
    updatePlant: function(id) {
      this.$router.push({
        name: "Ajouter",
        params: {
          id: id,
          plantToUpdate: this.plantsRef[id]
        }
      });
    },
    replaceAttribute: function(target, parent, attribute) {
      for (const key in parent) {
        const object = parent[key];
        if (target[attribute] == key) {
          target[attribute + "Name"] = object.name;
        }
      }
    }
  }
};
</script>

<style>
</style>
