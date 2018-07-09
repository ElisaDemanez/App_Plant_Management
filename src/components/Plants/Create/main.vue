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
                <v-flex xs10 offset-xs1>
                    <v-text-field id='description' textarea rows="1" auto-grow v-model='description' label='Additional infos' />
                </v-flex>
            </v-layout>
<gallery v-if="$route.params.plantToUpdate != null " :imagesObj="$route.params.plantToUpdate.images"/>
            <input type="file" id="photo" accept="image/*" ref="imgInput" multiple @change="processImage">
            <v-container fluid grid-list-sm>
                <v-layout row wrap>

                    <ImagePreview v-for="(file, index) in images" :file="file" v-if="file" v-bind:key="index" />
                </v-layout>
            </v-container>

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
import ImagePreview from "@/components/Plants/Create/ImagePreview";
import setPlant from "@/components/Plants/Create/createUpdate.js";
import gallery from "@/components/Plants/Create/gallery";

export default {
  name: "Ajouter",

  components: {
    AutocompleteDropdown,
    submitButtons,
    ImagePreview,
    gallery
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
        setPlant(this);
      } else {
        return;
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
    processImage: function() {
      this.images = null;
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
