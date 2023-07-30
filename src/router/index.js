import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Global warming'
    }
  },
  {
    path: '/Arctic',
    name: 'Arctic',
    component: () => import('../views/Arctic.vue'),
    meta: {
      title: 'Arctic'
    }
  },
  {
    path: '/Co2',
    name: 'Co2',
    component: () => import('../views/Co2.vue'),
    meta: {
      title: 'Co2'
    }
  },
  {
    path: '/Methane',
    name: 'Methane',
    component: () => import('../views/Methane.vue'),
    meta: {
      title: 'Methane'
    }
  },
  {
    path: '/No2',
    name: 'No2',
    component: () => import('../views/No2.vue'),
    meta: {
      title: 'No2'
    }
  },
  {
    path: '/Temperature',
    name: 'Temperature',
    component: () => import('../views/Temperature.vue'),
    meta: {
      title: 'Temperature'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach((to, from, next) =>{
  document.title = `${to.meta.title}`;
  next();
})

export default router