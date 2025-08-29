<template>
    <!-- Header Section -->
    <header class="bg-white shadow-sm sticky-top">
        <nav class="navbar navbar-expand-lg d-container">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="#">
                    <img
                        src="/assets/images/khmer24.png"
                        alt="Khmer24 Logo"
                        height="40"
                    />
                    <img
                        src="/assets/images/cam-logo.png" class="ms-2"
                        alt="Cambodia Logo"
                        height="30"
                    />
                </a>

                <!-- Search Bar (for larger screens) -->
                <form
                    class="d-none d-md-flex justify-content-center flex-grow-1 mx-4"
                >
                    <div class="input-group search-container">
                        <!-- Custom Category Dropdown -->
                        <div class="dropdown category-dropdown">
                            <button
                                class="btn btn-outline-secondary dropdown-toggle category-btn"
                                type="button"
                                @click.stop="toggleCategoryDropdown"
                                :class="{ active: isCategoryDropdownOpen }"
                            >
                                <i class="fa-solid fa-th-large me-2"></i>
                                {{ selectedCategory }}
                            </button>
                            <div
                                class="dropdown-menu category-dropdown-menu"
                                :class="{ show: isCategoryDropdownOpen }"
                                @click.stop="event.stopPropagation()"
                            >
                                <div class="dropdown-header">
                                    <strong>All Categories</strong>
                                </div>

                                <!-- Dynamic Categories -->
                                <template
                                    v-for="category in categories"
                                    :key="category.id"
                                >
                                    <!-- Categories with subcategories -->
                                    <div
                                        v-if="category.hasSubcategories"
                                        class="category-section"
                                    >
                                        <div
                                            class="category-header"
                                            @click="
                                                toggleCategoryExpansion(
                                                    category.id
                                                )
                                            "
                                        >
                                            <i
                                                :class="`${category.icon} ${category.color} me-2`"
                                            ></i>
                                            {{ category.name }}
                                            <div
                                                class="ms-auto d-flex align-items-center"
                                            >
                                                <i
                                                    class="fa-solid fa-check me-2"
                                                    v-if="
                                                        selectedCategoryData
                                                            .value?.id ===
                                                        category.id
                                                    "
                                                ></i>
                                                <i
                                                    :class="
                                                        expandedCategory ===
                                                        category.id
                                                            ? 'fa-solid fa-chevron-up'
                                                            : 'fa-solid fa-chevron-down'
                                                    "
                                                ></i>
                                            </div>
                                        </div>
                                        <div
                                            class="subcategories"
                                            v-if="
                                                expandedCategory === category.id
                                            "
                                        >
                                            <div
                                                v-for="subcategory in category.subcategories"
                                                :key="subcategory.id"
                                                class="subcategory-item"
                                                @click="
                                                    selectSubCategory(
                                                        subcategory
                                                    )
                                                "
                                            >
                                                <i
                                                    :class="`${subcategory.icon} ${subcategory.color} me-2`"
                                                ></i>
                                                {{ subcategory.name }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Simple categories without subcategories -->
                                    <div
                                        v-else-if="category.id !== 'all'"
                                        class="category-item"
                                        @click="selectCategory(category)"
                                    >
                                        <i
                                            :class="`${category.icon} ${category.color} me-2`"
                                        ></i>
                                        {{ category.name }}
                                        <i
                                            class="fa-solid fa-check ms-auto"
                                            v-if="
                                                selectedCategoryData.value
                                                    ?.id === category.id
                                            "
                                        ></i>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <input
                            type="text"
                            class="form-control border-secondary"
                            placeholder="What are you looking for..."
                        />
                        <button
                            class="btn btn-outline-secondary search-btn"
                            type="button"
                        >
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>

                <!-- User Links and Sell Button -->
                <div class="d-flex align-items-center ms-auto">
                    <!-- Show Login/Register links only on auth pages -->
                    <div v-if="isAuthPage" class="d-none d-md-flex me-3">
                        <router-link
                            to="/login"
                            class="nav-link me-2 fw-bold text-primary"
                            >Login</router-link
                        >
                        <span class="text-muted">|</span>
                        <router-link
                            to="/register"
                            class="nav-link me-2 fw-bold text-primary ms-2"
                            >Register</router-link
                        >
                    </div>

                    <!-- Show user dropdown when logged in -->
                    <div
                        v-else-if="isLoggedIn"
                        class="d-flex align-items-center me-3"
                    >
                        <!-- Notification Icon -->
                        <button
                            class="btn btn-link text-primary me-2 position-relative"
                        >
                            <i class="fa-solid fa-bell"></i>
                        </button>

                        <!-- Message Icon -->
                        <button
                            class="btn btn-link text-muted me-2 position-relative"
                        >
                            <i class="fa-solid fa-message"></i>
                            <span
                                v-if="unreadNotificationCount > 0"
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style="font-size: 0.6rem"
                            >
                                {{ unreadNotificationCount }}
                            </span>
                        </button>

                        <!-- User Dropdown -->
                        <div class="dropdown user-dropdown">
                            <button
                                class="btn btn-link text-muted dropdown-toggle d-flex align-items-center"
                                type="button"
                                @click.stop="toggleUserDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span class="user-icon">
                                    <i
                                    class="fa-solid fa-user-circle fa-lg"
                                ></i>
                                </span>
                            </button>
                            <div
                                class="dropdown-menu user-dropdown-menu"
                                :class="{ show: isUserDropdownOpen }"
                            >
                                <!-- User Info Section -->
                                <div class="dropdown-header user-info">
                                    <div class="d-flex align-items-center mb-2">
                                        <i
                                            class="fa-solid fa-user-circle fa-2x text-muted me-3"
                                        ></i>
                                        <div>
                                            <div class="fw-bold text-primary">
                                                {{ userData.name }}
                                            </div>
                                            <div class="text-muted small">
                                                {{ userData.username }}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        class="btn btn-primary btn-sm w-100"
                                    >
                                        Upgrade Account
                                    </button>
                                </div>

                                <!-- Account Management -->
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-folder me-2"></i> My
                                    Ads
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-heart me-2"></i> Likes
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-bookmark me-2"></i>
                                    Saved
                                </a>

                                <!-- Job Related -->
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-briefcase me-2"></i>
                                    Applied Jobs
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-list me-2"></i> Job
                                    Applications
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-id-card me-2"></i>
                                    Resume(CV) ✨
                                </a>

                                <!-- Settings & Logout -->
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-dollar-sign me-2"></i>
                                    Subscription
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-gear me-2"></i>
                                    Settings
                                </a>
                                <a
                                    class="dropdown-item text-danger"
                                    href="#"
                                    @click="handleLogout"
                                >
                                    <i class="fa-solid fa-power-off me-2"></i>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Show Login/Register on other pages when not logged in -->
                    <div v-else class="d-none d-md-flex me-3">
                        <router-link
                            to="/login"
                            class="nav-link text-muted me-2"
                            >Login</router-link
                        >
                        <span class="text-muted">|</span>
                        <router-link
                            to="/register"
                            class="nav-link text-muted ms-2"
                            >Register</router-link
                        >
                    </div>

                    <button
                        class="btn btn-sell-custom text-white fw-bold shadow-lg"
                        type="button"
                    >
                        <i class="fas fa-camera-retro"></i>
                        Sell
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { fetchCategories } from "../../service/categories";
import Swal from "sweetalert2";

const route = useRoute();
const store = useStore();
const router = useRouter();

const isCategoryDropdownOpen = ref(false);
const selectedCategory = ref("All Category");
const categories = reactive([]);
const selectedCategoryData = ref({});
const expandedCategory = ref(null);

// User dropdown state
const isUserDropdownOpen = ref(false);

// Computed properties for conditional rendering
const isAuthPage = computed(() => {
    return route.name === "Login" || route.name === "Register";
});

// Get authentication and user data from Vuex store
const isLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);
const userData = computed(
    () =>
        store.getters["user/userData"] || {
            name: "User",
            username: "@user",
            avatar: null,
        }
);
const unreadNotificationCount = computed(
    () => store.getters["user/unreadNotificationCount"] || 0
);

