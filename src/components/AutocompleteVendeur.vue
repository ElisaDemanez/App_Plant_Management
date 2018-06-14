
<template>
 <!--alll credits to https://designhammer.com/blog/reusable-vuejs-components-part-3-autocomplete-dropdown  -->
    <div class="dropdown" :class="{'open' : open}" >
      <input type="text" 
      v-model="searchText"
      @input="searchChanged"
      @keydown.esc="setOpen(false)"
       @blur="setOpen(false)"
    />
      <a class="toggle" @mousedown.prevent @click="setOpen(!open)">
      <span class="arrow-up">▲</span>
      <span class="arrow-down">▼</span>
    </a>
    <ul class="suggestion-list">
      <li v-for="(suggestion, index) in matches" :key="index"
      @mousedown.prevent
      @click="suggestionSelected(suggestion)">
        {{ suggestion[1][1] }}
      </li>
    </ul>
  </div>
       
</template>

<script>
/* eslint-disable */

export default {
  name: "AutocompleteVendeur",

  data() {
    return {
      searchText: "",
      selectedOption: null,
      open: false
    };
  },
  props: ["UnfilteredData"],
  mounted() {},
  methods: {
    suggestionSelected(suggestion) {
      this.open = false;
      // Don't remember why the [1][1], but that's the name
      this.searchText = suggestion[1][1];
      this.$emit("input", suggestion[0]);
    },
    setOpen(isOpen) {
      this.open = isOpen;
      //if you re-open it , it shows you everything
      if (this.open) {
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
        var optionText = option[1][1].toUpperCase();
        return optionText.match(this.searchText.toUpperCase());
      });
    }
  }
};
</script>


<style scoped >
#form {
  display: flex;
  flex-direction: column;
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
  top: 20px;
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

.suggestion-list li:hover {
  color: #fff;
  background-color: #ccc;
}
</style>
