import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        name: 'notes',
        path: '/',
        component: () => import('../views/Notes.vue'),
    },
    {
        name: 'settings',
        path: '/settings',
        component: () => import('../views/Settings.vue'),
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('../views/About.vue'),
    },
    {
        name: 'editor',
        path: '/editor/:index',
        component: () => import('../views/Editor.vue')
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router