
<template>
  <div class='ajouter'>
    
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

      existingID: null,
      sellerIDToUpdate: null,
      sellerNameToUpdate: null,
      speciesIDToUpdate: null,
      speciesNameToUpdate: null
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
    }
  },
  computed: {
    // sellers: function() {
    //   var temp = [];
    //   // db doest seems to work in mounted
    //   this.sellersRef.forEach(function(childSnapshot) {
    //     var childKey = childSnapshot[".key"];
    //     var childData = childSnapshot.name;
    //     temp.push([childKey, childData]);
    //   });
    //   return temp;
    // }
  },
  methods: {
    formValidation: function(e) {
      this.errors = [];
      if (!this.name) this.errors.push("Name empty.");
      else {
        if (!this.checkSeller())
          this.errors.push("Please select a seller in the list");
        if (!this.checkSpecies())
          this.errors.push("Please select a species in the list");
        else {
          this.setPlant();
          this.name = "";
          this.$router.push("/");
          // .database().ref().child('posts').push().key;
        }
      }
    },
    increaseID: function() {
      this.aiID = parseInt(this.db[0].count) + 1;
      connection.ref("aiID").set({ count: String(this.aiID) });
    },
    checkSeller: function() {
      var seller = document.getElementById("autocompleteSeller").value;
      var isInArray = false;

      for (const key in this.sellersRef) {
        const element = this.sellersRef[key];
        console.log(seller === element.name);
        if (element.name === seller) {
          isInArray = true;
        }
      }

      return isInArray ? true : false;
    },

    checkSpecies: function() {
      var seller = document.getElementById("autocompleteSpecies").value;
      var isInArray = false;

      for (const key in this.speciesRef) {
        const element = this.speciesRef[key];
        console.log(seller === element.name);
        if (element.name === seller) {
          isInArray = true;
        }
      }

      return isInArray ? true : false;
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
          name: this.name,
          seller: this.selectedSeller,
          species : this.selectedSpecies,
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
