<template>
  <v-layout slign-start>
     
      <v-container>
      <v-row justify="center">
        <v-col
          v-for="juego in juegos"
          :key="juego._id"
          cols="auto"
        >
        <v-card
         :loading="loading"
          class="mx-2 my-2"
          max-width="374"
        >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="250"
        src="https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2022-09/sporting-news-2022-photo-with-watermark-bf65c918-8971-48da-abea-89901cc582d0.png?itok=ksefsYYO"
      ></v-img>
  
      <v-card-title>{{juego.estadio.nombre}}</v-card-title>
  
      <v-card-text>
        <div>Capacidad: <strong>{{juego.estadio.capacidad}}</strong></div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title class="d-flex justify-center">{{juego.pais1.nombre}} &nbsp; <strong>  VS &nbsp; </strong> {{juego.pais2.nombre}}</v-card-title>
  
      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-8 white--text"
          column
          
        >
          <v-chip>{{juego.hora}}</v-chip>
          <v-chip>{{juego.fecha}}</v-chip>
        </v-chip-group>
      </v-card-text>
  
      
        </v-card>
        </v-col>
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
    juegos: []
}),

computed: {
 
},

watch: {

},
created () {
  this.listar();
},

methods: {
  reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    listar(){
        let me = this;
        axios.get('/juego/').then((response) =>{
            me.juegos = response.data;
            //console.log(me.paises);
        }).catch((error)=>{ 
             console.log(error);
        });
    },
},
};
</script>