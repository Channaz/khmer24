<template>
    <!-- Main container for the login page, centered vertically and horizontally -->
    <div
        class="d-flex align-items-center justify-content-center min-vh-100 bg-light-subtle mb-3"
    >
        <div class="container py-3">
            <div class="row justify-content-center">
                <div class="col-lg-4">
                    <!-- The main login card container -->
                    <div
                        class="card border-0 rounded-4 shadow-lg p-3 p-md-5 login-card"
                    >
                        <h3 class="text-center fw-bold mb-4">
                            Log in to manage ads or post free ad
                        </h3>

                        <form @submit.prevent="handleLogin">
                            <div class="mb-2">
                                <label for="username" class="form-label fw-bold"
                                    >Phone Number or Username
                                    <span class="text-danger">*</span></label
                                >
                                <input
                                    type="text"
                                    class="form-control rounded-pill px-4 py-2"
                                    :class="{ 'yellow-bg': !isUsernameFocused }"
                                    id="username"
                                    v-model="username"
                                    @focus="isUsernameFocused = true"
                                    @blur="isUsernameFocused = false"
                                />
                            </div>
                            <div class="mb-3 position-relative">
                                <label for="password" class="form-label fw-bold"
                                    >Password
                                    <span class="text-danger">*</span></label
                                >
                                <input
                                    :type="passwordType"
                                    class="form-control rounded-pill px-4 py-2"
                                    :class="{ 'yellow-bg': !isPasswordFocused }"
                                    id="password"
                                    v-model="password"
                                    @focus="isPasswordFocused = true"
                                    @blur="isPasswordFocused = false"
                                />
                                <!-- Eye icon to toggle password visibility -->
                                <span
                                    class="position-absolute end-0 translate-middle-y me-3"
                                    style="top: 70%; cursor: pointer"
                                    @click="togglePasswordVisibility"
                                >
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                            </div>

                            <div class="d-grid gap-2 mb-2">
                                <button
                                    type="submit"
                                    class="btn btn-blue rounded-pill fw-bold py-2"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                        <div class="text-center">
                            <a href="#" class="text-decoration-none"
                                >Forgot Password Or Account</a
                            >
                            <hr class="my-2" />
                            <p class="text-muted text-uppercase mb-2">Or</p>
                            <div
                                class="d-flex justify-content-center gap-3 mb-2"
                            >
                                <a href="#" class="social-btn facebook pt-2">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-btn google pt-2">
                                    <i class="fab fa-google"></i>
                                </a>
                            </div>
                            <hr class="my-3" />
                            <p class="text-muted text-uppercase mb-2">Or</p>
                            <a
                                href="#"
                                class="btn btn-orange rounded-pill fw-bold py-2"
                                >Create an Account</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Reactive variables to store the username and password input values
const username = ref("Channa");
const password = ref("secretpassword");
const showPassword = ref(false);

// Reactive variables to manage focus state for styling
const isUsernameFocused = ref(false);
const isPasswordFocused = ref(false);

// Computed property to dynamically change the input type based on the showPassword state
const passwordType = computed(() => (showPassword.value ? "text" : "password"));

// Method to toggle the visibility of the password
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// Method to handle the form submission
const handleLogin = () => {
    console.log("Login attempt with:", {
        username: username.value,
        password: password.value,
    });
    // Add your login logic here, e.g., an API call to authenticate the user
};
</script>

<style scoped>
/*
* All styles for this component are scoped, meaning they will not
* affect other parts of your application.
*/
.login-card {
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.15);
    max-width: 480px;
    width: 100%;
}
.form-control.yellow-bg {
    background-color: #fffce7;
}
.btn-blue {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}
.btn-blue:hover {
    background-color: #0056b3;
    border-color: #004085;
}
.btn-orange {
    background-color: #ff9100;
    border-color: #ff9100;
    color: white;
}
.btn-orange:hover {
    background-color: #cc7400;
    border-color: #b36600;
}
.social-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}
.social-btn.facebook {
    background-color: #1877f2;
    color: white;
}
.social-btn.google {
    background-color: #ea4335;
    color: white;
}
</style>
