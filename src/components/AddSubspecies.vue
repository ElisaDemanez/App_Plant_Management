
<template>
  <div class='ajouter'>
      <p v-if='errors.length'>
          <ul>
            <li v-for='error in errors' :key="error.id">{{ error }}</li>
        </ul>
       </p>
   
    <v-form  id="form" method="get" >
     
      <AutocompleteDropdown
        customId="species"
        v-model="selectedSpecies"
        :UnfilteredData="speciesRef"
       />
        <br>
        <v-container v:if=" selectedSpecies != null" >
          <v-text-field 
       v-model='name' 
       label = 'Subspecies name' 
       :rules="nameRules"
      required/>
        <v-select
          :items="exposures"
          label="Exposure"
          v-model='exposure' 
          required
          single-line
          auto
        ></v-select>
          <v-text-field 
        v-model='temp' 
        type = "number"
        label = 'Freezing temp' 
        required/>
        
        </v-container>

         <v-btn color='primary'
         @click='formValidation'> submit
        </v-btn>
        <v-btn flat value="Home" :to="{name:'Home'}" >cancel</v-btn>
    </v-form>

  </div>
</template>

<script>
/* eslint-disable */

import { connection, plants, sellers } from "@/components/firebase.js";
import AutocompleteDropdown from "@/components/utilitaries/AutocompleteDropdown.vue";

export default {
  name: "AddSubspecies",

  components: {
    AutocompleteDropdown
  },

  data() {
    return {
      selectedSpecies: null,
      errors: [],
      exposures: ["Full sun", "3/4 sun", "Half-shadow", "Shade"],
      name: "",
      nameRules: [
        v => !!v || "Is required",
        v => (v && v.length <= 45) || "Must be less than 45 characters"
      ],
      temp: "",
      exposure: "",
    };
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

  computed: {},
  methods: {
    formValidation: function(e) {
      if (this.selectedSpecies == null) {
        this.errors.push("Choose a species");
        return;
      } else {
        var alreadyIn = false;
        var object = this.speciesRef[this.selectedSpecies];

        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (typeof element.name !== "undefined") {
              if (this.name.toLowerCase() == element.name.toLowerCase()) {
                alreadyIn = true;
              }
            }
          }
        }
        if (alreadyIn) {
          this.errors.push("Already in the database !");
          return;
        } else {
          connection.ref("species/" + this.selectedSpecies).push({
            name: this.name,
            temperature: this.temp,
            exposure: this.exposure
          });
          this.$router.push("/");
        }
      }
    }
  }
};
</script>

<style scoped >
</style>