const toggleCategoryDropdown = () => {
    console.log(
        "Toggle dropdown clicked, current state:",
        isCategoryDropdownOpen.value
    );
    isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
    console.log("New dropdown state:", isCategoryDropdownOpen.value);
};

const toggleCategoryExpansion = (categoryId) => {
    if (expandedCategory.value === categoryId) {
        expandedCategory.value = null;
    } else {
        expandedCategory.value = categoryId;
    }
};

const selectCategory = async (category) => {
    selectedCategory.value = category.name;
    selectedCategoryData.value = category;
    expandedCategory.value = category.hasSubcategories ? category.id : null;

    if (!category.hasSubcategories) {
        isCategoryDropdownOpen.value = false;
    }
};

const selectSubCategory = (subCategory) => {
    selectedCategory.value = `${selectedCategoryData.value.name} > ${subCategory.name}`;
    isCategoryDropdownOpen.value = false;
    expandedCategory.value = null;
};

// Load categories data
const loadCategories = async () => {
    try {
        const data = await fetchCategories();
        categories.push(...data.categories);

        // Set default category
        const defaultCategory = data.categories.find((cat) => cat.id === "all");
        if (defaultCategory) {
            selectedCategoryData.value = defaultCategory;
        }
    } catch (error) {
        console.error("Failed to load categories:", error);
    }
};

