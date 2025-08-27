import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Login from "../pages/auth/login.vue";
import Navbar from "../components/includes/Navbar.vue";
import Footer from "../components/includes/Footer.vue";
import { isAuthorized, logUserOut } from "../service/auth";
import i18n from "../i18n";

// The Vuex store instance will be injected from main.js
let store = null;

/**
 * Updates the document title based on the current route's name using i18n.
 * @param {string} routeName - The name of the current route.
 * @returns {string} The formatted page title.
 */
const getPageTitle = (routeName) => {
    const { t } = i18n.global;
    const titleMap = {
        Home: t("navigation.home"),
        Login: t("common.login"),
        About: t("navigation.about"),
        Register: t("common.register"),
    };
    return titleMap[routeName] || routeName;
};

// Components for the common layout includes (Navbar and Footer)
const includes = {
    navbar: Navbar,
    footer: Footer,
};

// Define all the application routes
const routes = [
    {
        path: "/login",
        name: "Login",
        components: {
            default: Login,
            ...includes,
        },
        meta: { requiresGuest: true },
    },
    {
        path: "/",
        name: "Home",
        components: {
            default: Home,
            ...includes,
        },
        meta: { requireUser: true },
    },
    {
        path: "/about",
        name: "About",
        components: {
            default: About,
            ...includes,
        },
        meta: { requireUser: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/**
 * Helper function to set session storage
 * @param {string} key
 * @param {string} value
 */
const setSessionStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        console.warn("Failed to set session storage:", error);
    }
};

/**
 * A global navigation guard to handle initial authentication and redirection.
 * This runs before the navigation is confirmed, after all `beforeEach` guards.
 */
router.beforeResolve(async (to, from, next) => {
    // Ensure the authentication status has been verified at least once
    if (!store.getters["auth/isAuthVerified"]) {
        await store.dispatch("auth/initAuth");
    }

    const isLoggedIn = store.getters["auth/isLoggedIn"];

    if (to.meta.requireUser && !isLoggedIn) {
        console.log("logged in?",isLoggedIn);


        setSessionStorage("REQUESTED", to.fullPath);
        return next({ name: "Login" });
    }

    if (to.name === "Login" && isLoggedIn) {
        return next({ name: "Home" });
    }

    next();
});

/**
 * The global navigation guard for a cleaner check on each navigation.
 * This guard is now simplified and works in conjunction with `beforeResolve`.
 */
router.beforeEach(async (to, from, next) => {
    const isLoggedIn = store.getters["auth/isLoggedIn"];

    // Redirect authenticated users away from the login page
    if (to.name === "Login" && isLoggedIn) {
        return next({ name: "Home" });
    }

    // Allow access to all other routes. The `beforeResolve` guard
    // will handle the authentication check for protected routes.
    next();
});

/**
 * After each navigation, this hook updates the document title.
 */
router.afterEach((to, from, failure) => {
    if (!failure) {
        const routeName = to.name || "Home";
        document.title = getPageTitle(routeName).toUpperCase();
    }
});
/**
 * Public function to inject the Vuex store into the router.
 * This should be called once from your application's entry file (e.g., main.js).
 * @param {object} vuexStore - The Vuex store instance.
 */
export const injectStore = (vuexStore) => {
    store = vuexStore;
};

export default router;
