import axios from "axios";

// State
const state = {
    userData: null,
    userProfile: null,
    userSettings: null,
    userNotifications: [],
    userPreferences: {},
    isLoading: false,
    error: null,
};

// Mutations
const mutations = {
    SET_USER_DATA(state, userData) {
        state.userData = userData;
    },

    SET_USER_PROFILE(state, profile) {
        state.userProfile = profile;
    },

    SET_USER_SETTINGS(state, settings) {
        state.userSettings = settings;
    },

    SET_USER_NOTIFICATIONS(state, notifications) {
        state.userNotifications = notifications;
    },

    ADD_USER_NOTIFICATION(state, notification) {
        state.userNotifications.unshift(notification);
    },

    MARK_NOTIFICATION_READ(state, notificationId) {
        const notification = state.userNotifications.find(
            (n) => n.id === notificationId
        );
        if (notification) {
            notification.read = true;
        }
    },

    SET_USER_PREFERENCES(state, preferences) {
        state.userPreferences = { ...state.userPreferences, ...preferences };
    },

    SET_LOADING(state, loading) {
        state.isLoading = loading;
    },

    SET_ERROR(state, error) {
        state.error = error;
    },

    CLEAR_USER_DATA(state) {
        state.userData = null;
        state.userProfile = null;
        state.userSettings = null;
        state.userNotifications = [];
        state.userPreferences = {};
        state.error = null;
    },

    UPDATE_USER_DATA(state, updates) {
        if (state.userData) {
            state.userData = { ...state.userData, ...updates };
        }
    },
};

// Actions
const actions = {
    // Load user data from API
    async loadUserData({ commit, dispatch }, userId = null) {
        try {
            commit("SET_LOADING", true);
            commit("SET_ERROR", null);

            // If no userId provided, use current authenticated user
            const url = userId ? `/api/users/${userId}` : "/api/user/profile";

            const response = await axios.get(url);

            if (response.data && response.data.success) {
                commit("SET_USER_DATA", response.data.user);

                // Load additional user data
                await dispatch("loadUserProfile");
                await dispatch("loadUserSettings");
                await dispatch("loadUserNotifications");

                return response.data.user;
            } else {
                throw new Error(
                    response.data?.message || "Failed to load user data"
                );
            }
        } catch (error) {
            console.error("Load user data error:", error);
            commit("SET_ERROR", error.message);
            throw error;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    // Load user profile
    async loadUserProfile({ commit }) {
        try {
            const response = await axios.get("/api/user/profile");

            if (response.data && response.data.success) {
                commit("SET_USER_PROFILE", response.data.profile);
            }
        } catch (error) {
            console.error("Load user profile error:", error);
            // Don't throw error for profile, it's optional
        }
    },

    // Load user settings
    async loadUserSettings({ commit }) {
        try {
            const response = await axios.get("/api/user/settings");

            if (response.data && response.data.success) {
                commit("SET_USER_SETTINGS", response.data.settings);
            }
        } catch (error) {
            console.error("Load user settings error:", error);
            // Don't throw error for settings, it's optional
        }
    },

    // Load user notifications
    async loadUserNotifications({ commit }) {
        try {
            const response = await axios.get("/api/user/notifications");

            if (response.data && response.data.success) {
                commit("SET_USER_NOTIFICATIONS", response.data.notifications);
            }
        } catch (error) {
            console.error("Load user notifications error:", error);
            // Don't throw error for notifications, it's optional
        }
    },

    // Update user profile
    async updateUserProfile({ commit, dispatch }, profileData) {
        try {
            commit("SET_LOADING", true);
            commit("SET_ERROR", null);

            const response = await axios.put("/api/user/profile", profileData);

            if (response.data && response.data.success) {
                commit("SET_USER_PROFILE", response.data.profile);
                commit("UPDATE_USER_DATA", response.data.user);

                dispatch(
                    "showNotification",
                    {
                        type: "success",
                        message: "Profile updated successfully!",
                    },
                    { root: true }
                );

                return response.data.profile;
            } else {
                throw new Error(
                    response.data?.message || "Failed to update profile"
                );
            }
        } catch (error) {
            console.error("Update user profile error:", error);
            commit("SET_ERROR", error.message);

            dispatch(
                "showNotification",
                {
                    type: "error",
                    message: error.message || "Failed to update profile",
                },
                { root: true }
            );

            throw error;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    // Update user settings
    async updateUserSettings({ commit, dispatch }, settings) {
        try {
            commit("SET_LOADING", true);
            commit("SET_ERROR", null);

            const response = await axios.put("/api/user/settings", settings);

            if (response.data && response.data.success) {
                commit("SET_USER_SETTINGS", response.data.settings);

                dispatch(
                    "showNotification",
                    {
                        type: "success",
                        message: "Settings updated successfully!",
                    },
                    { root: true }
                );

                return response.data.settings;
            } else {
                throw new Error(
                    response.data?.message || "Failed to update settings"
                );
            }
        } catch (error) {
            console.error("Update user settings error:", error);
            commit("SET_ERROR", error.message);

            dispatch(
                "showNotification",
                {
                    type: "error",
                    message: error.message || "Failed to update settings",
                },
                { root: true }
            );

            throw error;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    // Mark notification as read
    async markNotificationRead({ commit }, notificationId) {
        try {
            await axios.put(`/api/user/notifications/${notificationId}/read`);
            commit("MARK_NOTIFICATION_READ", notificationId);
        } catch (error) {
            console.error("Mark notification read error:", error);
        }
    },

    // Update user preferences
    updateUserPreferences({ commit }, preferences) {
        commit("SET_USER_PREFERENCES", preferences);

        // Optionally save to localStorage for persistence
        try {
            localStorage.setItem(
                "userPreferences",
                JSON.stringify(preferences)
            );
        } catch (error) {
            console.error("Save preferences to localStorage error:", error);
        }
    },

    // Load user preferences from localStorage
    loadUserPreferences({ commit }) {
        try {
            const preferences = localStorage.getItem("userPreferences");
            if (preferences) {
                commit("SET_USER_PREFERENCES", JSON.parse(preferences));
            }
        } catch (error) {
            console.error("Load preferences from localStorage error:", error);
        }
    },

    // Clear user data (used during logout)
    clearUserData({ commit }) {
        commit("CLEAR_USER_DATA");
    },
};

// Getters
const getters = {
    userData: (state) => state.userData,
    userProfile: (state) => state.userProfile,
    userSettings: (state) => state.userSettings,
    userNotifications: (state) => state.userNotifications,
    unreadNotifications: (state) =>
        state.userNotifications.filter((n) => !n.read),
    unreadNotificationCount: (state) =>
        state.userNotifications.filter((n) => !n.read).length,
    userPreferences: (state) => state.userPreferences,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    hasError: (state) => !!state.error,

    // Computed user properties
    userName: (state) => state.userData?.name || "User",
    userUsername: (state) => state.userData?.username || "",
    userEmail: (state) => state.userData?.email || "",
    userAvatar: (state) => state.userData?.avatar || null,
    userRole: (state) => state.userData?.role || "user",
    isPremium: (state) => state.userData?.isPremium || false,

    // Check if user data is loaded
    isUserDataLoaded: (state) => !!state.userData,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
