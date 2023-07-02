import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Arctic from '../views/Arctic.vue'
import Co2 from '../views/Co2.vue'
import Methane from '../views/Methane.vue'
import No2 from '../views/No2.vue'
import Temperature from '../views/Temperature.vue'


const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Arctic',
    name: 'Arctic',
    component: Arctic
  },
  {
    path: '/Co2',
    name: 'Co2',
    component: Co2
  },
  {
    path: '/Methane',
    name: 'Methane',
    component: Methane
  },
  {
    path: '/No2',
    name: 'No2',
    component: No2
  },
  {
    path: '/Temperature',
    name: 'Temperature',
    component: Temperature
  }
]


const router = createRouter({
  history: createWebHistory('/'),
  routes
});


export default router