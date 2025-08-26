<template>
    <div class="user-profile-card">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">
                    <i class="fa-solid fa-user-circle me-2"></i>
                    User Profile
                </h5>
            </div>
            <div class="card-body">
                <!-- Loading State -->
                <div v-if="isLoading" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading user data...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="hasError" class="alert alert-danger">
                    <i class="fa-solid fa-exclamation-triangle me-2"></i>
                    {{ error }}
                    <button
                        class="btn btn-sm btn-outline-danger ms-2"
                        @click="loadUserData"
                    >
                        Retry
                    </button>
                </div>

                <!-- User Data -->
                <div v-else-if="userData" class="user-info">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <div class="avatar-container">
                                <i
                                    v-if="!userAvatar"
                                    class="fa-solid fa-user-circle fa-5x text-muted"
                                ></i>
                                <img
                                    v-else
                                    :src="userAvatar"
                                    :alt="userName"
                                    class="img-fluid rounded-circle"
                                    style="
                                        width: 120px;
                                        height: 120px;
                                        object-fit: cover;
                                    "
                                />
                            </div>
                            <button
                                class="btn btn-outline-primary btn-sm mt-2"
                                @click="loadUserData"
                                :disabled="isLoading"
                            >
                                <i class="fa-solid fa-sync-alt me-1"></i>
                                Refresh
                            </button>
                        </div>
                        <div class="col-md-8">
                            <h4 class="text-primary">{{ userName }}</h4>
                            <p class="text-muted">@{{ userUsername }}</p>
                            <p class="text-muted">{{ userEmail }}</p>

                            <div class="user-stats mt-3">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="stat-item">
                                            <div class="stat-number">
                                                {{ unreadNotificationCount }}
                                            </div>
                                            <div class="stat-label">
                                                Unread Messages
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="stat-item">
                                            <div class="stat-number">
                                                {{ userNotifications.length }}
                                            </div>
                                            <div class="stat-label">
                                                Total Notifications
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-3">
                                <span
                                    v-if="isPremium"
                                    class="badge bg-warning text-dark me-2"
                                >
                                    <i class="fa-solid fa-crown me-1"></i>
                                    Premium
                                </span>
                                <span class="badge bg-secondary">
                                    {{ userRole }}
                                </span>
                            </div>

                            <div class="mt-4">
                                <button
                                    class="btn btn-primary me-2"
                                    @click="updateProfile"
                                >
                                    <i class="fa-solid fa-edit me-1"></i>
                                    Edit Profile
                                </button>
                                <button
                                    class="btn btn-outline-secondary"
                                    @click="viewSettings"
                                >
                                    <i class="fa-solid fa-cog me-1"></i>
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- User Preferences -->
                    <div
                        v-if="
                            userPreferences &&
                            Object.keys(userPreferences).length > 0
                        "
                        class="mt-4"
                    >
                        <h6>Preferences</h6>
                        <div class="preferences-list">
                            <div
                                v-for="(value, key) in userPreferences"
                                :key="key"
                                class="preference-item"
                            >
                                <span class="preference-key">{{ key }}:</span>
                                <span class="preference-value">{{
                                    value
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- No User Data -->
                <div v-else class="text-center text-muted">
                    <i class="fa-solid fa-user-slash fa-3x mb-3"></i>
                    <p>No user data available</p>
                    <button
                        class="btn btn-primary"
                        @click="loadUserData"
                        :disabled="isLoading"
                    >
                        Load User Data
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Computed properties from store
const userData = computed(() => store.getters["user/userData"]);
const userProfile = computed(() => store.getters["user/userProfile"]);
const userSettings = computed(() => store.getters["user/userSettings"]);
const userNotifications = computed(
    () => store.getters["user/userNotifications"]
);
const userPreferences = computed(() => store.getters["user/userPreferences"]);
const isLoading = computed(() => store.getters["user/isLoading"]);
const error = computed(() => store.getters["user/error"]);
const hasError = computed(() => store.getters["user/hasError"]);

// Computed user properties
const userName = computed(() => store.getters["user/userName"]);
const userUsername = computed(() => store.getters["user/userUsername"]);
const userEmail = computed(() => store.getters["user/userEmail"]);
const userAvatar = computed(() => store.getters["user/userAvatar"]);
const userRole = computed(() => store.getters["user/userRole"]);
const isPremium = computed(() => store.getters["user/isPremium"]);
const unreadNotificationCount = computed(
    () => store.getters["user/unreadNotificationCount"]
);

// Methods
const loadUserData = async () => {
    try {
        await store.dispatch("user/loadUserData");
    } catch (error) {
        console.error("Failed to load user data:", error);
    }
};

const updateProfile = () => {
    // Example of updating user preferences
    store.dispatch("user/updateUserPreferences", {
        theme: "dark",
        language: "en",
        notifications: true,
    });

    // Show notification
    store.dispatch("showNotification", {
        type: "success",
        message: "Profile preferences updated!",
    });
};

const viewSettings = () => {
    // Example of navigating to settings
    console.log("Navigate to settings page");
    store.dispatch("showNotification", {
        type: "info",
        message: "Settings page would open here",
    });
};

// Load user data on mount if user is authenticated
onMounted(async () => {
    if (store.getters["auth/isLoggedIn"] && !store.getters["user/userData"]) {
        await loadUserData();
    }
});
</script>

<style scoped>
.user-profile-card {
    max-width: 800px;
    margin: 0 auto;
}

.avatar-container {
    margin-bottom: 1rem;
}

.user-stats {
    border-top: 1px solid #dee2e6;
    padding-top: 1rem;
}

.stat-item {
    text-align: center;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0d6efd;
}

.stat-label {
    font-size: 0.875rem;
    color: #6c757d;
    margin-top: 0.25rem;
}

.preferences-list {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
}

.preference-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #dee2e6;
}

.preference-item:last-child {
    border-bottom: none;
}

.preference-key {
    font-weight: 600;
    color: #495057;
}

.preference-value {
    color: #6c757d;
}
</style>
