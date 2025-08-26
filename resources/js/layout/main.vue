<template>
    <div id="app" class="d-flex flex-column min-vh-100">
        <!-- Floating Feedback Button -->
        <a
            href="#"
            class="btn btn-primary position-fixed top-50 end-0 translate-middle-y rounded-start-pill text-white shadow-sm d-none d-md-block"
            style="
                writing-mode: vertical-lr;
                z-index: 1050;
                padding: 1rem 0.5rem;
            "
        >
            Feedback
        </a>

        <!-- Notification Toast Component -->
        <NotificationToast />
    </div>
</template>

<script setup>
import NotificationToast from "../components/NotificationToast.vue";
</script>
