import { createStore } from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";

export default createStore({
    modules: {
        auth,
        user,
    },

    // Global state
    state: {
        isLoading: false,
        notifications: [],
    },

    // Global mutations
    mutations: {
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },
        REMOVE_NOTIFICATION(state, id) {
            state.notifications = state.notifications.filter(
                (n) => n.id !== id
            );
        },
    },

    // Global actions
    actions: {
        setLoading({ commit }, loading) {
            commit("SET_LOADING", loading);
        },
        showNotification({ commit }, notification) {
            const id = Date.now();
            commit("ADD_NOTIFICATION", { ...notification, id });

            // Auto remove after 5 seconds
            if (notification.autoHide !== false) {
                setTimeout(() => {
                    commit("REMOVE_NOTIFICATION", id);
                }, 5000);
            }
        },
        hideNotification({ commit }, id) {
            commit("REMOVE_NOTIFICATION", id);
        },
    },

    // Global getters
    getters: {
        isLoading: (state) => state.isLoading,
        notifications: (state) => state.notifications,
        hasNotifications: (state) => state.notifications.length > 0,
    },
});
