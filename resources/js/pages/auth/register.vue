<template>
    <!-- Main container with a light gray background -->
    <div class="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <div
            class="card shadow-lg rounded-xl w-full mx-auto p-8"
            style="max-width: 550px"
        >
            <!-- Card header with the main title -->
            <div class="card-header border-0 text-center mb-6">
                <h3 class="text-2xl font-semibold text-gray-800">
                    Register to post free ad
                </h3>
                <p class="text-sm text-gray-600">
                    Create an account to start posting ads for free.
                </p>
            </div>

            <div class="card-body">
                <form @submit.prevent="handleSubmit">
                    <!-- First Name field -->
                    <div class="mb-3">
                        <label
                            for="firstName"
                            class="form-label text-sm text-gray-700 font-medium"
                        >
                            First Name <span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            class="form-control rounded-lg focus:ring-2 focus:ring-yellow-400"
                            :class="{
                                'is-invalid': errors.firstName && submitted,
                            }"
                            id="firstName"
                            v-model="form.firstName"
                            @input="validate('firstName')"
                        />
                        <div
                            class="invalid-feedback text-sm mt-1 text-red-600"
                            v-if="errors.firstName && submitted"
                        >
                            {{ errors.firstName }}
                        </div>
                    </div>

                    <!-- Last Name field -->
                    <div class="mb-3">
                        <label
                            for="lastName"
                            class="form-label text-sm text-gray-700 font-medium"
                        >
                            Last Name <span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            class="form-control rounded-lg focus:ring-2 focus:ring-yellow-400"
                            :class="{
                                'is-invalid': errors.lastName && submitted,
                            }"
                            id="lastName"
                            v-model="form.lastName"
                            @input="validate('lastName')"
                        />
                        <div
                            class="invalid-feedback text-sm mt-1 text-red-600"
                            v-if="errors.lastName && submitted"
                        >
                            {{ errors.lastName }}
                        </div>
                    </div>

                    <!-- Phone Number field -->
                    <div class="mb-3">
                        <label
                            for="phoneNumber"
                            class="form-label text-sm text-gray-700 font-medium"
                        >
                            Phone Number <span class="text-danger">*</span>
                        </label>
                        <input
                            type="tel"
                            class="form-control rounded-lg focus:ring-2 focus:ring-yellow-400 bg-yellow-100"
                            :class="{
                                'is-invalid': errors.phoneNumber && submitted,
                            }"
                            id="phoneNumber"
                            v-model="form.phoneNumber"
                            @input="validate('phoneNumber')"
                        />
                        <div
                            class="invalid-feedback text-sm mt-1 text-red-600"
                            v-if="errors.phoneNumber && submitted"
                        >
                            {{ errors.phoneNumber }}
                        </div>
                    </div>

                    <!-- Password field with visibility toggle -->
                    <div class="mb-3">
                        <label
                            for="password"
                            class="form-label text-sm text-gray-700 font-medium"
                        >
                            Password <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                :type="passwordFieldType"
                                class="form-control rounded-lg focus:ring-2 focus:ring-yellow-400 bg-yellow-100"
                                :class="{
                                    'is-invalid': errors.password && submitted,
                                }"
                                id="password"
                                v-model="form.password"
                                @input="validate('password')"
                            />
                            <button
                                class="btn btn-outline-secondary rounded-lg-end"
                                type="button"
                                @click="togglePasswordVisibility('password')"
                                tabindex="-1"
                            >
                                <i
                                    :class="
                                        passwordFieldType === 'password'
                                            ? 'fas fa-eye'
                                            : 'fas fa-eye-slash'
                                    "
                                ></i>
                            </button>
                            <div
                                class="invalid-feedback text-sm mt-1 text-red-600"
                                v-if="errors.password && submitted"
                            >
                                {{ errors.password }}
                            </div>
                        </div>
                    </div>

                    <!-- Confirm Password field with visibility toggle -->
                    <div class="mb-4">
                        <label
                            for="confirmPassword"
                            class="form-label text-sm text-gray-700 font-medium"
                        >
                            Confirm Password <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                :type="confirmPasswordFieldType"
                                class="form-control rounded-lg focus:ring-2 focus:ring-yellow-400"
                                :class="{
                                    'is-invalid': errors.confirmPassword,
                                }"
                                id="confirmPassword"
                                v-model="form.confirmPassword"
                                @input="validate('confirmPassword')"
                            />
                            <button
                                class="btn btn-outline-secondary rounded-lg-end"
                                type="button"
                                @click="
                                    togglePasswordVisibility('confirmPassword')
                                "
                                tabindex="-1"
                            >
                                <i
                                    :class="
                                        confirmPasswordFieldType === 'password'
                                            ? 'fas fa-eye'
                                            : 'fas fa-eye-slash'
                                    "
                                ></i>
                            </button>
                            <div
                                class="invalid-feedback text-sm mt-1 text-red-600"
                                v-if="errors.confirmPassword"
                            >
                                {{ errors.confirmPassword }}
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="d-grid mb-4">
                        <button
                            type="submit"
                            class="btn btn-warning btn-lg rounded-full text-white"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <hr class="my-2" />

                <!-- Social login section -->
                <div class="text-center mb-3">
                    <div class="text-muted text-uppercase mb-2">Or</div>
                    <div class="d-flex justify-content-center gap-3 mb-2">
                        <a
                            href="#"
                            class="social-btn facebook pt-2"
                            @click.prevent="socialLogin('facebook')"
                        >
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            class="social-btn google pt-2"
                            @click.prevent="socialLogin('google')"
                        >
                            <i class="fab fa-google"></i>
                        </a>
                    </div>
                </div>

                <hr class="my-2" />

                <!-- Login link section -->
                <div class="text-center">
                    <div class="text-muted text-uppercase mb-2">Or</div>
                    <div class="mb-4">
                        <p class="text-sm">Already have an account?</p>
                        <router-link
                            to="/login"
                            class="btn btn-primary btn-lg rounded-full text-white w-100"
                            @click.prevent="navigateToLogin"
                            >Log in</router-link
                        >
                    </div>
                </div>

                <!-- Privacy text -->
                <div class="text-center text-gray-500 text-xs mt-4">
                    By continuing, you agree to our
                    <a href="#" class="text-blue-500 underline">Posting Rule</a>
                    and
                    <a href="#" class="text-blue-500 underline"
                        >Privacy Policy</a
                    >.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { registerUser } from "@/service/auth.js";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();
