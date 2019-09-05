<template>
  <base-app>  
    <v-row>
      <v-col cols="12" sm="12">
        <v-flex text-center xs12 sm3> 
          <v-select
            dense
            :items="grupos"
            label="Grupos Musculares"
            v-model="show_grupo"
            item-value="id"
            item-text="descricao"
            clearable
            outlined
            clear-icon="mdi-filter-remove"
          ></v-select>
        </v-flex>
        <br>
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col
                v-for="exercicio in show_exercicios"
                v-bind:key="exercicio.id"
                class="d-flex child-flex"
                sm="3"
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

                  <v-card-title> {{exercicio.descricao}} </v-card-title>

                  <v-card-actions>
                    <v-btn :to="'/exercicios/exercicio/'+exercicio.id" class="mx-2" text icon color="orange">
                      <v-icon color="grey">add</v-icon>
                    </v-btn>
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

export default {
  name: 'Exercicios',
  data () {
    return {
      exercicios: '',
      show_grupo: null,
      grupos:[
        {
          'id':'1',
          'descricao':'Bíceps'
        },
        {
          'id':'2',
          'descricao':'Costas'
        },
        {
          'id':'3',
          'descricao':'Peito'
        },
        {
          'id':'4',
          'descricao':'Pernas'
        },
        {
          'id':'5',
          'descricao':'Tríceps'
        },
        {
          'id':'6',
          'descricao':'Ombro'
        },
        {
          'id':'7',
          'descricao':'Abdominais'
        }
      ]
    }
  },
  beforeCreate() {

  },
  created(){
    this.exercicios = this.$store.getters.getExercicios;    
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