<template>
  <base-app>
    <v-flex xs8 offset-xs2>
      <form @submit.prevent="submit">
        
        <v-text-field
          v-model="name"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Name"
          data-vv-name="name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          v-validate="'required|email'"
          :error-messages="errors.collect('email')"
          label="E-mail"
          data-vv-name="email"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          v-validate="'required'"
          :error-messages="errors.collect('password')"
          label="Senha"
          data-vv-name="password"
          required
        ></v-text-field>
        
        <v-text-field
          type="password"
          v-model="password_confirmation"
          v-validate="'required'"
          :error-messages="errors.collect('password_confirmation')"
          label="Confirmação de Senha"
          data-vv-name="password_confirmation"
          required
        ></v-text-field>

        <v-radio-group v-if="usuario.tipo_usuario_id==1" v-model="tipo_usuario_id" row>
          <v-radio label="Administrador" value="1"></v-radio>
          <v-radio label="Owner" value="2"></v-radio>
        </v-radio-group>

        <v-checkbox
          v-model="checkbox"
          v-validate="'required'"
          :error-messages="errors.collect('checkbox')"
          value="1"
          label="Accept"
          data-vv-name="checkbox"
          type="checkbox"
          required
        ></v-checkbox>

        <v-btn type="submit" class="mr-4">Cadastrar</v-btn>
        <v-btn @click="clear">Limpar</v-btn>
      </form>
    </v-flex>
  </base-app>
</template>

<script>

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
      drawer: null,
      usuario: '',
      name: '',
      email:'',
      password:'',
      password_confirmation:'',
      tipo_usuario_id: '3', 
      checkbox: null,
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
      this.usuario = this.$session.get('usuario')
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
        this.$http.post(this.$urlApi+'/api/cadastro',{
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