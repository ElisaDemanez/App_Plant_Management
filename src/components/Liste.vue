<template>
  <div class="liste">
      <ul class="list">
     
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
    </ul>
  </div>
</template>

<script>
import { connection } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      plantList: []
    };
  },
  firebase: {
    db: connection.ref()
  },
  created() {
    var plants = [];
    // db doest seems to work in mounted
    connection.ref("plants").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var id = childSnapshot.key;
        var name = childSnapshot.val().name;
        var seller = childSnapshot.val().seller;
        var plant = {};
        plant["id"] = id;
        plant["name"] = name;
        plant["seller"] = seller;
        plants.push(plant);
      });
    });
    
    // replace the seller id
    plants.forEach(plant => {
  
      for (const seller in this.db[2]) {
        if (this.db[2].hasOwnProperty(seller)) {
          const element = this.db[2][seller];

          if (plant.seller == seller) {
            plant['seller'] = element.name;
          }
        }
      }
    });
    this.plantList = plants;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
