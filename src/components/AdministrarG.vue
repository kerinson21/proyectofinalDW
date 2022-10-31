<template>
  <v-layout slign-center>
      <v-flex>  
       <v-data-table v-if="verTabla==0"
          :headers="headers"
          :items="grupos"
          :search="search"
          class="elevation-1"
          light
        >
      <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Grupos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            Nuevo Grupo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-show="valida"
                  >
                  <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardar"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Quieres eliminar este grupo?</v-card-title>
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
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="listarPaises(item)"
      >
        visibility
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

      <v-card v-if="verTabla"
      class="mx-auto"
      
      max-width="400"
      max-height="400"
      elevation="10"
      outlined
      >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
           {{nombre}}
          </v-list-item-title>
            <v-simple-table>
                <template v-slot:default>
                  <h4 v-if="paises.length==0">No hay paises agregados al grupo</h4>
          <thead v-if="paises.length ==0">
            <tr>
              <th class="text-left">
                Nombre
              </th>
              <th class="text-left">
                Puntos
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paises"
              :key="item.pais_id"
            >
              <td>{{ item.pais.nombre}}</td>
              <td>0</td>
            </tr>
          </tbody>
                </template>
            </v-simple-table>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        
        <v-btn
          text
          color="teal accent-4"
          @click="ocultarTabla()"
        >
          Volver
          <v-icon>
            arrow_back
          </v-icon>
        </v-btn>
     
      </v-card-actions>
       </v-card>

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
  grupos: [],
  search: '',
  headers: [
    {
      text: 'Opciones',
      align: 'start',
      sortable: false,
      value: '_id',
    },
    { text: 'Nombre', value: 'nombre' }
    
  ],
  editedIndex: -1,
  editedItem: {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  },
  _id: '',
  nombre: '',
  valida: 0,
  validaMensaje: [],
  verTabla: 0,
  paises: []
}),

computed: {
  formTitle () {
    return this.editedIndex === -1 ? 'Nuevo Grupo' : 'Actualizar Grupo'
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
  this.listar()
},

methods: {
  mostrarTabla(item){
    this.verTabla = 1;
    this._id = item._id;
    this.nombre = item.nombre;
  },
  ocultarTabla(){
    this.verTabla=0;
  },
  listar(){
      let me = this;
      axios.get('/grupo').then((response) =>{
          me.grupos = response.data;
      }).catch((error)=>{
           console.log(error);
      });
  },
  listarPaises(item){
      this.mostrarTabla(item);
      let arrayPaises = [];
      let me = this;
      axios.get('/grupo/listardetalle/'+item._id).then((response) =>{
          me.paises = response.data;
      }).catch((error)=>{
           console.log(error);
      });
  },  

  guardar(){
    if(this.validar()){
      return;
    }
    if (this.editedIndex > -1){
      //codigo para editar
      let me = this;
      axios.put('/grupo/edit',{
        '_id' : me._id,
        'nombre': me.nombre
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
      axios.post('/grupo/add',{
        'nombre': me.nombre
      }).then((response) =>{
        me.close();
        me.listar();
        me.limpiar();
      }).catch((error)=>{
        console.log(error);
      });
    }
  },
  validar(){
    this.valida = 0;
    this.validaMensaje = [];
    if(this.nombre.length<3 || this.nombre.length>50){
      this.validaMensaje.push("El nombre debe tener mas de 3 caracteres");
    }
    if(this.validaMensaje.length){
      this.valida= 1;
    }
    return this.valida;
  },
  editItem (item) {
    this._id = item._id;
    this.nombre = item.nombre;
    this.editedIndex = 1;
    this.dialog = true
  },

  deleteItem (item) {
    this._id = item._id;
    this.dialogDelete = true
  },

  deleteItemConfirm () {
    let me = this;
    axios.delete('/grupo/delete/'+me._id).then((response) =>{
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
    this.nombre = '';
    this.editedIndex = -1;
  },  

  closeDelete () {
    this.dialogDelete = false
    this.editedIndex = -1
  },
},
};
</script>