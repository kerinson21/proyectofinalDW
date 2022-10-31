<template>
    <v-layout slign-start>
        <v-flex>
            
    <v-data-table
      :headers="headers"
      :items="paises"
      :search="search"
      class="elevation-1"
      light
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Paises</v-toolbar-title>
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
              Nuevo Pais
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
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="poblacion"
                        label="Población"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="ranking"
                        label="Ranking"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="copas"
                        label="Copas"
                      ></v-text-field>
                    </v-col>
                
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
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
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
         
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
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
    paises: [],
    search: '',
    headers: [
      {
        text: 'Opciones',
        align: 'start',
        sortable: false,
        value: '_id',
      },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Población', value: 'poblacion' },
      { text: 'Ranking', value: 'ranking' },
      { text: 'Copas', value: 'copas' }
      
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
    poblacion: '',
    ranking: '',
    copas: '',
    valida: 0,
    validaMensaje: []
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
    this.listar()
  },

  methods: {
    listar(){
        let me = this;
        axios.get('/pais').then((response) =>{
            me.paises = response.data;
            //console.log(me.paises);
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
        axios.post('/pais/add',{
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
      this.nombre = '';
      this.poblacion = '',
      this.ranking = '';
      this.copas = '';
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