import MainPage from "@/pages/MainPage";
import SecondPage from "@/pages/SecondPage";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/',
        component: MainPage
    },

    {
        path: '/second',
        component: SecondPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router;
