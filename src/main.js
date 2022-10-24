import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import store from './store'
import User from "@/components/content/user/User";
import Main from "@/components/content/Main";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/users/:id',
        component: User
    },
]

const router = createRouter({
        routes,
        history: createWebHistory(process.env.BASE_URL)
    }
)

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
