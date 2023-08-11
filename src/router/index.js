import { createRouter, createWebHistory } from 'vue-router';
//import i18n from '../locales/i18n';
import Home from '../views/Home.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'metaTitle'
    }
  },
  {
    path: '/Arctic',
    name: 'Arctic',
    component: () => import('../views/Arctic.vue'),
    meta: {
      title: 'arctic'
    }
  },
  {
    path: '/Co2',
    name: 'Co2',
    component: () => import('../views/Co2.vue'),
    meta: {
      title: 'co2'
    }
  },
  {
    path: '/Methane',
    name: 'Methane',
    component: () => import('../views/Methane.vue'),
    meta: {
      title: 'methane'
    }
  },
  {
    path: '/No2',
    name: 'No2',
    component: () => import('../views/No2.vue'),
    meta: {
      title: 'no2'
    }
  },
  {
    path: '/Temperature',
    name: 'Temperature',
    component: () => import('../views/Temperature.vue'),
    meta: {
      title: 'temperature'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router