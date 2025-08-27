import axios from "axios";

// State
const user = {
    namespaced: true,
    state: {
        userData: null,
        userProfile: null,
        userSettings: null,
        userNotifications: [],
        userPreferences: {},
        isLoading: false,
        error: null,
    },
    mutations: {
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
            const notification = state.userNotifications.find((n) => n.id === notificationId);
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
    },
    actions: {
        async loadUserData({ commit, dispatch }, userData = null) {
            try {
                commit("SET_LOADING", true);
                commit("SET_ERROR", null);

                if (userData) {
                    // Use provided user data (from login)
                    commit("SET_USER_DATA", userData);
                    // Load additional user data
                    await dispatch("loadUserProfile");
                    await dispatch("loadUserSettings");
                    await dispatch("loadUserNotifications");
                    return userData;
                } else {
                    // Fetch user data from API (for page refreshes)
                    // Mocking an API call
                    const response = { data: { success: true, user: { name: 'Test User' }, profile: {}, settings: {}, notifications: [] } };
                    if (response.data && response.data.success) {
                        commit("SET_USER_DATA", response.data.user);
                        await dispatch("loadUserProfile");
                        await dispatch("loadUserSettings");
                        await dispatch("loadUserNotifications");
                        return response.data.user;
                    } else {
                        throw new Error(response.data?.message || "Failed to load user data");
                    }
                }
            } catch (error) {
                console.error("Load user data error:", error);
                commit("SET_ERROR", error.message);
                throw error;
            } finally {
                commit("SET_LOADING", false);
            }
        },
        async loadUserProfile({ commit }) {
            try {
                const response = { data: { success: true, profile: { bio: 'A test user profile.' } } };
                if (response.data && response.data.success) {
                    commit("SET_USER_PROFILE", response.data.profile);
                }
            } catch (error) {
                console.error("Load user profile error:", error);
            }
        },
        async loadUserSettings({ commit }) {
            try {
                const response = { data: { success: true, settings: { theme: 'dark' } } };
                if (response.data && response.data.success) {
                    commit("SET_USER_SETTINGS", response.data.settings);
                }
            } catch (error) {
                console.error("Load user settings error:", error);
            }
        },
        async loadUserNotifications({ commit }) {
            try {
                const response = { data: { success: true, notifications: [{ id: 1, message: 'Welcome!', read: false }] } };
                if (response.data && response.data.success) {
                    commit("SET_USER_NOTIFICATIONS", response.data.notifications);
                }
            } catch (error) {
                console.error("Load user notifications error:", error);
            }
        },
        async updateUserProfile({ commit, dispatch }, profileData) {
            try {
                commit("SET_LOADING", true);
                commit("SET_ERROR", null);
                const response = { data: { success: true, profile: { ...profileData }, user: {} } };
                if (response.data && response.data.success) {
                    commit("SET_USER_PROFILE", response.data.profile);
                    commit("UPDATE_USER_DATA", response.data.user);
                    dispatch("showNotification", { type: "success", message: "Profile updated successfully!" }, { root: true });
                    return response.data.profile;
                } else {
                    throw new Error(response.data?.message || "Failed to update profile");
                }
            } catch (error) {
                console.error("Update user profile error:", error);
                commit("SET_ERROR", error.message);
                dispatch("showNotification", { type: "error", message: error.message || "Failed to update profile" }, { root: true });
                throw error;
            } finally {
                commit("SET_LOADING", false);
            }
        },
        async updateUserSettings({ commit, dispatch }, settings) {
            try {
                commit("SET_LOADING", true);
                commit("SET_ERROR", null);
                const response = { data: { success: true, settings } };
                if (response.data && response.data.success) {
                    commit("SET_USER_SETTINGS", response.data.settings);
                    dispatch("showNotification", { type: "success", message: "Settings updated successfully!" }, { root: true });
                    return response.data.settings;
                } else {
                    throw new Error(response.data?.message || "Failed to update settings");
                }
            } catch (error) {
                console.error("Update user settings error:", error);
                commit("SET_ERROR", error.message);
                dispatch("showNotification", { type: "error", message: error.message || "Failed to update settings" }, { root: true });
                throw error;
            } finally {
                commit("SET_LOADING", false);
            }
        },
        async markNotificationRead({ commit }, notificationId) {
            try {
                await new Promise(resolve => setTimeout(resolve, 100)); // Mock API call
                commit("MARK_NOTIFICATION_READ", notificationId);
            } catch (error) {
                console.error("Mark notification read error:", error);
            }
        },
        updateUserPreferences({ commit }, preferences) {
            commit("SET_USER_PREFERENCES", preferences);
            try {
                localStorage.setItem("userPreferences", JSON.stringify(preferences));
            } catch (error) {
                console.error("Save preferences to localStorage error:", error);
            }
        },
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
        clearUserData({ commit }) {
            commit("CLEAR_USER_DATA");
        },
    },
    getters: {
        userData: (state) => state.userData,
        userProfile: (state) => state.userProfile,
        userSettings: (state) => state.userSettings,
        userNotifications: (state) => state.userNotifications,
        unreadNotifications: (state) => state.userNotifications.filter((n) => !n.read),
        unreadNotificationCount: (state) => state.userNotifications.filter((n) => !n.read).length,
        userPreferences: (state) => state.userPreferences,
        isLoading: (state) => state.isLoading,
        error: (state) => state.error,
        hasError: (state) => !!state.error,
        userName: (state) => state.userData?.name || "User",
        userUsername: (state) => state.userData?.username || "",
        userEmail: (state) => state.userData?.email || "",
        userAvatar: (state) => state.userData?.avatar || null,
        userRole: (state) => state.userData?.role || "user",
        isPremium: (state) => state.userData?.isPremium || false,
        isUserDataLoaded: (state) => !!state.userData,
    },
};

export default user;
