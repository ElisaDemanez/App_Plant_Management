<template>
  <div class="liste">
    <!-- <p> There is -->
      <!-- <i>{{ totalPlantCount }}</i> corresponding plants </p> -->
    <v-layout row wrap>
      <v-flex md6 xs4>
        <v-btn color="primary" dark @click.stop="additionalFilters = true">Open filter</v-btn>
      </v-flex>

      <v-flex md6 xs8>
        <v-text-field v-model="searchTxt" label="Search on name " placeholder="ex: 'eche prolif' " append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
      <v-dialog v-model="additionalFilters" max-width="600px" transition="dialog-bottom-transition">
        <v-card>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
              <v-flex xs5>Order by id :
             <v-radio-group v-model="idOrder" class="pt-0">
              <v-radio key="desc" value="desc" label="Desc" />
              <v-radio key="asc" value="asc" label="Asc" />
            </v-radio-group>
          </v-flex>
         <v-flex xs5>Order by id :
             <v-radio-group v-model="idOrder" class="pt-0">
              <v-radio key="desc" value="desc" label="Desc" />
              <v-radio key="asc" value="asc" label="Asc" />
            </v-radio-group>
          </v-flex>  <v-flex xs5>Order by id :
             <v-radio-group v-model="idOrder" class="pt-0">
              <v-radio key="desc" value="desc" label="Desc" />
              <v-radio key="asc" value="asc" label="Asc" />
            </v-radio-group>
          </v-flex>  <v-flex xs5>Order by id :
             <v-radio-group v-model="idOrder" class="pt-0">
              <v-radio key="desc" value="desc" label="Desc" />
              <v-radio key="asc" value="asc" label="Asc" />
            </v-radio-group>
          </v-flex>
          </v-layout>
        </v-container></v-card>
      </v-dialog>
    <v-card>

<Liste :plants="plants"/>
        <v-pagination :length="totalPages" v-model="activePage" 
        ></v-pagination>
    </v-card>

  </div>

</template>

<script>
/* eslint-disable */

import { connection } from "@/components/firebase.js";
import Liste from "@/components/Liste";

export default {
  name: "Home",
  data() {
    return {
      additionalFilters: false,
      totalPages: null,
      activePage: 2,
      plantsPerPage: 6,
      totalPlantCount: 0,
      searchTxt: "",
      idOrder: ""
    };
  },
  components: {
    Liste: Liste
  },
  firebase: {
    db: connection.ref(),
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
      console.log(this.db);
      var plantsArray = [];
      var self = this;
      var plantsObject = this.plantsRef;

      // pagination
      var keys = Object.keys(plantsObject).filter(function(key) {
        return self.filteredPlantsIndexes.includes(key);
      });
      if (this.searchTxt || this.idOrder) {
        this.sortPlants(keys);
        this.activePage = 1;
      }
      this.totalPlantCount = keys.length;
      this.totalPages = Math.ceil(keys.length / this.plantsPerPage);
      const lastPlant = this.activePage * this.plantsPerPage;
      const firstPlant = lastPlant - this.plantsPerPage;

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