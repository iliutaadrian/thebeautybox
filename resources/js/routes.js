import NotFound from './page/NotFound'

import Login from './auth/Login.vue';
import ChangePassword from './auth/ChangePassword.vue';
import ForgotPassword from './auth/ForgotPassword.vue';
import ChangePasswordUser from './auth/ChangePasswordUser.vue';
import VerifyAccount from './auth/VerifyAccount.vue';

import UserList from './user/UserList.vue';
import HandleUser from './user/HandleUser.vue';
import CreateUser from './user/CreateUser.vue'

import UserProfile from './user/UserProfile.vue';
import PostView from "./posts/PostView.vue";
import PostCreate from "./posts/PostCreate.vue";

import OrderList from './order/OrderList';

import Home from './Home';

export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/forgot',
        component: ForgotPassword
    },
    {
        path: '/change-password/:token',
        component: ChangePassword
    },
    {
        path: '/change-password-user',
        component: ChangePasswordUser,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/verify/:token',
        component: VerifyAccount
    },
    {
        path: '/user/list',
        component: UserList,
        meta:{
            requiresAuth: true,
            role: 'admin'
        }
    },
    {
        path: '/order/list',
        component: OrderList,
        meta:{
            requiresAuth: true,
            both: true
        }
    },
    {
        path: '/user/handle/:id',
        component: HandleUser,
        meta:{
            requiresAuth: true,
            role: 'admin'
        }
    },
    {
        path: '/register',
        component: CreateUser,
        meta:{
            requiresAuth: false,
            role: 'user'
        }
    },
    {
        path: '/profile/:id',
        component: UserProfile,
        meta:{
            requiresAuth: true,
            both: true
        }
    },
    {
        path: '/shop',
        component: PostView,
        meta:{
            requiresAuth: false,
            both: true
        }
    },
    {
        path: '/',
        component: Home,
        meta:{
            requiresAuth: false,
            both: true
        }
    },
    {
        path: '/post/create',
        component: PostCreate,
        meta:{
            requiresAuth: true,
            role: 'user'
        }
    },
    {
        path: '*',
        component: NotFound
    }
];
