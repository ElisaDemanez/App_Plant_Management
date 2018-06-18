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
import { connection, plants, sellers } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      loading: true
      // plantList: []
    };
  },
  firebase: {
    // plantsRefef: plants,
    sellersRef: sellers,
    // db: connection.ref(),
    plantsRef: {
      source: connection.ref("plants"),
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function() {},
      // this is called once the data has been retrieved from firebase
      readyCallback: function() {}
    }
  },
  computed: {
    plants: function() {
      // get plants
      var plantsArray = [];
      var self = this;

      var plantsObject = self.plantsRef;
      var lastItemKey = Object.keys(plantsObject)[Object.keys(plantsObject).length - 1]
      // apparently delete is bad. sorry.
      delete plantsObject[lastItemKey];
      
      for (const child in plantsObject) {
        const plantObj = plantsObject[child];

        // replace the seller id
        self.sellersRef.forEach(seller => {
          if (plantObj.seller == seller[".key"]) {
            plantObj["seller"] = seller.name;
            return;
          }
        });
         if(!plantObj['seller']) {
            plantObj["seller"] = "seller error";

          }
        plantsArray.push(plantObj);
      }
      return plantsArray;
    }
  },
  methods: {
    deletePlant: function(id) {
      var oui = confirm(
        "Its like, gonna be gone, like forever. Like you sure its really dead ? You could like pop it in a lil bit of water or like idk "
      );
      if (oui) {
        this.$firebaseRefs.plantsRef.child(id).remove();
      }
    },
    updatePlant: function(id) {
      // console.log(this.$firebaseRefs.plantsRefef.child(id));
      console.log("item", this.plantsRef[id]);
      //     const copy = {...item}
      //  // remove the .key attribute
      //  delete copy['.key']
      //  this.$firebaseRefs.items.child(item['.key']).set(copy)
    }
  }
};
</script>

<style>
</style>
