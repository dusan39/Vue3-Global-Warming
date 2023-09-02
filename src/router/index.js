import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import ChartDetail from '../views/ChartDetail.vue';

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
    path: '/chart/:id',
    name: 'Chart',
    component: () => import('../views/ChartDetail.vue'),
    meta: {
      title: 'chartDetails'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router