// Reactive form data
const form = ref({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
});

const submitted = ref(false);
// Reactive validation errors
const errors = ref({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    password: null,
    confirmPassword: null,
});

// Reactive password visibility state
const passwordFieldType = ref("password");
const confirmPasswordFieldType = ref("password");

// Function to validate a specific field
const validate = (field) => {
    errors.value[field] = null; // Clear previous error

    if (field === "firstName" || field === "lastName") {
        if (!form.value[field]) {
            errors.value[field] = `${
                field.charAt(0).toUpperCase() + field.slice(1)
            } is required.`;
        }
    }

    if (field === "phoneNumber") {
        if (!form.value.phoneNumber) {
            errors.value.phoneNumber = "Phone number is required.";
        } else if (!/^\d{10,}$/.test(form.value.phoneNumber)) {
            errors.value.phoneNumber = "Invalid phone number format.";
        }
    }

    if (field === "password") {
        if (form.value.password.length < 6) {
            errors.value.password = "Password must be at least 6 characters.";
        }
    }

    if (field === "confirmPassword") {
        if (form.value.confirmPassword !== form.value.password) {
            errors.value.confirmPassword = "Passwords do not match.";
        }
    }

    // Also re-validate confirm password whenever password changes
    if (field === "password" && form.value.confirmPassword) {
        validate("confirmPassword");
    }
};

// Computed property to check if the entire form is valid
const isFormValid = computed(() => {
    validate("firstName");
    validate("lastName");
    validate("phoneNumber");
    validate("password");
    validate("confirmPassword");

    return Object.values(errors.value).every((error) => error === null);
});

// Function to toggle password visibility
const togglePasswordVisibility = (field) => {
    if (field === "password") {
        passwordFieldType.value =
            passwordFieldType.value === "password" ? "text" : "password";
    } else if (field === "confirmPassword") {
        confirmPasswordFieldType.value =
            confirmPasswordFieldType.value === "password" ? "text" : "password";
    }
};

const showAlert = (icon, title, text) => {
    Swal.fire({
        icon,
        title,
        text,
        timer: 1500,
        showConfirmButton: false,
    });
};

// Handle form submission
const handleSubmit = async () => {
    submitted.value = true;
    if (isFormValid.value) {
        try {
            const response = await registerUser({
                first_name: form.value.firstName,
                last_name: form.value.lastName,
                phone_number: form.value.phoneNumber,
                password: form.value.password,
            });

            if (response || response.status === 201) {
                router.push({ name: "Login" });

                showAlert(
                    "success",
                    "Registration Successful",
                    "បានបង្កើតគណនីថ្មីដោយជោគជ័យ"
                );
            }
        } catch (error) {
            showAlert("error", "Registration Failed", "ការបង្កើតគណនីបានបរាជ័យ");
        }
    } else {
        showAlert(
            "error",
            "Registration Failed",
            "សូមពិនិត្យមើលព័ត៌មានដែលបានបញ្ចូល"
        );
    }
};

// Placeholder functions for social login and navigation
const socialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
};

const navigateToLogin = () => {
    console.log("Navigating to login page");
};
</script>

<style scoped>
/* Scoped custom styles */
.btn-warning {
    background-color: #ff9100;
    border-color: #ff9100;
}

.btn-warning:hover {
    background-color: #e58100;
    border-color: #e58100;
}

.form-control.bg-yellow-100:focus {
    background-color: #fffbeb;
}

.invalid-feedback {
    display: block; /* Force display of the feedback message */
}

/* Custom styles for social buttons */
.social-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.social-btn:hover {
    transform: scale(1.1);
}

.social-btn.facebook {
    background-color: #1877f2;
    color: white;
}

.social-btn.google {
    background-color: #ea4335;
    color: white;
}

/* Fix for Bootstrap input-group rounded corners */
.input-group > .form-control:not(:first-child),
.input-group > .btn:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.input-group > .btn {
    border-top-right-radius: 0.5rem !important;
    border-bottom-right-radius: 0.5rem !important;
}

/* Ensure font-awesome icons are loaded for the eye toggle */
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'); */
</style>
