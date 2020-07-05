<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Default',
  components: {
    //
  },
  data() {
    return {}
  }
})
</script>
