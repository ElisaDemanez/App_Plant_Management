
<template>
  <div class='ajouter'>
    <!-- need to to the update for sp. -->
    <form id="form" @submit='formValidation' method="get" >
       <p v-if='errors.length'>
         <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='error in errors' :key="error.id">{{ error }}</li>
        </ul>
       </p>
   <p v-if="existingID"> Modifier la plante n° {{existingID}}</p>
        <AutocompleteDropdown
        customId="Seller"
        v-model="selectedSeller"
        :prefilledValue="sellerIDToUpdate"
        :prefilledText="sellerNameToUpdate"
        :UnfilteredData="sellersRef"/>
        <br>
     <AutocompleteDropdown
        customId="Species"
        v-model="selectedSpecies"
        :prefilledValue="speciesIDToUpdate"
        :prefilledText="speciesNameToUpdate"
        :UnfilteredData="speciesRef"/>
        <br>
   
        <!-- {{this.$route.params.plantToUpdate}} -->
        <AutocompleteDropdown v-if="this.selectedSpecies !== null || typeof this.$route.params.plantToUpdate !=='undefined'"
        customId="Subspecies"
        v-model="selectedSubspecies"
        :prefilledValue="subspeciesIDToUpdate" 
        :prefilledText="subspeciesNameToUpdate" 
        :UnfilteredData="subspeciesRef"/>
        <br>
      <v-text-field id='name'  v-model='name' label = 'Subspecies name ' />
      <input type='submit' value='Submit'  >
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { connection, plants, sellers } from "@/components/firebase.js";
import AutocompleteDropdown from "@/components/utilitaries/AutocompleteDropdown.vue";

export default {
  name: "Ajouter",

  components: {
    AutocompleteDropdown
  },

  data() {
    return {
      errors: [],
      aiID: "",
      name: "",
      selectedSeller: null,
      selectedSpecies: null,
      selectedSubspecies: null,
      existingID: null,
      sellerIDToUpdate: null,
      sellerNameToUpdate: null,
      speciesIDToUpdate: null,
      speciesNameToUpdate: null,
      subspeciesIDToUpdate: null,
      subspeciesNameToUpdate: null
    };
  },
  props: {
    id: String
  },
  firebase: {
    db: connection.ref(),
    speciesRef: {
      source: connection.ref("species"),
      asObject: true
    },
    sellersRef: {
      source: connection.ref("sellers"),
      asObject: true
    }
  },
  created() {
    // if it's an update
    var params = this.$route.params;
    var plant = params.plantToUpdate;

    if (typeof plant !== "undefined") {
      this.existingID = plant.id;
      this.name = plant.name;
      this.sellerNameToUpdate = plant.sellerName;
      this.sellerIDToUpdate = plant.seller;
      this.speciesNameToUpdate = plant.speciesName;
      this.speciesIDToUpdate = plant.species;
      this.subspeciesIDToUpdate = plant.subsp;
      this.subspeciesNameToUpdate = plant.subspName;
    }
  },
  computed: {
    subspeciesRef: function() {
      console.log("tick");
      if (this.selectedSpecies)
        var temp = this.speciesRef[this.selectedSpecies];
      else
        var temp = this.speciesRef[
          this.$route.params.plantToUpdate.species
        ];

      console.log("temp", this.speciesRef, temp);
      return temp;
    }
  },
  methods: {
    formValidation: function(e) {
      this.errors = [];
      if (!this.name) this.errors.push("Name empty.");

      if (!this.checkAutocomplete("autocompleteSeller", this.sellersRef))
        this.errors.push("Please select a seller in the list");

      if (!this.checkAutocomplete("autocompleteSpecies", this.speciesRef))
        this.errors.push("Please select a species in the list");

      if (!this.checkAutocomplete("autocompleteSubspecies", this.subspeciesRef))
        this.errors.push("Please select a species in the list");
      else if (!this.errors.length) {
        this.setPlant();
        this.name = "";
        this.$router.push("/");
        // .database().ref().child('posts').push().key;
      }
    },
    increaseID: function() {
      this.aiID = parseInt(this.db[0].count) + 1;
      connection.ref("aiID").set({ count: String(this.aiID) });
    },
    checkAutocomplete: function(elementID, firebaseRef) {
      var item = document.getElementById(elementID).value;
      var isInArray = false;

      for (const key in firebaseRef) {
        const element = firebaseRef[key];
        if (element.name === item) {
          isInArray = true;
        }
      }
      return isInArray;
    },
    setPlant: function() {
      if (this.existingID == null) {
        //create
        this.increaseID();
        var id = this.aiID;
      } else if (typeof this.existingID == "number") {
        //update
        var id = this.existingID;
      }

      connection.ref("plants/" + id).set(
        {
          seller: this.selectedSeller,
          species: this.selectedSpecies,
          subsp: this.selectedSubspecies,
          name: this.name,
          id: id
        },
        function(error) {
          if (error) {
            console.log("error", error);
          } else {
            console.log("successfull");
          }
        }
      );
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped >
#form {
  display: flex;
  flex-direction: column;
}
</style>
