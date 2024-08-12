// src/routes/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Contacto from '../views/Contacto.vue'
import Invitacion from '../views/Invitacion.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/Contacto',
        name: 'Contacto',
        component: Contacto,
    },
    {
        path: '/Invitacion',
        name: 'Invitacion',
        component: Invitacion,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
