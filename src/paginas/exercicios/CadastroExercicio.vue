<template>
  <base-app>
    <form @submit.prevent="submit">
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Imagem"
        prepend-icon="mdi-camera"
        label="Imagem"
      ></v-file-input>

      <v-text-field
        v-validate="'required'"
        :error-messages="errors.collect('name')"
        label="Descrição"
        data-vv-name="name"
        required
      ></v-text-field>

      <v-select
        :items="grupo_exercicios[0].id"
        label="Grupo"
      ></v-select>

      <v-btn type="submit" class="mr-4">Enviar</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
    </form>
  </base-app>
</template>

<script>

  import axios from 'axios'
  import BaseApp from "@/components/BaseApp"

  export default {
    name: 'CadastroUsuario',
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
      submit () {
        this.$validator.validateAll();
        
        if (!this.errors.any()) {
          this.cadastro();
        }
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.password = ''
        this.password_confirmation = ''
        this.$validator.reset()
      },   
      cadastro: function(){
        axios.post('http://127.0.0.1:8000/api/cadastro',{
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          tipo_usuario_id: this.tipo_usuario_id
        })
        .then(response => {
          if(response.data.token){
            alert('Cadastro realizado com sucesso');
            this.clear();
          }else if(response.data.status == false){
            //login nao existe
            alert('Erro no cadastro!');
          }else{
            //erro de validacao
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