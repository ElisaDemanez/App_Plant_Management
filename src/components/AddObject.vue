
<template>
  <div class='ajouter'>
     <h2 class="text-xs-left display-3 grey--text text--darken-2"> New {{$route.params.object}} </h2>
      <p v-if='errors.length'>
          <ul>
            <li v-for='error in errors' :key="error.id">{{ error }}</li>
        </ul>
       </p>
    <div v-if="!authorizedObjects.includes($route.params.object)" >
        Error, "{{$route.params.object}}" not allowed 
    </div>
    <v-form v-else id="form" method="get" >
     
      <v-text-field
       v-bind:id='$route.params.object' 
       v-model='name' 
       v-bind:label="label" 
       :rules="nameRules"
      required/>
      
 <submitButtons @form-validation="formValidation"/>
    </v-form>

  </div>
</template>

<script>
/* eslint-disable */
// this is a component to add anything with a name entry only
// Change authorizedObjects to allow another url parameter
import { connection } from "@/components/firebase.js";
import submitButtons from "@/components/utilitaries/submitButtons";
export default {
  name: "AjouterObjet",

  data() {
    return {
      authorizedObjects: ["species", "sellers"],
      name: "",
      nameRules: [
        v => !!v || "Is required",
        v => (v && v.length <= 45) || "Must be less than 45 characters",
        v => (v && v.length >= 3) || "Must be at least 3 characters"
      ],
      errors: []
    };
  },
  components: {
    submitButtons: submitButtons
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
      this.errors= []
      var object = this.db[this.$route.params.object];
      var alreadyIn = false;
      if (this.name && this.name.length >= 3 && this.name.length <= 45) {
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (this.name.toLowerCase() == element.name.toLowerCase()) {
              alreadyIn = true;
            }
          }
        }
        if (alreadyIn) {
          this.errors.push("Already in the database !");
          return;
        } else {
          connection.ref(this.$route.params.object).push({
            name: this.name
          });
          this.$router.push("/");
        }
      }
    else {
      this.errors.push("Please enter a valid name !");
          return;
    }
    }
  }
};
</script>

<style scoped >
</style>
