import { isAuthorized, logUserIn, logUserOut } from "../../service/auth";

// State
const state = {
    isAuthenticated: false,
    authToken: null,
    refreshToken: null,
    authVerified: false,
    authError: null,
    lastAuthCheck: null,
};

// Mutations
const mutations = {
    SET_AUTHENTICATED(state, authenticated) {
        state.isAuthenticated = authenticated;
    },

    SET_AUTH_TOKEN(state, token) {
        state.authToken = token;
    },

    SET_REFRESH_TOKEN(state, token) {
        state.refreshToken = token;
    },

    SET_AUTH_VERIFIED(state, verified) {
        state.authVerified = verified;
    },

    SET_AUTH_ERROR(state, error) {
        state.authError = error;
    },

    SET_LAST_AUTH_CHECK(state, timestamp) {
        state.lastAuthCheck = timestamp;
    },

    CLEAR_AUTH_DATA(state) {
        state.isAuthenticated = false;
        state.authToken = null;
        state.refreshToken = null;
        state.authVerified = false;
        state.authError = null;
        state.lastAuthCheck = null;
    },
};

// Actions
const actions = {
    // Initialize authentication check
    async initAuth({ commit, dispatch }) {
        try {
            commit("SET_AUTH_ERROR", null);
            const response = await isAuthorized();

            if (response && response.success) {
                commit("SET_AUTHENTICATED", true);
                commit("SET_AUTH_VERIFIED", true);
                commit("SET_LAST_AUTH_CHECK", Date.now());

                // Load user data if authenticated
                await dispatch("user/loadUserData", null, { root: true });
            } else {
                commit("SET_AUTHENTICATED", false);
                commit("SET_AUTH_VERIFIED", true);
            }
        } catch (error) {
            console.error("Auth initialization error:", error);
            commit("SET_AUTH_ERROR", error.message);
            commit("SET_AUTHENTICATED", false);
            commit("SET_AUTH_VERIFIED", true);
        }
    },

    // Login action
    async login({ commit, dispatch }, credentials) {
        try {
            commit("SET_LOADING", true, { root: true });
            commit("SET_AUTH_ERROR", null);

            const response = await logUserIn(credentials);

            if (response && response.success) {
                commit("SET_AUTHENTICATED", true);
                commit("SET_AUTH_TOKEN", response.token);
                commit("SET_REFRESH_TOKEN", response.refreshToken);
                commit("SET_AUTH_VERIFIED", true);
                commit("SET_LAST_AUTH_CHECK", Date.now());

                // Load user data after successful login
                await dispatch("user/loadUserData", null, { root: true });

                // Show success notification
                dispatch(
                    "showNotification",
                    {
                        type: "success",
                        message: "Login successful!",
                    },
                    { root: true }
                );

                return { success: true };
            } else {
                throw new Error(response?.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            commit("SET_AUTH_ERROR", error.message);

            dispatch(
                "showNotification",
                {
                    type: "error",
                    message: error.message || "Login failed. Please try again.",
                },
                { root: true }
            );

            return { success: false, error: error.message };
        } finally {
            commit("SET_LOADING", false, { root: true });
        }
    },

    // Logout action
    async logout({ commit, dispatch }) {
        try {
            commit("SET_LOADING", true, { root: true });

            await logUserOut();

            // Clear all auth data
            commit("CLEAR_AUTH_DATA");

            // Clear user data
            commit("user/CLEAR_USER_DATA", null, { root: true });

            // Show logout notification
            dispatch(
                "showNotification",
                {
                    type: "info",
                    message: "You have been logged out successfully.",
                },
                { root: true }
            );

            return { success: true };
        } catch (error) {
            console.error("Logout error:", error);

            // Even if logout fails, clear local data
            commit("CLEAR_AUTH_DATA");
            commit("user/CLEAR_USER_DATA", null, { root: true });

            return { success: true }; // Still consider logout successful for UX
        } finally {
            commit("SET_LOADING", false, { root: true });
        }
    },

    // Check authentication status
    async checkAuth({ commit, state }) {
        try {
            // Don't check too frequently (max once per minute)
            const now = Date.now();
            if (state.lastAuthCheck && now - state.lastAuthCheck < 60000) {
                return state.isAuthenticated;
            }

            const response = await isAuthorized();

            if (response && response.success) {
                commit("SET_AUTHENTICATED", true);
                commit("SET_AUTH_VERIFIED", true);
                commit("SET_LAST_AUTH_CHECK", now);
                return true;
            } else {
                commit("SET_AUTHENTICATED", false);
                commit("SET_AUTH_VERIFIED", true);
                commit("SET_LAST_AUTH_CHECK", now);
                return false;
            }
        } catch (error) {
            console.error("Auth check error:", error);
            commit("SET_AUTHENTICATED", false);
            commit("SET_AUTH_VERIFIED", true);
            return false;
        }
    },

    // Clear auth error
    clearAuthError({ commit }) {
        commit("SET_AUTH_ERROR", null);
    },
};

// Getters
const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
    isAuthVerified: (state) => state.authVerified,
    authToken: (state) => state.authToken,
    refreshToken: (state) => state.refreshToken,
    authError: (state) => state.authError,
    hasAuthError: (state) => !!state.authError,
    isLoggedIn: (state) => state.isAuthenticated && state.authVerified,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
