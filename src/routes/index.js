import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Contacto from '../views/Contacto.vue';
import Invitacion from '../views/Invitacion.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/contacto', // Usa minúsculas en las rutas
        name: 'Contacto',
        component: Contacto,
    },
    {
        path: '/invitacion', // Usa minúsculas en las rutas
        name: 'Invitacion',
        component: Invitacion,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
