<template>
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
                            <!-- Phone Number Input -->
                            <div class="mb-2">
                                <label for="phone" class="form-label fw-bold">
                                    {{ t("forms.phone") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    class="form-control rounded-pill px-4 py-2"
                                    :class="{
                                        'yellow-bg': !isPhoneFocused,
                                        'is-invalid': validationErrors.phone,
                                    }"
                                    id="phone"
                                    v-model="loginData.phone"
                                    @focus="isPhoneFocused = true"
                                    @blur="isPhoneFocused = false"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="validationErrors.phone"
                                >
                                    {{ validationErrors.phone }}
                                </div>
                            </div>
                            <!-- Password Input -->
                            <div class="form-group mb-3">
                                <label
                                    for="password"
                                    class="form-label fw-bold text-dark mb-2"
                                >
                                    {{ t("forms.password") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="position-relative">
                                    <input
                                        :type="passwordType"
                                        class="form-control rounded-pill px-4 py-2"
                                        :class="{
                                            'yellow-bg': !isPasswordFocused,
                                            'is-invalid':
                                                validationErrors.password,
                                        }"
                                        id="password"
                                        v-model="loginData.password"
                                        @focus="isPasswordFocused = true"
                                        @blur="isPasswordFocused = false"
                                    />
                                    <!-- Eye icon to toggle password visibility -->
                                    <span
                                        class="password-icon"
                                        @click="togglePasswordVisibility"
                                    >
                                        <i
                                            :class="[
                                                'fa-solid',
                                                showPassword
                                                    ? 'fa-eye'
                                                    : 'fa-eye-slash',
                                            ]"
                                        ></i>
                                    </span>
                                </div>
                                <div
                                    class="invalid-feedback"
                                    v-if="validationErrors.password"
                                >
                                    {{ validationErrors.password }}
                                </div>
                            </div>
                            <div class="d-grid gap-2 mb-2">
                                <button
                                    type="submit"
                                    class="btn btn-blue rounded-pill fw-bold py-2"
                                >
                                    {{ t("common.login") }}
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
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { logUserIn } from "../../service/auth";
import Swal from "sweetalert2";

const router = useRouter();
const { t } = useI18n();

// Store form data in a reactive object for better organization
const loginData = reactive({
    phone: "",
    password: "",
});

const showPassword = ref(false);

// Reactive object for storing validation error messages
const validationErrors = reactive({
    phone: null,
    password: null,
});

// Computed property to dynamically change the input type based on the showPassword state
const passwordType = computed(() => (showPassword.value ? "text" : "password"));

// Method to toggle the visibility of the password
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// Reusable function to display SweetAlert messages
const showAlert = (icon, title, text) => {
    Swal.fire({
        icon,
        title,
        text,
    });
};

// Method to handle form submission and validation
const handleLogin = async () => {
    // Reset validation errors
    validationErrors.phone = null;
    validationErrors.password = null;

    let hasError = false;

    // Validation logic
    if (!loginData.phone) {
        validationErrors.phone = t("messages.required");
        hasError = true;
    }
    if (!loginData.password) {
        validationErrors.password = t("messages.required");
        hasError = true;
    }

    if (hasError) {
        // Don't show alert for validation errors, let the form display them
        // showAlert(
        //     "error",
        //     "Validation Error",
        //     "Please fill in all required fields."
        // );
        return;
    }

    // Show a loading alert while the login process is in progress
    Swal.fire({
        title: "Logging in...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        const res = await logUserIn(loginData.phone, loginData.password);
        Swal.close(); // Close the loading modal

        showAlert("success", "Success!", res.data.message);
        router.replace({ name: "Home" });
    } catch (error) {
        Swal.close(); // Close the loading modal

        // Don't log to console, just show user-friendly error message
        const errorMessage =
            error.response?.data?.message ||
            "Something went wrong. Please try again.";
        showAlert("error", "Login Failed", errorMessage);
    }
};

// Reactive variables to manage focus state for styling
const isPhoneFocused = ref(false);
const isPasswordFocused = ref(false);
</script>

<style scoped>
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
.password-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    cursor: pointer;
    transform: translateY(-50%);
    color: #6c757d; /* text-muted color */
    z-index: 10;
    background-color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

/* Hide Bootstrap's default validation icon when eye icon is present */
.form-control.is-invalid {
    background-image: none !important;
    padding-right: 3rem !important;
}

/* Ensure error messages are visible */
.invalid-feedback {
    display: block !important;
    color: #dc3545 !important;
    font-size: 0.875rem !important;
    margin-top: 0.25rem !important;
    font-weight: 500 !important;
    line-height: 1.2 !important;
}

/* Additional styling for invalid inputs */
.form-control.is-invalid {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
}
</style>
