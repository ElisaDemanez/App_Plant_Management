<template>
    <div class='ajouter'>
        <div id="form">
            <h2 class="text-xs-left display-3 grey--text text--darken-2"> Add a plant </h2>
            <p v-if='errors.length'>
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for='error in errors' :key="error.id">{{ error }}</li>
                </ul>
            </p>
            <p v-if="existingID"> Modifier la plante n° {{existingID}}</p>
            <v-layout wrap>
                <v-flex xs12 sm8 md6 lg6 xl4>
                    <AutocompleteDropdown customId="Species" v-model="selectedSpecies" :prefilledValue="speciesIDToUpdate" :prefilledText="speciesNameToUpdate"
                        :UnfilteredData="speciesRef" :linkAdd="'AjouterMisc'" :linkAddParams="'species'" />
                </v-flex>

                <v-flex xs12 sm8 md6 lg6 xl4>

                    <AutocompleteDropdown v-if="this.selectedSpecies !== null || typeof this.$route.params.plantToUpdate !=='undefined'" customId="Subspecies"
                        v-model="selectedSubspecies" :prefilledValue="subspeciesIDToUpdate" :prefilledText="subspeciesNameToUpdate"
                        :UnfilteredData="subspeciesRef" :linkAdd="'AjouterSousespèce'" />
                </v-flex>

                <v-flex xs12 sm8 md6 lg6 xl4>
                    <AutocompleteDropdown customId="Seller" v-model="selectedSeller" :prefilledValue="sellerIDToUpdate" :prefilledText="sellerNameToUpdate"
                        :UnfilteredData="sellersRef" :linkAdd="'AjouterMisc'" :linkAddParams="'sellers'" />
                </v-flex>
            </v-layout>

            <v-text-field id='description' v-model='description' label='Additional infos' />

            <label for="photo"></label>
            <input type="file" id="photo" accept="image/*" ref="imgInput" multiple @change="processImage">
            <v-container fluid grid-list-sm>
            <v-layout row wrap>
            <!-- problem, only loading on first upload. loop is not redoing itself-->
            <ImagePreview v-for="(file, index) in images" :file="file" v-if="file" v-bind:key="index" />
            </v-layout></v-container>
            <div class="text-xs-center">
                <v-progress-circular indeterminate v-if="loading" color="primary"></v-progress-circular>
            </div>

            <submitButtons @form-validation="formValidation" />

        </div>
    </div>
</template>
<script>
// huge thanks to https://www.youtube.com/watch?v=J2Wp4_XRsWc
/* eslint-disable */
import { connection, app } from "@/components/firebase.js";
import AutocompleteDropdown from "@/components/utilitaries/AutocompleteDropdown.vue";
import submitButtons from "@/components/utilitaries/submitButtons";
import ImagePreview from "@/components/utilitaries/ImagePreview";

export default {
  name: "Ajouter",

  components: {
    AutocompleteDropdown,
    submitButtons,
    ImagePreview
  },

  data() {
    return {
      errors: [],
      aiID: "",
      description: "",
      images: null,
      loading: false,
      descriptionRules: [
        v => (v && v.length <= 150) || "Must be less than 150 characters"
      ],
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
    if (typeof params.plantToUpdate !== "undefined") {
      var plant = params.plantToUpdate;
      this.existingID = plant.id;
      this.description = plant.description;
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
      if (this.selectedSpecies)
        var temp = this.speciesRef[this.selectedSpecies];
      else var temp = this.speciesRef[this.$route.params.plantToUpdate.species];

      return temp;
    }
  },
  methods: {
    formValidation: function(e) {
      this.errors = [];
      if (!this.checkAutocomplete("autocompleteSeller", this.sellersRef))
        this.errors.push("Please select a seller in the list");
      if (!this.checkAutocomplete("autocompleteSpecies", this.speciesRef))
        this.errors.push("Please select a species in the list");
      if (!this.checkAutocomplete("autocompleteSubspecies", this.subspeciesRef))
        this.errors.push("Please select a species in the list");

      if (!this.errors.length) {
        this.loading = true;
        this.setPlant();
      } else {
        return;
      }
    },
    setPlant: function() {
      const self = this;
      if (this.existingID == null) {
        //create
        this.increaseID();
        var id = this.aiID;
      } else if (typeof this.existingID == "number") {
        //update
        var id = this.existingID;
      }
      //push images
      if (this.images) {
        function storeimg(image) {
          var storedIMG = app.storage().ref(id + "/" + image.name);
          console.log("function");
          storedIMG
            .put(image)
            .then(function() {
              return storedIMG.getDownloadURL();
            })
            .then(function(urli) {
              console.log("lastpromise");
              connection.ref("plants/" + id + "/images/").push(
                {
                  name: image.name,
                  url: urli
                },
                function(error) {
                  if (error) {
                    console.log("error", error);
                  } else {
                    console.log("successfull");
                  }
                }
              );
            });
          console.log("endfunction");
        }
        for (const key in self.images) {
          var reg = /^[0-9]+$/;
          if (reg.test(key)) storeimg(self.images[key]);
        }
        console.log("ici");
      }
      console.log("là");
      self.pushPlant(id);
    },
    pushPlant: function(id, imgURL = null) {
      const self = this;
      connection.ref("plants/" + id).set(
        {
          seller: self.selectedSeller,
          species: self.selectedSpecies,
          subsp: self.selectedSubspecies,
          imgURL: imgURL ? imgURL : null,
          description: self.description ? self.description : null,
          id: id
        },
        function(error) {
          if (error) {
            console.log("error", error);
          } else {
            console.log("successfull");
            self.loading = false;
            self.$router.push("/");
          }
        }
      );
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
    processImage: function() {
      this.images = this.$refs.imgInput.files;
    }
  }
};
</script>

<style scoped >
#form {
  display: flex;
  flex-direction: column;
}
.btn {
  max-width: 150px !important;
}
</style>
