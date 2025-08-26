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
import { isAuthorized, logUserOut } from "../service/auth";
import i18n from "../i18n";

// Store will be injected later
let store = null;

// Update page titles based on current language
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

const includes = {
    navbar: Navbar,
    footer: Footer,
};

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

// Helper function to set session storage
const setSessionStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        console.warn("Failed to set session storage:", error);
    }
};

// Navigation guard to handle authentication
router.beforeEach(async (to, from, next) => {
    try {
        // If store is not available, use direct API call
        if (!store) {
            const loggedIn = await isAuthorized();
            if (!loggedIn && to.meta.requireUser) {
                setSessionStorage("REQUESTED", to.path);
                return next({ name: "Login" });
            }
            if (loggedIn && to.name === "Login") {
                return next({ name: "Home" });
            }
            next();
            return;
        }

        // Use Vuex store for authentication
        const isLoggedIn = store.getters["auth/isLoggedIn"];

        // Check if user is authenticated
        if (to.meta.requireUser && !isLoggedIn) {
            // Save requested path
            setSessionStorage("REQUESTED", to.path);

            // Clear cookies if they exist
            try {
                if (typeof $cookies !== "undefined") {
                    $cookies.remove("AUTH-TOKEN-HASH", "/", null);
                    $cookies.remove("REM-TOKEN-HASH", "/", null);
                }
            } catch (e) {
                console.warn("Cookie removal failed:", e);
            }

            return next({ name: "Login" });
        }

        // Redirect authenticated users away from login page
        if (to.name === "Login" && isLoggedIn) {
            return next({ name: "Home" });
        }

        // For guest routes, allow access
        if (to.meta.requiresGuest) {
            next();
            return;
        }

        // Check permissions if route has meta requirements
        const { id_permissions, read_only } = to.meta;
        if (id_permissions !== undefined && read_only !== undefined) {
            // TODO: Implement permission checking logic here
            console.warn("Permission checking not implemented yet");
        }

        // Allow access to all other routes
        next();
    } catch (error) {
        console.warn("Auth verification error:", error);

        // On error, redirect to login for safety
        if (to.meta.requireUser) {
            next({ name: "Login" });
        } else {
            next();
        }
    }
});

// After navigation hook
router.afterEach((to, from, failure) => {
    // Hide any modals if they exist
    // $('.modal').modal('hide');

    if (!failure) {
        // Update document title based on route name with i18n
        const routeName = to.name || "Home";
        const title = getPageTitle(routeName);
        document.title = title.toUpperCase();
    }
});

// Function to inject store into router
export const injectStore = (vuexStore) => {
    store = vuexStore;
};

export default router;
