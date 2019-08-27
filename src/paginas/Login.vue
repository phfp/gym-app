<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
              <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon>fa-dumbbell</v-icon>
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-on:click="login()" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'Login',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      email:'',
      password:'',
    }),
    beforeCreate(){
      if(this.$session.exists()){
        this.$router.push('/');
      }
    },
    methods:{
      login: function(){
        this.$http.post(this.$urlApi+'/api/login',{
          email: this.email,
          password: this.password                
        })
        .then(response => {
          if(response.status === 200 && 'token' in response.data){
            this.$session.start();
            this.$session.set('usuario', response.data);
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            
            this.$http.get(this.$urlApi+'/api/exercicios/')
            .then(function (response) {     
              sessionStorage.setItem('exercicios',JSON.stringify(response.data));
            })
            .catch(function (error) {
              // handle error
            })
            .finally(function () {
              // always executed
            }); 

            this.$router.push('/');
          }else if(response.data.status == false){
            alert('Login inválido!');
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
          alert("Tente novamente mais tarde!");
        })  
      },
    },
  }
</script>