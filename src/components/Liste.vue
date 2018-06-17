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

        <v-card >
     
       <v-list two-line>
          <template v-for="(plant, index) in plants">
            
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
import { connection,plants, sellers } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      loading: true
      // plantList: []
    };
  },
  firebase: {
    plantsRef: plants,
    sellersRef: sellers,
    db : connection,
  },
  computed: {
    plants: function() {

      var plants = [];
      var self = this;
      // get plants 
      this.plantsRef.forEach(function(childSnapshot) {
        var plant = {};
        var id = childSnapshot[".key"];
        var name = childSnapshot.name;
        plant["id"] = id;
        plant["name"] = name;
        
        // replace the seller id
        self.sellersRef.forEach(element => {
          if (childSnapshot.seller == element[".key"]) {
            plant["seller"] = element.name;
            return;
          }
         
        });
         if(!plant['seller']) {
            plant["seller"] = "seller error";
            
          }
        plants.push(plant);
      });

      this.loading = false;
      return plants;
    }
  },
  methods: {
    deletePlant: function(id) {
       var oui =  confirm('Its like, gonna be gone, like forever. Like you sure its really dead ? You could like pop it in a lil bit of water or like idk ')
     if(oui) { 
             this.$firebaseRefs.plantsRef.child(id).remove()
     }
    },
    updatePlant: function(id) {
      console.log(id);
    
    }
  }
};
</script>

<style>
</style>
