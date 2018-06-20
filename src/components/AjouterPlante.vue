
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
        customId="AutocompleteSeller"
        v-model="selectedSeller"
        :prefilledValue="sellerIDToUpdate"
        :prefilledText="sellerNameToUpdate"
        :UnfilteredData="sellers"/>
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
      name: "",
      selectedSeller: null,
      aiID: "",
      sellerIDToUpdate: null,
      sellerNameToUpdate: null,
      existingID: null
    };
  },
  props: {
    id: String
  },
  firebase: {
    db: connection.ref(),
    plantsRef: plants,
    sellersRef: sellers
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

      // FOR NOW RECREAT ONE AT WITH A NEW ID
    } else {
      // console.log("undefined");
    }
  },
  computed: {
    sellers: function() {
      var temp = [];
      // db doest seems to work in mounted
      this.sellersRef.forEach(function(childSnapshot) {
        var childKey = childSnapshot[".key"];
        var childData = childSnapshot.name;
        temp.push([childKey, childData]);
      });
      return temp;
    }
  },
  methods: {
    formValidation: function(e) {
      this.errors = [];
      if (!this.name) this.errors.push("Name empty.");
      else if (!this.checkSeller())
        this.errors.push("Please select a seller in the list");
      else {
        this.setPlant();
        this.name = "";
        // alert('youdid it')
        this.$router.push("/");
        // .database().ref().child('posts').push().key;
      }
    },
    increaseID: function() {
      this.aiID = parseInt(this.db[0].count) + 1;
      connection.ref("aiID").set({ count: String(this.aiID) });
    },
    checkSeller: function() {
      var seller = document.getElementById("AutocompleteSeller").value;
      var isInArray = false;
      this.sellers.forEach(element => {
        if (element[1] === seller) {
          isInArray = true;
          return;
        }
      });
      return isInArray ? true : false;
    },
    setPlant: function() {
      //  if i want an auto id
      //  this.$firebaseRefs.plantsRef.push({
      // name: this.item
      // })
      console.log(this.existingID)
      if ( typeof this.existingID != "undefined") {
        console.log("update")
        var id = this.existingID;
      } else {
        console.log("create")
        
        this.increaseID();
        var id = this.aiID;
      }
      connection.ref("plants/" + id).set(
        {
          name: this.name,
          seller: this.selectedSeller,
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
