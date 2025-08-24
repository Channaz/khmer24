<template>
    <main class="container py-5">
        <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
        >
            <div v-for="item in listings" :key="item.id" class="col">
                <div class="card h-100 rounded-3 shadow-sm transform-on-hover">
                    <img
                        :src="item.image"
                        class="card-img-top"
                        :alt="item.title"
                        style="height: 200px; object-fit: cover"
                    />
                    <div class="position-absolute top-0 end-0 m-2">
                        <button
                            class="btn btn-light rounded-circle p-2 text-danger opacity-75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C3.25 1.314 0 4.261 0 8.5 0 12.38 3.5 14.834 8 16c4.5-1.166 8-3.62 8-7.5-1.314-4.239-3.25-7.186-8-7.186z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title fw-semibold text-truncate">
                            {{ item.title }}
                        </h5>
                        <p class="card-text text-muted mb-1">
                            {{ item.date }} • {{ item.location }}
                        </p>
                        <p class="card-text text-muted mb-2">{{ item.info }}</p>
                        <h4 class="text-danger fw-bold mt-2">
                            ${{ item.price.toLocaleString() }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";

const listings = ref([
    {
        id: 1,
        title: "2024年轿车",
        image: "https://placehold.co/600x400/e60000/ffffff?text=Car+1",
        date: "02, Jul 2025",
        location: "Boeng Kang, Phnom Penh",
        info: "New • 2024 • Tax Paper",
        price: 158000,
    },
    {
        id: 2,
        title: "Alphard 2024 ថ្មី",
        image: "https://placehold.co/600x400/e60000/ffffff?text=Car+2",
        date: "24, Jun 2025",
        location: "Pramp'r Meakkakra, Phnom Penh",
        info: "New • 2024 • Tax Paper",
        price: 165000,
    },
    {
        id: 3,
        title: "2024年车",
        image: "https://placehold.co/600x400/e60000/ffffff?text=Car+3",
        date: "09, Jun 2025",
        location: "Boeng Kang, Phnom Penh",
        info: "New • 2024 • Tax Paper",
        price: 158800,
    },
    {
        id: 4,
        title: "Modern Apartment",
        image: "https://placehold.co/600x400/007bff/ffffff?text=Apartment+1",
        date: "15, Jun 2025",
        location: "Phnom Penh",
        info: "For Rent • 3 Beds • 2 Baths",
        price: 1200,
    },
    {
        id: 5,
        title: "iPhone 15 Pro Max",
        image: "https://placehold.co/600x400/333333/ffffff?text=iPhone+15",
        date: "10, Jun 2025",
        location: "Sangkat Boeung, Phnom Penh",
        info: "Used • 256GB • Like New",
        price: 1250,
    },
    {
        id: 6,
        title: "Honda Dream 2023",
        image: "https://placehold.co/600x400/ff9100/ffffff?text=Motorbike",
        date: "05, Jun 2025",
        location: "Phnom Penh",
        info: "Used • 125cc",
        price: 2500,
    },
]);
</script>

<style scoped>
.transform-on-hover:hover {
    transform: scale(1.03);
    transition: transform 0.2s ease-in-out;
}
</style>
