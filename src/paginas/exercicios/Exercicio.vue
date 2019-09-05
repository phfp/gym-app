<template>
  <base-app>
    <v-row >
      <v-col cols="4">
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text"
            :src="exercicio.imagem"
          >
          </v-img>

          <v-card-title> {{exercicio.descricao}} </v-card-title>

        </v-card>
        </v-col>
    </v-row>
  </base-app>
</template>

<script>

import BaseApp from '@/components/BaseApp'

export default {
  name: 'Exercicio',
  data () {
    return {
      exercicio_id : '',
      exercicio: ''
    }
  },
  created(){
    this.exercicio_id = this.$route.params.id;
    this.exercicio = this.$store.getters.getExercicioById(this.exercicio_id);
  },
  methods:{
  },
  components:{
    BaseApp
  }
}

</script>

<style scoped>
</style>