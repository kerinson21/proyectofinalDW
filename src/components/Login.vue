<template>
    <div class="bod"><div class="cod-container">
        <div class="form-header">
          <v-img
          :src="require('../assets/img/Logo.png')"
          class="my-3"
          contain
          height="100"
        />
            <h1>Qatar<span>2022</span></h1>
        </div>

        <div class="form-content">
            <form action="#" class="cod-form">
                <div class="form-title">
                    <h3>Inicio de Sesión</h3>
                </div>

                <div class="input-group">
                    <v-text-field
                        v-model="email"
                        label="Email"
                      ></v-text-field>
                </div>

                <div class="input-group">
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                      ></v-text-field>
                </div>
                <div class="input-group" v-if="error">
                   <p class="red--text">{{error}}</p> 
                </div>

                <div class="input-group">
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="ingresar"
                    >
                        Iniciar Sesión
              </v-btn>
                </div>
               
            </form>
        </div>

    </div>
</div>
    
</template>
<style scoped>
.bod {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #5e2129, #190f0f);
    width: 100%;
    height: 100vh;
    /* color: #fff; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial;
}

.cod-container {
    background: #fff;
    width: 380px;
    border-radius: 10px;
    overflow: hidden;
}


.form-header {
    background: #fac003;
    text-align: center;
    padding: 30px 0 40px;
    clip-path: polygon(0 0, 100% 0%, 100% 74%, 0% 100%);
}

.form-header img {
    vertical-align: top;
    width: 80px;
}

.form-header h1 {
    color: #fff;
    font-family: AbeeZee;
    font-weight: normal;
    margin-top: 5px;
}

.form-header span {
    color: #5e2129;
}

.cod-form {
    padding: 10px 40px 40px;
}

.form-title {
    text-align: center;
    text-transform: uppercase;
    font-weight: normal;
    margin-bottom: 32px;
    overflow: hidden;
    font-family: AbeeZee;
    color: #5e2129;

}

h3 {
    position: relative;
    display: inline-block;
    color: #5e2129;
    padding: 0 10px;
}

h3::after,
h3::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 3px;
    background: #021e26;
    top: 0.5em;
}

h3::after {
    left: 100%;
}

h3::before {
    right: 100%;
}


.cod-form {
    width: 100%;
    height: auto;
    text-align: center;
}

.input-group {
    position: relative;
    margin-bottom: 40px;
}

input[type="email"],
input[type="password"] {
    border: none;
    border-bottom: 2px solid #021e26;
    width: 100%;
    outline: none;
    font-size: 14px;
    color: #021e26;
    padding-left: 10px;
    font-family: AbeeZee;
}

.label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    color: #5e2129;
    padding-left: 10px;
    cursor: text;
    transition: all .3s ease;
    font-family: AbeeZee;
}

.form-input:focus + label {
    top: -14px;
    font-size: 12px;
    color: #666565;
    font-family: AbeeZee;
}

.active {
    top: -14px;
    font-size: 12px;
    color: #666565;

}

.error {
    color: #5e2129;
}

input[type="submit"] {
    background: none;
    border: none;
    background: #5e2129;
    color: #fff;
    width: 100%;
    font-size: 14px;
    padding: 10px 0;
    font-family: AbeeZee;
    margin-bottom: 16px;
    border-radius: 10px;
    transition: all .5s ease;
}

input[type="submit"]:hover {
    background: #021E26;
}

.input-group > p {
    color: #5e2129;
    text-align: center;
    font-size: 14px;
    font-family: AbeeZee;
}

.input-group p > a {
    text-decoration: none;
    color: #0b0beb;
}

.input-group p > a:hover {
    text-decoration: underline;
}

.form-content {
    display: none;
}

.form-content:nth-child(2) {
    display: block;
}
</style>
<script>
import axios from 'axios'
export default {
  name: 'App',
  props: {
      source: String,
    },
    data: () => ({
      email: '',
      password:'',
      error: null
  }),

  computed: {
    
  },

  watch: {
    
  },

  created () {
    
  },

  methods: {
    ingresar(){
        this.error= null;
        axios.post('/auth/', {email: this.email, password: this.password})
        .then(respuesta =>{
            console.log(respuesta.data);
            return respuesta.data;
        })
        .then(data => {
            this.$store.dispatch('guardarToken', data);
            this.$router.push({name: 'home'});
        })
        .catch(err =>{
            if(err.request.status == 400 ){
                this.error = "El email o la contraseña no son correctos"
            }
        });
    }
  },
};
</script>