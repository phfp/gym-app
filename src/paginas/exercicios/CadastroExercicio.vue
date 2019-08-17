<template>
  <base-app>
    <form @submit.prevent="submit">

      <input id="inputImg" ref="upImagem"  type="file" v-show="false" @change="salvaImagem">
      <v-flex xs12 sm12>
        <v-text-field
          @click="$refs.upImagem.click()"
          prepend-icon="image"
          v-model="img_file"
          label="Imagem"
          :error-messages="errors.collect('img_file')"
          data-vv-name="imagem"
          required
        ></v-text-field>
      </v-flex>

      <v-text-field
        v-model="descricao"
        v-validate="'required'"
        :error-messages="errors.collect('descricao')"
        label="Descrição"
        data-vv-name="descricao"
        required
      ></v-text-field>

      <v-select
        dense
        :items="grupo_exercicios"
        label="Grupo"
        v-model="grupo_exercicio_id"
        item-value="id"
        item-text="descricao"
      ></v-select>

      <v-btn @click="cadastroEx" type="submit" class="mr-4">Enviar</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
    </form>
  </base-app>
</template>

<script>

  import axios from 'axios'
  import BaseApp from "@/components/BaseApp"

  export default {
    name: 'CadastroExercicio',
    $_veeValidate: {
      validator: 'new',
    },
    props: {
      source: String,
    },
    data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      img_file: '',
      imagem: '',
      descricao: '',
      grupo_exercicio_id: '',
      drawer: null,
      grupo_exercicios: '', 
      dictionary: {
        attributes: {
          email: 'E-mail Address',
          password_confirmation: 'Confirmação de senha',
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters',
            // custom messages
          },
          select: {
            required: 'Select field is required',
          },
        },
      },
    }),
    created () {
      axios.get('http://127.0.0.1:8000/api/grupoexercicios/')
    .then(function (response) {     
      sessionStorage.setItem('grupoExercicios',JSON.stringify(response.data));
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

    let grupo_exercicios = sessionStorage.getItem('grupoExercicios');
    if(grupo_exercicios){
      this.grupo_exercicios = JSON.parse(grupo_exercicios)
    }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods:{
      salvaImagem: function(e){
        let arquivo = e.target.files || e.dataTransfer.files;
        if(!arquivo.length){
          return;
        }
        
        var fileInput = document.getElementById("inputImg");
        var files = fileInput.files;      
        this.img_file = files[0].name;

        let reader = new FileReader();

        reader.onloadend = (e) => {
          this.imagem = e.target.result;
        };

        reader.readAsDataURL(arquivo[0]);
      },
      submit () {
        this.$validator.validateAll();
        
        if (!this.errors.any()) {
          this.cadastroEx();
        }
      },
      clear () {
        this.img_file = ''
        this.imagem = ''
        this.descricao = ''
        this.grupo_exercicio_id = null
        this.$validator.reset()
      },   
      cadastroEx: function(){
        axios.post('http://127.0.0.1:8000/api/cadastroexercicios',{
          imagem: this.imagem,
          descricao: this.descricao,
          grupo_exercicio_id: this.grupo_exercicio_id,
        })
        .then(response => {
          if(response.data.img){
            alert('Cadastro realizado com sucesso');
            this.clear();
          }else if(response.data.img == false){
            alert('Erro no cadastro!');
          }else{
            let erros = '';
            for(let erro of Object.values(response.data)){
              erros += erro +" ";
            }
            alert(erros);
          }
        })    
      .catch(e => {
        Console.log(e);
        alert("Tente novamente mais tarde!");
      })  
    }
  },
  components:{
    BaseApp,
  }
}
</script>