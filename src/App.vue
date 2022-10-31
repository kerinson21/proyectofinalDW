<template>
  <div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      v-if="logueado"
    >
      <v-list dense>
        <template v-if="esAdministrador">
          <v-list-item :to="{ name: 'home'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>          
        </template>
        <template v-if="esAdministrador">
          <!-- Estadios -->
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Estadios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'estadio'}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Estadio
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>
          <!-- Equipos -->
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Esquipos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{ name: 'pais'}">
              <v-list-item-action>
                <v-icon>flag_circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Paises
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{ name: 'juego'}">
              <v-list-item-action>
                <v-icon>local_play</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Juegos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item :to="{ name: 'equipo'}">
              <v-list-item-action>
                <v-icon>groups</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Equipos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{ name: 'calendario'}">
              <v-list-item-action>
                <v-icon>access_time</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Calendario de Juegos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- Grupos -->
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Grupo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'administrar_g'}">
              <v-list-item-action>
                <v-icon>folder_shared</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Administrar Grupo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{ name: 'grupo'}">
              <v-list-item-action>
                <v-icon>group_work</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Grupo 
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
     <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="secondary darken-1"
      dark
      v-if="logueado"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="primary--text"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down primary--text">FIFA WORLD 2022</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-sm-and-down primary--text" v-if="logueado">Usuario: <strong>{{usuario.user.nombre}}  &nbsp;</strong></span>
      <v-btn v-if="logueado" class="primary" icon @click="salir">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    
  </v-app>
</div>
</template>

<script>

export default {
  name: 'App',
  props: {
      source: String,
    },
  data: () => ({
      dialog: false,
      drawer: null,
      usuario: {}
  }),
  computed: {
    created () {
      this.$store.dispatch('autoLogin');
    },
    logueado(){
      this.usuario = this.$store.state.usuario;
      return this.$store.state.usuario;

    },
    esAdministrador(){
      return this.$store.state.usuario;

    }
  },
  methods: {
    salir(){
      this.$store.dispatch('salir');
    }
},
};
</script>
