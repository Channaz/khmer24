<template>
    <!-- Header Section -->
    <header class="bg-white shadow-sm sticky-top">
        <nav class="navbar navbar-expand-lg d-container">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="#">
                    <img
                        src="https://placehold.co/150x30/007bff/ffffff?text=khmer24"
                        alt="Khmer24 Logo"
                        height="30"
                    />
                </a>

                <!-- Search Bar (for larger screens) -->
                <form class="d-none d-md-flex flex-grow-1 mx-4">
                    <div class="input-group">
                        <select class="form-select border-end-0 text-muted">
                            <option selected>All Category</option>
                            <option>Cars</option>
                            <option>Electronics</option>
                            <option>Real Estate</option>
                        </select>
                        <input
                            type="text"
                            class="form-control border-start-0"
                            placeholder="What are you looking for..."
                        />
                        <button class="btn btn-primary" type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-search"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>

                <!-- User Links and Sell Button -->
                <div class="d-flex align-items-center ms-auto">
                    <div class="d-none d-md-flex me-3">
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
                        class="btn btn-warning text-white fw-bold shadow-lg"
                        type="button"
                    >
                        <i class="icon-camera"></i>
                        Sell
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Banner Section -->
    <!-- <section class="bg-primary overflow-hidden">
        <img
            src="https://placehold.co/1920x400/1a5198/ffffff?text=Khmer24+Banner+Placeholder"
            alt="Khmer24 Banner"
            class="img-fluid"
            style="width: 100%; height: auto; object-fit: cover"
        />
    </section> -->
</template>
