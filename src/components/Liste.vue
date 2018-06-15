<template>
  <div class="liste">
      <ul class="list">
      <!-- <li v-for="(item, index) in plantList" :key="index"> -->
        <!-- {{ item[0] }}
      </li> -->
       <v-list two-line>
          <template v-for="(item, index) in plantList">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="item[0]" avatar >
          
              <v-list-tile-content>
                <v-list-tile-title v-html="'#'+item[0] +': '+ item[1]"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item[2]"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
    </ul>
  </div>
</template>

<script>
import { connection } from "@/components/firebase.js";


export default {
  name: 'Liste',
  data () {
    return {
      plantList: [],
    }
  }, 
  firebase: {
    db: connection.ref()
  },
  created () {
    var plants = [];
    // db doest seems to work in mounted
    connection.ref("plants").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var id = childSnapshot.key;
        var name = childSnapshot.val().name;
        var seller = childSnapshot.val().seller;
        
         plants.push([id, name,seller]);
      });
    });
    console.log(plants)
    this.plantList = plants;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
