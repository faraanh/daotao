import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import NotificationDetail from '../views/NotificationDetail.vue';
import AdminNotifications from '../views/AdminNotifications.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/notifications/:id', component: NotificationDetail },
    { path: '/admin/notifications', component: AdminNotifications }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
