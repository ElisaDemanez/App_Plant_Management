<template>
  <div class="showPlant">

    <p> There is <i>{{ totalPlantCount }}</i> corresponding plants </p>
    <v-layout row wrap>
 
      <v-flex md6 xs12>
        <v-text-field v-model="searchTxt" label="Search on name " placeholder="ex: 'eche prolif' " append-icon="search"></v-text-field>
      </v-flex>

            <v-flex sm6 md5 xs12 offset-md1>
         <v-select
         outline  
          :items="filters"
          v-model="orderBy"
          item-text="name"
          item-value="value"
          label="Filter by : "
        ></v-select>
      </v-flex>
      

    </v-layout>

      <Liste :plants="plants" />

  </div>

</template>
<script>
/* eslint-disable */

import { connection } from "@/components/firebase.js";
import Liste from "@/components/Plants/Read/Liste";


export default {
  name: "showPlant",
  data() {
    return {
      additionalFilters: false,
      totalPlantCount: 0,
      searchTxt: "",
      orderBy: "IDdesc",
      sellerFilter: "",
      filters: [
        { name: "ID Descending", value: "IDdesc" },
        { name: "ID Ascending", value: "IDasc" },
        { name: "Temp. Descending", value: "TempDesc" },
        { name: "Temp. Ascending", value: "TempAsc" }
      ],

    };
  },
  components: {
    Liste, 
    
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
          let id = plant.id.toString();
          let searchTxt = self.normlizeText(self.searchTxt);

          // Filter 1 on name if multiple words
          let arrSearchTxt = searchTxt.split(" ");
          var wordMatch = [];
          arrSearchTxt.forEach(element => {
            let filter1 =
              species.indexOf(element) >= 0 ||
              subsp.indexOf(element) >= 0 ||
              id.indexOf(element) >= 0;
            wordMatch.push(filter1);
          });
          // filter on sellers
          var filter2 = true;
          if (self.sellerFilter !== "") {
            let searchSeller = self.normlizeText(self.sellerFilter);
            let seller = self.normlizeText(plant.sellerName);
            filter2 = seller.indexOf(searchSeller) >= 0;
          }

          return !wordMatch.includes(false) && filter2;
        }
      });
      return filtered;
    },
    plants: function() {
      var plantsArray = [];
      var self = this;
      var plantsObject = this.plantsRef;
      var keys = Object.keys(plantsObject).filter(function(key) {
        return self.filteredPlantsIndexes.includes(key);
      });

      this.totalPlantCount = keys.length;

      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];

        if (typeof plantsObject[element] != "string" && plantsObject[element]) {
          var plantObj = plantsObject[element];

          // else for the last page, it bugs
          if (typeof plantObj !== "undefined" && element !== ".key") {
            self.completePlantInfos(plantObj);
            plantsArray.push(plantObj);
          }
        }
      }
      if (self.orderBy) {
        self.sortbyId(plantsArray);
        // this.activePage = 1;
      }
      return plantsArray;
    },
    sellersName: function() {
      var temp = [];
      var self = this;
      for (const key in self.sellersRef) {
        if (self.sellersRef.hasOwnProperty(key)) {
          const element = self.sellersRef[key];
          if (typeof element.name !== "undefined") temp.push(element.name);
        }
      }
      return temp;
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
    sortbyId: function(keys) {
      var self = this;
      if (self.orderBy) {
        if (self.orderBy == "IDasc" || self.orderBy == "IDdesc") {
          keys.sort(function(a, b) {
            return self.orderBy == "IDasc" ? a.id - b.id : b.id - a.id;
          });
        } else if (self.orderBy == "TempAsc" || self.orderBy == "TempDesc") {
          keys.sort(function(a, b) {
            const c = parseInt(a.temperature);
            const d = parseInt(b.temperature);
            return self.orderBy == "TempAsc" ? c - d : d - c;
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