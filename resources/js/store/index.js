import { createStore } from "vuex";
import axios from "axios";
import auth from "./modules/auth";
import user from "./modules/user";

// Mock Auth Module (as it wasn't provided in full)
const store = createStore({
    modules: {
        auth,
        user,
    },
    state: {
        isLoading: false,
        notifications: [],
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },
        REMOVE_NOTIFICATION(state, id) {
            state.notifications = state.notifications.filter((n) => n.id !== id);
        },
    },
    actions: {
        showNotification({ commit }, notification) {
            const id = Date.now();
            commit("ADD_NOTIFICATION", { ...notification, id });
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
    getters: {
        isLoading: (state) => state.isLoading,
        notifications: (state) => state.notifications,
        hasNotifications: (state) => state.notifications.length > 0,
    },
});

export default store;
