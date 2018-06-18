
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
        customId="AutocompleteSeller"
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
    };
  },
  firebase: {
    db: connection.ref(),
    plantsRef: plants,
    sellersRef: sellers
  },
  computed: {
    sellers: function() {
       var temp = [];
      console.log(this.sellersRef);
      // db doest seems to work in mounted
      this.sellersRef.forEach(function(childSnapshot) {
        var childKey = childSnapshot[".key"];
        var childData = childSnapshot.name;
        temp.push([childKey, childData]);
      });
      return temp
    }
  },
  methods: {
    formValidation: function(e) {
      this.errors = [];
      if (!this.name) this.errors.push("Name empty.");
      else if (!this.checkSeller())
        this.errors.push("Please select a seller in the list");
      else {
        this.increaseID();
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

      connection.ref("plants/" + this.aiID).set(
        {
          name: this.name,
          seller: this.selectedSeller,
          id: this.aiID
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
