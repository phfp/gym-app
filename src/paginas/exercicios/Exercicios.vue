<template>
  <base-app>  
  <v-row>
    <v-col cols="12" sm="12">
      <v-flex text-center xs12 sm12> 
        <v-select
          cols="6"
          dense
          :items="grupos"
          label="Grupo"
          v-model="show_grupo"
          item-value="id"
          item-text="descricao"
          prepend-icon="mdi-filter"
          clearable
          clear-icon="mdi-filter-remove"
        ></v-select>
      </v-flex>
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="exercicio in show_exercicios"
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
      exercicios: '',
      show_grupo: null,
      grupos:[
        {
          'id':'0',
          'descricao':'Costas'
        },
        {
          'id':'2',
          'descricao':'Peito'
        },
        {
          'id':'3',
          'descricao':'Pernas'
        },
        {
          'id':'5',
          'descricao':'Triceps'
        },
        {
          'id':'6',
          'descricao':'Ombro'
        },
        {
          'id':'6',
          'descricao':'Bíceps'
        }
      ]
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

    console.log(this.show_exercicios);
    //this.$router.push("exercicios")
  },
  computed:{
    show_exercicios: function(){
      var show = [];
      var i;

      if(this.show_grupo == null){
        show = this.exercicios;
      }else{
        for(i in this.exercicios){
          if(this.exercicios[i].grupo_exercicio_id==this.show_grupo){
            console.log(this.exercicios[i]);
            show.push(this.exercicios[i]);
          }
        }
      }
      return show;
    }
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