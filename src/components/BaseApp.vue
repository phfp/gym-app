<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item @click="goToRouter('')">
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="usuario.tipo_usuario_id==1 || usuario.tipo_usuario_id==2" @click="goToRouter('cadastrouser')">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastro de Usuários</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4">fa-dumbbell</v-icon>
      <v-toolbar-title>MyGym</v-toolbar-title>      
      <v-spacer></v-spacer>

      <div class="text-center">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          icon
          class="mx-2"
          v-on="on"
        >
          <v-avatar>
            <img v-bind:src=usuario.imagem v-bind:alt=usuario.nome>
          </v-avatar>          
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img v-bind:src=usuario.imagem v-bind:alt=usuario.nome>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{usuario.name}}</v-list-item-title>
              <v-list-item-subtitle>{{usuario.email}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-icon>fa-dumbbell</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item @click="goToRouter('perfil')">
            <v-list-item-action>
              <v-icon>fa-user-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Meu Perfil</v-list-item-title>
            </v-list-item-content>
           </v-list-item>

           <v-list-item @click="sair()">
            <v-list-item-action>
              <v-icon>fa-sign-out-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
           </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
      
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex xs8 offset-xs1>
            <slot>
            </slot>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      menu: false,
      usuario: ''
    }),
    created () {
      this.$vuetify.theme.dark = true,
      this.usuario = this.$session.get('usuario')
    },
    beforeCreate(){
    if(!this.$session.exists()){
      this.$router.push('/login')
    }
    },
    methods:{
      sair(){
        this.$session.destroy()
        this.$router.push('/login')
      },
      goToRouter(myrouter){
        var str = '/'+myrouter;
        this.$router.push(str);
      }
    },
  }
</script>