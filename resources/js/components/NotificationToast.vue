<template>
    <div class="notification-container">
        <TransitionGroup
            name="notification"
            tag="div"
            class="notification-list"
        >
            <div
                v-for="notification in notifications"
                :key="notification.id"
                class="alert alert-dismissible notification-item"
                :class="`alert-${notification.type}`"
                role="alert"
            >
                <div class="d-flex align-items-center">
                    <i
                        v-if="notification.type === 'success'"
                        class="fa-solid fa-check-circle me-2"
                    ></i>
                    <i
                        v-else-if="notification.type === 'error'"
                        class="fa-solid fa-exclamation-circle me-2"
                    ></i>
                    <i
                        v-else-if="notification.type === 'warning'"
                        class="fa-solid fa-exclamation-triangle me-2"
                    ></i>
                    <i v-else class="fa-solid fa-info-circle me-2"></i>
                    {{ notification.message }}
                </div>
                <button
                    type="button"
                    class="btn-close"
                    @click="hideNotification(notification.id)"
                    aria-label="Close"
                ></button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const notifications = computed(() => store.getters.notifications);

const hideNotification = (id) => {
    store.dispatch("hideNotification", id);
};
</script>

<style scoped>
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
}

.notification-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification-item {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 0;
    animation: slideIn 0.3s ease-out;
}

.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.notification-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.notification-move {
    transition: transform 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.alert-success {
    background-color: #d1edff;
    color: #0c5460;
    border-left: 4px solid #17a2b8;
}

.alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border-left: 4px solid #dc3545;
}

.alert-warning {
    background-color: #fff3cd;
    color: #856404;
    border-left: 4px solid #ffc107;
}

.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border-left: 4px solid #17a2b8;
}
</style>
