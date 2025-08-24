import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import Layout from "../layout/main.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import File from "../test/File.vue";
import { useI18n } from "vue-i18n";
import Navbar from "../components/includes/Navbar.vue";
import Footer from "../components/includes/Footer.vue";
import Login from "../pages/auth/login.vue";

// Update page titles based on current language

const routes = [
    {
        path: "/login",
        name: "Login",
        components: {
            default: Login,
            navbar: Navbar,
            footer: Footer,
        },
    },
    {
        path: "/",
        name: "Home",
        components: {
            default: Home,
            navbar: Navbar,
            footer: Footer,
        },
    },
    {
        path: "/about",
        name: "About",
        components: {
            default: About,
            navbar: Navbar,
            footer: Footer,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
