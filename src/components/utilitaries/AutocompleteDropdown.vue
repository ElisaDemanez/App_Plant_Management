
<template>
    <div>
      
 <!--alll credits to https://designhammer.com/blog/reusable-vuejs-components-part-3-autocomplete-dropdown  -->
  <div class="dropdown" :class="{'open' : open }" >
    <v-layout row wrap>
      <v-flex xs10>
        <v-text-field 
         ref="search"
         autocomplete="off"
          v-bind:id="'autocomplete'+customId"
          v-bind:label="customId"
        v-model="searchText"
        @input="searchChanged"
        @keydown.esc="setOpen(false)"
         @blur="setOpen(false)"
          />
      </v-flex>
      <v-flex xs2>
    <v-container fill-height>
          <a class="toggle" @mousedown.prevent @click="setOpen(!open)">
        <span class="arrow-up">▲</span>
        <span class="arrow-down">▼</span>
        </a>
    </v-container>
      </v-flex>
    </v-layout>
      <v-list  class="suggestion-list">
          <template v-for="(suggestion, index) in matches">
            
           <v-list-tile  :key="index"  ripple @mousedown.prevent
              @click="suggestionSelected(suggestion)" class ="smaller_height">
              <v-list-tile-content :key="'x'+index">
                <v-list-tile-title v-html="suggestion[1].name"></v-list-tile-title>
                 <!-- <v-list-tile-sub-title v-html="suggestion[1].name">
                   </v-list-tile-sub-title>  -->
              </v-list-tile-content> 
           </v-list-tile>
            <v-divider :key="'y'+index" inset ></v-divider>
          </template>
                    
           <v-list-tile v-if="linkAdd" ripple @mousedown.prevent
             class ="smaller_height" value="Ajouter" :to="{name:linkAdd, params :{ object : linkAddParams}}">
              <v-list-tile-content >
                  Ajouter 
              </v-list-tile-content> 
           </v-list-tile>
            <!-- <v-divider v-if="linkAdd"  inset ></v-divider> -->
        </v-list>
  </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "AutocompleteDropdown",

  data() {
    return {
      searchText: " ",
      selectedOption: null,
      open: false
    };
  },
  props: {
    UnfilteredData: Object,
    customId: String,
    prefilledValue: String || Number,
    prefilledText: String,
    linkAdd: String,
    linkAddParams : String
  },
  created() {
    // if it's an update
    if (this.prefilledValue) {
      this.searchText = this.prefilledText;
      this.$emit("input", this.prefilledValue);
    }
  },
  beforeUpdate: function() {},
  methods: {
    suggestionSelected(suggestion) {
      this.open = false;
      // Don't remember why the .name, but that's the name
      this.searchText = suggestion[1].name;
      // magically changes the value to the id ([0])
      this.$emit("input", suggestion[0]);
    },
    setOpen(isOpen) {
      this.open = isOpen;
      //if you re-open it , it shows you everything
      if (this.open) {
        this.$refs.search.focus();
        this.searchText = "";
      }
    },
    searchChanged() {
      if (!this.open) {
        this.open = true;
      }
    }
  },
  computed: {
    matches() {
      return Object.entries(this.UnfilteredData).filter(option => {
        if (typeof option[1] !== "string" && typeof option[1] !== "undefined") {
          var optionText = option[1].name.toUpperCase();
          return optionText.match(this.searchText.toUpperCase());
        }
      });
    }
  }
};
</script>


<style scoped >
.smaller_height {
  height: 38px !important ;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.suggestion-list {
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #ddd;
  list-style: none;
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 2;
}

.dropdown.open .suggestion-list {
  display: block;
}

.dropdown .suggestion-list {
  display: none;
}

.toggle .arrow-up {
  display: none;
}

.open .toggle .arrow-up {
  display: inline-block;
}

.open .toggle .arrow-down {
  display: none;
}

.suggestion-list li {
  cursor: pointer;
}
</style>
