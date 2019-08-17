<template>
  <base-app>  
  <v-row>
    <v-col cols="12" sm="12">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="exercicio in exercicios"
              v-bind:key="exercicio.id"
              class="d-flex child-flex"
              sm="4"
            >
              <v-card>
                <v-img
                  :src="exercicio.imagem"
                  aspect-ratio="1"
                  class="teal lighten-3"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>                                   
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-card-text class="align-end fill-height">{{exercicio.descricao}}</v-card-text>
                </v-card-actions>  

              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  </base-app>
</template>

<script>

import BaseApp from '@/components/BaseApp'
import axios from 'axios'

export default {
  name: 'Exercicios',
  data () {
    return {
      exercicios: ''
    }
  },
  beforeCreate() {
    axios.get('http://127.0.0.1:8000/api/exercicios/')
    .then(function (response) {     
      sessionStorage.setItem('exercicios',JSON.stringify(response.data));
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    
    
  },
  created(){
    let exercicios = sessionStorage.getItem('exercicios');
    if(exercicios){
      this.exercicios = JSON.parse(exercicios)
    }
    //this.$router.push("exercicios")
  },
  mounted(){
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