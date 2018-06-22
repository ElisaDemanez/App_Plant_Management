<template>
  <div class='ajouter'>
    <div v-if="!authorizedObjects.includes($route.params.object)" >
        Error, "{{$route.params.object}}" not allowed 
    </div>
    <v-form v-else id="form"  method="get" >
     
      <v-text-field
       v-bind:id='$route.params.object' 
       v-model='name' 
       v-bind:label="label" 
       :rules="nameRules"
      required/>
      <!-- <input type='submit' value='Submit'  > -->
         <v-btn 
         @click='formValidation'> submit
        </v-btn  >
    </v-form>

  </div>
</template>

<script>
/* eslint-disable */
import { connection } from "@/components/firebase.js";
// Change authorizedObjects to allow another url parameter
export default {
  name: "AjouterObjet",

  data() {
    return {
      authorizedObjects: ["species", "sellers"],
      name: "",
      nameRules: [
        v => !!v || "Is required",
        v => (v && v.length <= 45) || "Must be less than 45 characters"
      ]
    };
  },
  props: {
    object: String
  },
  firebase: {
    db: {
      source: connection.ref(),
      asObject: true
    }
  },

  computed: {
    label: function() {
      if (this.$route.params.object == "sellers") return "Add a new seller";
      else if (this.$route.params.object == "species")
        return " Add a new specie";
      else return this.$route.params.object;
    }
  },
  methods: {
    formValidation: function(e) {
      var object = this.db[this.$route.params.object];
      var alreadyIn = false;

      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          if (this.name.toLowerCase() == element.name.toLowerCase()) {
            alreadyIn = true;
          }
        }
      }
      if (alreadyIn) return;
      else {
        connection.ref(this.$route.params.object).push({
          name: this.name
        });
        this.$router.push("/");
      }
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped >
</style>
