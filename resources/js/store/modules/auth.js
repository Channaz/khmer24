import { isAuthorized, logUserIn, logUserOut } from "../../service/auth";

const auth = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authToken: null,
        refreshToken: null,
        authVerified: false,
        authError: null,
        lastAuthCheck: null,
    },
    mutations: {
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
    },
    actions: {
        async initAuth({ commit, dispatch, getters }) {
            try {
                commit("SET_AUTH_ERROR", null);
                const response = await isAuthorized();
                if (response && response.data && response.data.message) {
                    commit("SET_AUTHENTICATED", true);
                    commit("SET_LAST_AUTH_CHECK", Date.now());
                    await dispatch("user/loadUserData", response.data.user, {
                        root: true,
                    });
                    dispatch(
                        "showNotification",
                        { type: "success", message: response.data.message },
                        { root: true }
                    );
                    return { success: true };
                } else {
                    throw new Error(response?.data?.error || "Login failed");
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                commit("SET_AUTH_ERROR", error.error);
                commit("SET_AUTHENTICATED", false);
            } finally {
                commit("SET_AUTH_VERIFIED", true);
            }
        },
        async login({ commit, dispatch }, { phone, password }) {
            try {
                commit("SET_LOADING", true, { root: true });
                commit("SET_AUTH_ERROR", null);
                const response = await logUserIn(phone, password);
                if (response && response.data && response.data.user) {
                    commit("SET_AUTHENTICATED", true);
                    // The API doesn't return tokens, but sets cookies instead
                    commit("SET_LAST_AUTH_CHECK", Date.now());
                    // Load user data from the response
                    await dispatch("user/loadUserData", response.data.user, {
                        root: true,
                    });
                    dispatch(
                        "showNotification",
                        { type: "success", message: response.data.message },
                        { root: true }
                    );
                    return { success: true };
                } else {
                    throw new Error(response?.data?.message || "Login failed");
                }
            } catch (error) {
                console.error("Login error:", error);
                const errorMessage =
                    error?.response?.data?.message ||
                    error.message ||
                    "Login failed. Please try again.";
                commit("SET_AUTH_ERROR", errorMessage);
                dispatch(
                    "showNotification",
                    { type: "error", message: errorMessage },
                    { root: true }
                );
                return { success: false, error: errorMessage };
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
        async logout({ commit, dispatch }) {
            try {
                commit("SET_LOADING", true, { root: true });
                await logUserOut();
                commit("CLEAR_AUTH_DATA");
                commit("user/CLEAR_USER_DATA", null, { root: true });
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
                commit("CLEAR_AUTH_DATA");
                commit("user/CLEAR_USER_DATA", null, { root: true });
                return { success: true };
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        isAuthVerified: (state) => state.authVerified,
        authToken: (state) => state.authToken,
        refreshToken: (state) => state.refreshToken,
        authError: (state) => state.authError,
        hasAuthError: (state) => !!state.authError,
        isLoggedIn: (state) => state.isAuthenticated && state.authVerified,
    },
};

export default auth;
