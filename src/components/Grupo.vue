<template>
  <v-layout slign-center>
    
    <v-container>  
      <v-row>
        <v-toolbar-title>Grupos</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px">

            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
             Agregar equipos al  Grupo
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
                      md="6"
                    >
                    <v-select v-model="idgrupo" :items="grupoSelect" label="Grupo">
                    </v-select>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                    <v-select v-model="idpais" :items="paises" label="Pais">
                    </v-select>
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
          <v-spacer></v-spacer>
      </v-row>
      <v-row justify="center">
        <v-spacer></v-spacer>
        
      </v-row>
    </v-container>
    
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
    loading: false,
    selection: 1,
    grupos: [],
    nombeGrupo: '',
    grupoSelect: [],
    paises: [],
    dialog: false,
    editedIndex: -1,
    idgrupo: '',
    idpais: '',
    paisesArray: [],
    paisesGrupo: []
    
}),

computed: {
  formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Integrante del grupo' : ''
    },
},

watch: {
    dialog (val) {
      val || this.close()

    }
  },
created () {
  this.listar();
  this.close();
  this.listarPises();
},

methods: {
  listar(){
      let me = this;
      axios.get('/grupo').then((response) =>{
          me.grupos = response.data;
          me.grupos.map((x)=>{
            me.grupoSelect.push({text: x.nombre, value: x._id});
          });
      }).catch((error)=>{
           console.log(error);
      });
  },
  listarPises(){
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

  listarPorGrupo(id){
    let me = this;
      axios.get('/grupo/listardetalle/'+id).then((response) =>{
          me.paisesGrupo = response.data;
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
        axios.put('/estadio/edit',{
          '_id' : me._id
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
        axios.post('/grupo/add/detalle',{
          'idgrupo': me.idgrupo,
          'idpais': me.idpais
        }).then((response) =>{
          me.close();
          me.listar();
          me.limpiar();
        }).catch((error)=>{
          console.log(error);
        });
      }
    },
  close () {
      this.dialog = false;
  },
  limpiar(){
      this.idgrupo = '';
      this.idpais = '';
      this.editedIndex = -1;
    }

},
};
</script>