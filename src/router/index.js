import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Arctic',
    name: 'Arctic',
    component: () => import('../views/Arctic.vue')
  },
  {
    path: '/Co2',
    name: 'Co2',
    component: () => import('../views/Co2.vue')
  },
  {
    path: '/Methane',
    name: 'Methane',
    component: () => import('../views/Methane.vue')
  },
  {
    path: '/No2',
    name: 'No2',
    component: () => import('../views/No2.vue')
  },
  {
    path: '/Temperature',
    name: 'Temperature',
    component: () => import('../views/Temperature.vue')
  }
]


const router = createRouter({
  history: createWebHistory('/'),
  routes
});


export default router