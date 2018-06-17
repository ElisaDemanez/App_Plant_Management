<template>
  <div class="liste">
      <!-- <ul class="list">
     
       <v-list two-line>
          <template v-for="(plant, index) in plantList">
            <v-subheader v-if="plant.header" :key="plant.header">{{ plant.header }}</v-subheader>
            <v-divider v-else-if="plant.divider" :inset="plant.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="plant.id" avatar >
          
              <v-list-tile-content>
                <v-list-tile-title v-html="'#'+plant.id +': '+ plant.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="plant.seller"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
    </ul> -->
      <v-progress-circular v-if="loading" indeterminate ></v-progress-circular>
        <v-card v-else>
     
       <v-list two-line>
          <template v-for="(plant, index) in plantList">
           <v-list-tile  :key="plant.id" avatar ripple @click="{}">
              <v-list-tile-content :key="index">
                <v-list-tile-title v-html="'#'+plant.id +': '+ plant.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="plant.seller"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
              <v-icon   @click="updatePlant(plant.id)"   color="teal">update</v-icon>
              <v-icon  @click="deletePlant(plant.id)" color="deep-orange darken-2">delete</v-icon>
              
            </v-list-tile-action>
           </v-list-tile>
            <v-divider :key="index" inset ></v-divider>
          </template>
        </v-list>
  </v-card>
  </div>
</template>

<script>
import { connection } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      loading: true,
      plantList: []
    };
  },
  firebase: {
    db: connection.ref()
  },
  created() {
    var plants = [];
    var here = this;
    connection.ref("plants").once("value", function(snapshot) {
      console.log("1");
      snapshot.forEach(function(childSnapshot) {
        var id = childSnapshot.key;
        var name = childSnapshot.val().name;
        var seller = childSnapshot.val().seller;
        var plant = {};
        plant["id"] = id;
        plant["name"] = name;
        plant["seller"] = seller;
        plants.push(plant);
        // replace the seller id
      });
      plants.forEach(plant => {
        console.log("2");

        for (const seller in here.db[2]) {
          if (here.db[2].hasOwnProperty(seller)) {
            const element = here.db[2][seller];

            if (plant.seller == seller) {
              plant["seller"] = element.name;
              // console.log(plant["seller"]);
            }
          }
        }
      });
      here.loading = false; 
    });

    this.plantList = plants;
  },
  methods: {
    deletePlant: function(id) {
      console.log(id);
    },
    updatePlant: function(id) {
      console.log(id);
    }
  }
};
</script>

<style>
</style>
