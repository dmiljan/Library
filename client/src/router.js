import { createWebHistory, createRouter } from 'vue-router';
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import Login from './views/Login'
import Book from './views/Book';
import Member from './views/Member';
import Rent from './views/Rent';


const routes = [
    {
        path: '/login',
        component: PublicLayout,
        children: [
            {
                path: '',
                component: Login,
                name: "Login",
            },
        ],
    },
    {
        path: '/app',
        component: AppLayout,
        children: [
            {
                path: '',
                redirect: {
                    name: "Book"
                }
            },
            {
                path: 'book',
                component: Book,
                name: "Book"
            },
            {
                path: 'member',
                component: Member,
                name: "Member"
            },
            {
                path: 'rent',
                component: Rent,
                name: "Rent"
            }
        ],
    },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;