// User dropdown functions
const toggleUserDropdown = () => {
    isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const handleLogout = async () => {
    try {
        // Show a confirmation dialog using SweetAlert2
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        });

        // If the user confirms, proceed with logout
        if (result.isConfirmed) {
            await store.dispatch("auth/logout");
            isUserDropdownOpen.value = false;
            router.replace({ name: "Login" });

            Swal.fire({
                title: 'Logged Out!',
                text: 'You have been successfully logged out.',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            });

        }
    } catch (error) {
        console.error("Logout error:", error);
        // Show an error message if logout fails
        Swal.fire({
            title: 'Error!',
            text: 'There was an issue logging you out.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false
        });
    }
};

// Close dropdowns when clicking outside
const closeDropdown = (event) => {
    // Don't close if clicking on the dropdown itself
    if (event.target.closest(".category-dropdown")) {
        return;
    }
    if (event.target.closest(".user-dropdown")) {
        return;
    }
    isCategoryDropdownOpen.value = false;
    expandedCategory.value = null;
    isUserDropdownOpen.value = false;
};

// Initialize categories on mount
onMounted(async () => {
    await loadCategories();
    document.addEventListener("click", closeDropdown);

    // Initialize authentication from Vuex store
    if (!store.getters["auth/isAuthVerified"]) {
        await store.dispatch("auth/initAuth");
    }
});

onUnmounted(() => {
    document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
.btn-sell-custom {
    background-color: orange;
}

.search-container {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
}

/* Responsive search container */
@media (max-width: 1200px) {
    .search-container {
        max-width: 500px;
    }
}

@media (max-width: 992px) {
    .search-container {
        max-width: 400px;
    }
}

.category-dropdown {
    position: relative;
}

.category-btn {
    border-radius: 0;
    min-width: 160px;
    text-align: left;
    background-color: white;
    border-right: 2px solid #dee2e6;
}

.category-btn.active {
    background-color: #f8f9fa;
}

/* Ensure the search input has proper border separation */
.search-input {
    border-left: none;
    border-radius: 0;
}

/* Search button styling to match input */
.search-btn {
    border-radius: 0;
    border-left: none;
    background-color: white;
}


/* Make sure the input group doesn't have extra borders */
.input-group > .form-control:not(:first-child) {
    border-left: none;
}

.category-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    min-width: 300px;
    padding: 0;
    margin: 0;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    box-shadow: 0 0.5rem 1rem rgba(85, 85, 85, 0.15);
}

.dropdown-header {
    background-color: #f8f9fa;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #dee2e6;
    font-weight: 600;
    color: #495057;
}

.category-section {
    border-bottom: 1px solid #dee2e6;
}

.category-header {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #495057;
    border-bottom: 1px solid #e9ecef;
}

.category-header:hover {
    background-color: #f8f9fa;
}

.category-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: #495057;
    border-bottom: 1px solid #e9ecef;
}

.category-item:hover {
    background-color: #f8f9fa;
}

.subcategories {
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.subcategory-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 2rem;
    cursor: pointer;
    color: #495057;
    font-size: 0.9rem;
    border-bottom: 1px solid #e9ecef;
}

.subcategory-item:hover {
    background-color: #e9ecef;
}

.subcategory-item:last-child {
    border-bottom: none;
}

.fa-check {
    color: #0d6efd;
}

/* User Dropdown Styling */
.user-dropdown {
    position: relative;
}

.user-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    min-width: 280px;
    padding: 0;
    margin-top: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    background-color: white;
}

.user-info {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    padding: 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
}

.user-dropdown-menu .dropdown-item {
    padding: 0.75rem 1rem;
    color: #495057;
    border-bottom: 1px solid #e9ecef;
}

.user-dropdown-menu .dropdown-item:hover {
    background-color: #f8f9fa;
}

.user-dropdown-menu .dropdown-item:last-child {
    border-bottom: none;
}

.user-dropdown-menu .dropdown-divider {
    margin: 0.5rem 0;
    border-color: #e9ecef;
}

/* Notification badge positioning */
.position-relative .badge {
    font-size: 0.6rem;
    line-height: 1;
}

.user-icon, .user-icon-container, .user-menu-trigger {
    border-bottom: none !important;
    border: none !important;
    box-shadow: none !important;
    text-decoration: none !important;
}
</style>
