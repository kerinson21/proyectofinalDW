<template>
    <v-layout slign-start>
        <v-flex>
            
    <v-data-table
      :headers="headers"
      :items="equipos"
      :search="search"
      class="elevation-1"
      v-if="verNuevo==0"
      light
      
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Equipos</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-btn v-if="verNuevo==0" @click="mostrarNuevo" color="primary" darkclass="mb-2">Nuevo Equipo</v-btn>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">¿Quieres eliminar este pais?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Ok</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item._id="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="verEquipo(item)"
        >
          visibility
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
      <v-layout row wrap>
        <v-flex xs12 md4 lg4 xl4>
          <v-select v-model="idpais" :items="paises" label="Pais" v-if="vEquipo">
          </v-select>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-text-field v-model="jugador.nombre" label="Nombre del Jugador" v-if="vEquipo">
          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-text-field v-model="jugador.edad" label="Edad del Jugador" v-if="vEquipo">
          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-text-field v-model="jugador.posicion" label="Posición del Jugador" v-if="vEquipo">
          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 lg4 xl4>
          <v-btn v-if="vEquipo"
              class="mx-2"
              fab
              dark
              color="primary"
             >
        <v-icon dark @click="agregarJugador(jugador)">
          add
        </v-icon>
      </v-btn>
        </v-flex>
        <v-flex xs12 md12 lg12 xl12>
          <v-toolbar-title>Integrantes</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
            <v-data-table
            :headers="cabecera"
            :items="jugadores"
            hide-default-footer
            class="elevation-1"
            light
            >
      <template v-slot:item.id="{ item }">
        <v-icon
          small
          @click="eliminarJugador(jugadores,item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <h3>No se han agregado jugadores a este equipo</h3>
      </template>
            </v-data-table>
        </v-flex>
        <!-- validaciones -->
        <v-flex xs12 md12 lg12 xl12>

        </v-flex>
        <v-flex xs12 md12 lg12 xl12>
          <v-btn @click="ocultarNuevo" color="red--text darken-1 ma-2">Cancelar</v-btn>
          <v-btn color="primary" @click="guardar">Guardar</v-btn>
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
    dialog: false,
    dialogDelete: false,
    idpais: '',
    paises: [],
    paisI: '',
    equipos: [],
    search: '',
    headers: [
      {
        text: 'Opciones',
        align: 'start',
        sortable: false,
        value: '_id',
      },
      { text: 'Equipo', value: 'nombre' },
      { text: 'Copas', value: 'copas' }
      
    ],
    cabecera: [
      {
        text: 'Opciones',
        align: 'center',
        sortable: false,
        value: 'id',
      },
      { text: 'Pais', value: 'pais' },
      { text: 'Jugador', value: 'nombre' },
      { text: 'Edad', value: 'edad' },
      { text: 'Posicion', value: 'posicion'}
      
    ],
    editedIndex: -1,
    editedItem: {
    },
    _id: '',
    jugador: {
      nombre: '',
      edad: '',
      posicion: '',
      pais:  '' 
    },
    jugadores: [
      // {id: '100', nombre: 'Neymar', edad: '29', posicion: 'Delantero'},
      // {id: '1002', nombre: 'Casemiro', edad: '28', posicion: 'Medio'}
    ],
    valida: 0,
    validaMensaje: [],
    identifacdor: 0,
    verNuevo: 0,
    vEquipo: 1
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Pais': 'Actualizar Pais'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created () {
    this.listar();
    this.select();
  },

  methods: {
    mostrarNuevo(){
      this.verNuevo=1;
    },
    ocultarNuevo(){
      this.verNuevo = 0;
      this.limpiar();
      this.vEquipo = 1;
    },
      visualizarEquipo(){
      this.mostrarNuevo();
    },
    listar(){
        let me = this;
        axios.get('/pais').then((response) =>{
            me.equipos = response.data;
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
    agregarJugador(data){
        this.jugadores.push({
        id: this.identifacdor++,
        nombre: data.nombre,
        edad: data.edad,
        posicion: data.posicion,
        pais: this.paisI,
        idpais: this.idpais
      });
    },
    eliminarJugador(jugadores, item){
      var i = jugadores.indexOf(item);
      if(i!== -1){
        jugadores.splice(i,1);
      }
    },
    verEquipo(item){
      let me = this;
      me.vEquipo = 0;
      me.visualizarEquipo();
      let arrayJugador = [];
      axios.get('/equipo/jugador/'+item._id).then((response) =>{
            console.log(item._id);
            arrayJugador = response.data;
            arrayJugador.map((unjugador)=>{
              me.jugadores.push({
                id: unjugador.jugador._id,
                nombre: unjugador.jugador.nombre,
                edad: unjugador.jugador.edad,
                posicion: unjugador.jugador.posicion,
                idpais: item._id
              });
            });
          console.log(arrayJugador);
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
        axios.post('/equipo/add',{
          'jugadores': me.jugadores,
        }).then((response) =>{
          me.close();
          me.listar();
          me.limpiar();
          me.ocultarNuevo();
        }).catch((error)=>{
          console.log(error);
        });
      }
    },
    // validar(){
    //   this.valida = 0;
    //   this.validaMensaje = [];
    //   if(this.nombre.length<3 || this.nombre.length>50){
    //     this.validaMensaje.push("El nombre debe tener mas de 3 caracteres");
    //   }
    //   if(this.validaMensaje.length){
    //     this.valida= 1;
    //   }
    //   return this.valida;
    // },
    editItem (item) {
      this._id = item._id;
      this.nombre = item.nombre;
      this.poblacion = item.poblacion;
      this.ranking = item.ranking;
      this.copas = item.copas;
      this.editedIndex = 1;
      this.dialog = true
    },

    deleteItem (item) {
      this._id = item._id;
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      let me = this;
      axios.delete('/pais/delete/'+me._id).then((response) =>{
          me.close();
          me.listar();
          me.limpiar();
          me.closeDelete()
        }).catch((error)=>{
          console.log(error);
        });
      //console.log(this._id);
    },

    close () {
      this.dialog = false;
      this.limpiar();
    },
    limpiar(){
      this._id='';
      this.jugador = {};
      this.jugadores=[];
      this.paisI = '';
      this.idpais = '';
      this.editedIndex = -1;
    },  

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
};
</script>