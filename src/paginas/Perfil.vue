<template>
  <base-app>
    <v-card
      flat
      color="transparent"
      max-width="700"
      class="mx-auto"
    >
      <v-form>
      <v-container grid-list-xl fluid>
        <v-layout align-space-around  wrap>

          <v-flex text-center xs12 sm12>
            <v-card
              color="transparent"
              height="260"
              class="mx-auto"
              flat
            >
              <v-flex text-center xs12 sm12>              
                 <div class="upimg">                
                  <v-btn text icon @click="$refs.upImagem.click()" class="upbtn">
                    <v-avatar size="160">              
                      <v-img :src=usuario.imagem alt="avatar"/>                   
                    </v-avatar>                  
                  </v-btn>
                  <v-layout pa-2 column fill-height class="lightbox white--text">
                    <v-spacer></v-spacer>
                    <v-flex shrink>
                      <v-icon @click="$refs.upImagem.click()" class="upicon">mdi-image-search</v-icon>
                    </v-flex>
                  </v-layout>
                  <input id="inputImg" ref="upImagem"  type="file" v-show="false" @change="salvaImagem">
                </div>
                <span class="imgSpan title">{{usuario.name}}</span> <br>
                <span class="imgSpan subtitle-2">{{usuario.email}}</span>
                
              </v-flex>
            </v-card>
          </v-flex>

          <v-flex v-if="img_file" xs12 sm12>
            <v-text-field
              prepend-icon="image"
              disabled
              v-model="img_file"
              label="Imagem"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="name"
              label="Nome"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="email"
              label="Email"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              type="password"
              v-model="password"
              label="Senha"
            ></v-text-field>
          </v-flex>        

          <v-flex xs12 sm6>
            <v-text-field
              type="password"
              v-model="password_confirmation"
              label="Confirme sua senha"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>      
    </v-form>

    <v-card-actions>
      <v-btn @click="perfil" class="success" text>Atualizar</v-btn>
      </v-card-actions>
    </v-card>

  </base-app>
</template>

<script>

import BaseApp from '@/components/BaseApp'
import axios from 'axios'

export default {
  name: 'CadastroUser',
  data () {
    return {
        img_file: '',
        usuario:'',
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        imagem: ''
    }
  },
  created() {
    if(this.$session.exists()){
      this.usuario = this.$session.get('usuario');
      this.name = this.usuario.name;
      this.email = this.usuario.email;
    }else{
      this.$router.push('/login')
    }
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
    perfil: function(){
      axios.put('http://127.0.0.1:8000/api/perfil',{
        name: this.name,
        email: this.email,
        imagem: this.imagem,
        password: this.password,
        password_confirmation: this.password_confirmation
      },{"headers":{"authorization":"Bearer "+this.usuario.token}})
      .then(response => {
        if(response.data.token){
          this.usuario = response.data;
          this.$session.set('usuario', response.data);
          this.img_file = '';
        }else{
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
    }
  },
  components:{
    BaseApp
  }
}
</script>
<style scoped>

.upimg .upbtn{
  opacity: 0.9;
  transition: .3s ease;  
}
.upimg:hover .upbtn{
  opacity: 0.1;
  transition: .7s ease;  
}

.upimg:hover .upicon{
  position: relative;
  opacity: 1;
  transition: .7s ease;
  color: green;
}

.upimg .upicon{
  position: relative;
  color: white;
  left: 2px;
  top: 48px;
}

.imgSpan{
  position: relative;
  top: 50px;
  color: #212121;
}

</style>