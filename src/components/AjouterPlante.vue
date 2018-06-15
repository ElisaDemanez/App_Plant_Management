
<template>
  <div class='ajouter'>
    
    <form id="form" @submit='formValidation' method="get" >
       <p v-if='errors.length'>
         <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='error in errors' :key="error.id">{{ error }}</li>
        </ul>
       </p>
   
      <AutocompleteDropdown
      id="AutocompleteSeller"
      v-model="selectedSeller"
       :UnfilteredData="sellers"/>
        <br>
     
      <v-text-field id='name'  v-model='name' label = 'Subspecies name ' />
      <!-- <p>{{db[0].count}}</p> -->
      <input type='submit' value='Submit'  >
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { connection } from "@/components/firebase.js";
import AutocompleteDropdown from "@/components/AutocompleteDropdown.vue"

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
      sellers: [],
      // selectedOption: null
    
    };
  },
  firebase: {
    db: connection.ref()
  },
  mounted() {
    var sellers = [];
    // db doest seems to work in mounted
    connection.ref("sellers").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().name;
        sellers.push([childKey, childData]);
      });
    });
    this.sellers = sellers;
    // console.log(sellers);
  },
  methods: {
   
    formValidation: function(e) {
      this.errors = [];
      if (!this.name) this.errors.push("Name empty.");
      else {
        this.increaseID();

        this.checkSeller();
 
        this.setPlant();
        this.name = "";
        alert('youdid it')
        this.$router.push('/')
        // .database().ref().child('posts').push().key;
      }
    },
    increaseID: function() {
      this.aiID = parseInt(this.db[0].count) + 1;
      connection.ref("aiID").set({ count: String(this.aiID) });
    },
    checkSeller: function() {
      // console.log(this.db)
      // var newSellerKey = connection.ref("sellers").push().key;
      // connection.ref("sellers/" + newSellerKey).set({ name: "kuentz" });
    },
    setPlant: function() {
      connection.ref("plants/" + this.aiID).set(
        {
          name: this.name,
          seller: this.selectedSeller
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
  },
  computed: {

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
