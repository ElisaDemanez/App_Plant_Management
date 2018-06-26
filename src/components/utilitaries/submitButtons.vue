 

      <template>
  <div class='submit'>
   <v-container>
        <v-btn @click="$emit('form-validation')" color='primary' type='submit' value='Submit' >Submit </v-btn>
        <v-spacer></v-spacer>
      </v-container>

      <v-container>
        <router-link :to="{name: 'Home'}" class="right">
          <v-btn flat small>Cancel</v-btn>
        </router-link>
      </v-container>
  </div>
</template>

<script>
/* eslint-disable */


export default {
  name: "submitButtons",
  data() {
    return {
      
    };
  },
  
  methods: {
    
  }
};
</script>

<style scoped >
</style>
