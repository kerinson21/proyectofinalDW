import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Estadio from '../components/Estadio.vue'
import Pais from '../components/Pais.vue'
import Equipo from '../components/Equipo.vue'
import Calendario from '../components/Calendario.vue'
import Grupo from '../components/Grupo.vue'
import AdministrarG from '../components/AdministrarG.vue'
import Juego from '../components/Juego.vue'
import Login from '../components/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      administrador: true
    }
  },
  {
    path: '/estadio',
    name: 'estadio',
    component: Estadio,
    meta: {
      administrador: true
    }
  },
  {
    path: '/pais',
    name: 'pais',
    component: Pais,
    meta: {
      administrador: true
    }
  },
  {
    path: '/equipo',
    name: 'equipo',
    component: Equipo,
    meta: {
      administrador: true
    }
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: Calendario,
    meta: {
      administrador: true
    }
  },
  {
    path: '/grupo',
    name: 'grupo',
    component: Grupo,
    meta: {
      administrador: true
    }
  },
  {
    path: '/administrar_g',
    name: 'administrar_g',
    component: AdministrarG,
    meta: {
      administrador: true
    }
  },
  {
    path: '/juego',
    name: 'juego',
    component: Juego,
    meta: {
      administrador: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      libre: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) =>{
  if(to.matched.some(record=> record.meta.libre)){
    next()
  }else if(store.state.usuario){
    if(to.matched.some(record => record.meta.administrador)){
      next()
    }
  }else{
    next({
      name: 'login'
    })
  }
})

export default router