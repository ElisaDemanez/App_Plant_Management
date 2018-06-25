<template>
  <div class="liste">
    <p> There is <i>{{ totalPlantCount }}</i> corresponding plants </p>
    <v-layout row wrap>
      <v-flex md6 xs4>
    <v-layout row wrap>
        
      <v-flex md6>Order by id :
      </v-flex>
       <v-flex md6>
               
     <v-radio-group v-model="idOrder" class ="pt-0">
      <v-radio
        key="desc"
        value="desc"
        label ="Desc"
      />
           <v-radio
        key="asc"
        value="asc"
        label ="Asc"
      />
    </v-radio-group>
      
      </v-flex>
    </v-layout>
      </v-flex>
      <v-flex md6 xs8>
        <v-text-field v-model="searchTxt" label="Search on name " placeholder="ex: 'eche prolif' " append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-card>
      <v-list two-line>
        <template v-for="(plant, index) in plants">

          <v-list-tile :key="plant.id" avatar ripple @click="{}">
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
            <v-list-tile-action>

              <v-icon @click="updatePlant(plant.id)" color="teal">update</v-icon>

              <v-icon @click="deletePlant(plant.id)" color="deep-orange darken-2">delete</v-icon>

            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="index" inset></v-divider>
        </template>
        <v-pagination :length="totalPages" v-model="activePage"></v-pagination>
      </v-list>

    </v-card>
    <v-btn @click="$forceUpdate()">Click me</v-btn>

  </div>

</template>

<script>
/* eslint-disable */

import { connection } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      loading: true,
      totalPages: null,
      activePage: 1,
      plantsPerPage: 6,
      totalPlantCount: 0,
      searchTxt: "",
      idOrder: ""
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
  computed: {
    plantsCompleted: function() {
      var plantsArray = {};
      var self = this;
      var plantsObject = this.plantsRef;

      var keys = Object.keys(plantsObject).filter(function(key) {
        return plantsObject[key];
      });
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];

        if (typeof plantsObject[element] != "string" && plantsObject[element]) {
          var plantObj = plantsObject[element];

          // else for the last page, it bugs
          if (typeof plantObj !== "undefined" && element !== ".key") {
            this.completePlantInfos(plantObj);
            plantsArray[parseInt(plantObj.id)] = plantObj;
          }
        }
      }
      return plantsArray;
    },
    filteredPlantsIndexes: function() {
      let self = this;
      let filtered = Object.keys(this.plantsCompleted).filter(function(index) {
        // Filter on title
        var plant = self.plantsRef[index];
        if (plant.id) {
          let species = self.normlizeText(plant.speciesName);
          let subsp = self.normlizeText(plant.subspName);
          let searchTxt = self.normlizeText(self.searchTxt);
          // Filter 1 on name if multiple words
          let arrSearchTxt = searchTxt.split(" ");
          var wordMatch = [];
          arrSearchTxt.forEach(element => {
            let filter1 =
              species.indexOf(element) >= 0 || subsp.indexOf(element) >= 0;
            wordMatch.push(filter1);
          });

          return !wordMatch.includes(false);
        }
      });

      return filtered;
    },
    plants: function() {
      var plantsArray = [];
      var self = this;
      var plantsObject = this.plantsRef;

      // pagination
      var keys = Object.keys(plantsObject).filter(function(key) {
        return self.filteredPlantsIndexes.includes(key);
      });
      this.sortPlants(keys);
      this.totalPages = Math.ceil(keys.length / this.plantsPerPage);
      const lastPlant = this.activePage * this.plantsPerPage;
      const firstPlant = lastPlant - this.plantsPerPage;

      this.totalPlantCount = keys.length;

      for (let index = firstPlant; index < lastPlant; index++) {
        const element = keys[index];

        if (typeof plantsObject[element] != "string" && plantsObject[element]) {
          var plantObj = plantsObject[element];

          // else for the last page, it bugs
          if (typeof plantObj !== "undefined" && element !== ".key") {
            this.completePlantInfos(plantObj);
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
    completePlantInfos: function(plantObj) {
      plantObj["speciesName"] = this.speciesRef[plantObj.species].name;
      plantObj["sellerName"] = this.sellersRef[plantObj.seller].name;
      var subsp = this.speciesRef[plantObj.species][plantObj.subsp];
      plantObj["subspName"] = subsp.name;
      plantObj["temperature"] = subsp.temperature;
      plantObj["exposure"] = subsp.exposure;
    },
    sortPlants: function(keys) {
      var self = this;
      if (self.idOrder) {
        if (self.idOrder == "asc") {
          keys.sort(function(a, b) {
            return a - b;
          });
        }
        if (self.idOrder == "desc") {
          keys.sort(function(a, b) {
            return b - a;
          });
        }
      }
    },
    normlizeText: function(str) {
      // Change to lower case and remove first & last spaces
      str = str.toLowerCase().trim();
      // Remove accents
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  }
};
</script>

<style scoped>

</style>
