<template>
    <v-layout slign-start>
        <v-flex>
            

    <v-container grid-list-sm class="pa-4 white" >
      <v-layout row wrap>
        <v-flex xs12 md4 lg4 xl4>
          <v-select v-model="idpais1" :items="paises" label="Equipo 1">
          </v-select>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-select v-model="idpais2" :items="paises" label="Equipo 2">
          </v-select>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-select v-model="idestadio" :items="estadios" label="Estadio">
          </v-select>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Fecha"
              prepend-icon="date_range"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="hora"
              label="Hora"
              prepend-icon="access_time"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="hora"
            full-width
            @click:minute="$refs.menu.save(hora)"
          ></v-time-picker>
        </v-menu>
        <v-spacer></v-spacer>
      </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-btn 
              class="mx-2"
              fab
              dark
              color="primary"
             >
        <v-icon dark @click="guardar">
          add
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
        </v-flex>
        
      </v-layout>
    </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  props: {
      source: String,
    },
    data: () => ({
    idpais1: '',
    idpais2: '',
    idestadio: '',
    estadios: [],
    paises: [],
    juegos: [],
    search: '',
    _id: '',
    jugador: {
      nombre: '',
      edad: '',
      posicion: '',
      pais:  '' 
    },
    date : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    hora: null,
    menu3: false,
    time: null,
    menu2: false,
    editedIndex: -1,
  }),

  computed: {
  },

  watch: {
  },
  created () {
    this.listar();
    this.select();
    this.selectEstadio();
  },

  methods: {
    
    listar(){
        let me = this;
        axios.get('/juego/').then((response) =>{
            me.juegos = response.data;
            //console.log(me.paises);
        }).catch((error)=>{ 
             console.log(error);
        });
    },
    select(){
      let me = this;
      var paisesArray = [];
        axios.get('/pais').then((response) =>{
            paisesArray = response.data;
            paisesArray.map((x) =>{
              me.paisI = x.nombre;
              me.paises.push({text: x.nombre,value:x._id})
            });
            //console.log(me.paises);
        }).catch((error)=>{
             console.log(error);
        });
    },

    selectEstadio(){
      let me = this;
      var estadioArray = [];
        axios.get('/estadio').then((response) =>{
            estadioArray = response.data;
            estadioArray.map((x) =>{
              me.estadios.push({text: x.nombre, value: x._id})
            });
        }).catch((error)=>{
             console.log(error);
        });
    },
    
    guardar(){
      // if(this.validar()){
      //   return;
      // }
      if (this.editedIndex > -1){
        //codigo para editar
        let me = this;
        axios.put('/pais/edit',{
          '_id' : me._id,
          'nombre': me.nombre,
          'poblacion': me.poblacion,
          'ranking': me.ranking,
          'copas': me.copas
        }).then((response) =>{
          me.close();
          me.listar();
          me.limpiar();
        }).catch((error)=>{
          console.log(error);
        });
      }else{
        //codigo para guardar
        let me = this;
        axios.post('/juego/add',{
          'idpais1': me.idpais1,
          'idpais2': me.idpais2,
          'idestadio': me.idestadio,
          'fecha': me.date,
          'hora': me.hora,
        }).then((response) =>{
          me.limpiar();
        }).catch((error)=>{
          console.log(error);
        });
      }
    },
    limpiar(){
      this.idestadio= '';
      this.idpais1 = '';
      this.idpais2 = '';
      this.date = '';
      this.hora = '';
    },  
  },
};
</script>