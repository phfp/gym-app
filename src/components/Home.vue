<template>
  <base-app>
    <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
         Bem Vindo ao MyGym
        </h1>
        <p class="subheading font-weight-regular">
          Em Desemvolvimento
        </p>
      </v-flex>
    </v-layout>
  </v-container>
  </base-app>
</template>

<script>

import BaseApp from "@/components/BaseApp"
export default {
  name: 'Home',
    methods: {
  },
  components:{
    BaseApp,
  }
}
</script>