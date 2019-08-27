<template>
  <base-app>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text"
        height="400px"
        :src="exercicio.imagem"
      >
        <v-card-title class="align-end fill-height">{{exercicio.descricao}}</v-card-title>
      </v-img>

      <v-card-text>
        <span> Detalhes do Exercicio... </span><br>
      </v-card-text>
    </v-card>

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