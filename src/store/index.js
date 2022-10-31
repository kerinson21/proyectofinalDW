import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null
  },
  getters: {
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    setUsuario(state, usuario){
      state.usuario = usuario
    }
  },
  actions: {
    //el commit nos permite acceder a las mutaciones o al state
    guardarToken({commit}, token){
      commit('setToken', token);
      commit('setUsuario', decode(token));
      localStorage.setItem('clave', token);
    },
    autoLogin({commit}){
      let token = localStorage.getItem('token'); //obtengo el token almacenado en storage local
      if(token){ //si existe el token enviamos setToken y setUsuario
        commit('setToken', token);
        commit('setUsuario', decode(token));
      }
      router.push({name: 'home'});
    },
    salir({commit}){
      commit('setToken', null);
      commit('setUsuario', null);
      localStorage.removeItem('token'); //removemos el token
      router.push({name: 'login'})
    }
  },
  modules: {
  }
})
