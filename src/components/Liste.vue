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
                <v-list-tile-title v-html="'#'+plant.id +': '+ plant.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="plant.sellerName"></v-list-tile-sub-title>
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

import { connection, plants, sellers } from "@/components/firebase.js";

export default {
  name: "Liste",
  data() {
    return {
      loading: true,
      // plantsObject: {},
      totalPages: null,
      activePage: 1,
      plantsPerPage: 6,
    };
  },
  firebase: {
    sellersRef: sellers,
    plantsRef: {
      source: connection.ref("plants"),
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function() {},
      // this is called once the data has been retrieved from firebase
      readyCallback: function() {}
    },
    sellersRefObj: {
      source: connection.ref("sellers"),
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function() {},
      // this is called once the data has been retrieved from firebase
      readyCallback: function() {}
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

      // gets all keys
      var keys = Object.keys(plantsObject).filter(function(key) {
        return plantsObject[key];
      });
      // -1 because there's one i don't display at the end
      this.totalPages = Math.ceil((keys.length -1) / this.plantsPerPage);
    

      const lastPlant = this.activePage * this.plantsPerPage;
      const firstPlant = lastPlant - this.plantsPerPage;

      for (let index = firstPlant; index < lastPlant; index++) {
        const element = keys[index];
        var plantObj = plantsObject[element];

        // else for the last page, it bugs
        if (typeof plantObj !== "undefined" && element !== ".key") {
          // // replace the seller id
          self.sellersRef.forEach(seller => {
            if (plantObj.seller == seller[".key"]) {
              plantObj["sellerName"] = seller.name;
              return;
            }
          });
          if (!plantObj["sellerName"]) {
            plantObj["sellerName"] = "seller error";
          }
          plantsArray.push(plantObj);
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
      // console.log("item", this.plantsRef[id]);
      // console.log(this.$firebaseRefs.plantsRef.child(id));
    }
  }
};
</script>

<style>
</style>
