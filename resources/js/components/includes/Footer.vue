<template>
    <!-- Footer Section -->
    <footer class="footer-with-bg footer-background text-white py-5 mt-auto">
        <div class="container">
            <div class="row">
                <!-- Follow Section -->
                <div class="col-6 col-sm-6 col-md-3 mb-4">
                    <h5 class="fw-bold mb-3">Follow Khmer24</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a
                                href="#"
                                class="text-white text-decoration-none d-flex align-items-center"
                                ><i class="bi bi-facebook me-2"></i>Facebook</a
                            >
                        </li>
                        <li class="mb-2">
                            <a
                                href="#"
                                class="text-white text-decoration-none d-flex align-items-center"
                                ><i class="bi bi-youtube me-2"></i>YouTube</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Customer Service -->
                <div class="col-6 col-sm-6 col-md-3 mb-4">
                    <h5 class="fw-bold mb-3">Customer Service</h5>
                    <ul class="list-unstyled">
                        <li>
                            <a href="#" class="text-white text-decoration-none"
                                >Contact Us</a
                            >
                        </li>
                        <li>
                            <a href="#" class="text-white text-decoration-none"
                                >Privacy Policy</a
                            >
                        </li>
                        <li>
                            <a href="#" class="text-white text-decoration-none"
                                >Account Deletion</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Useful Information -->
                <div class="col-6 col-sm-6 col-md-3 mb-4">
                    <h5 class="fw-bold mb-3">Useful Information</h5>
                    <ul class="list-unstyled">
                        <li>
                            <a href="#" class="text-white text-decoration-none"
                                >Safety Tips</a
                            >
                        </li>
                        <li>
                            <a href="#" class="text-white text-decoration-none"
                                >Ad Posting Rule</a
                            >
                        </li>
                        <li>
                            <a href="#" class="text-white text-decoration-none"
                                >Feedback</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Download App -->
                <div class="col-6 col-sm-6 col-md-3 mb-4">
                    <h5 class="fw-bold mb-3">Download Khmer24 app for FREE</h5>
                    <div class="d-flex align-items-center">
                        <img
                            src="https://placehold.co/120x120/ffffff/000000?text=QR+Code"
                            alt="QR Code"
                            class="img-fluid me-3 rounded"
                            style="max-height: 100px"
                        />
                        <div class="d-flex flex-column">
                            <a href="#"
                                ><img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="App Store"
                                    class="img-fluid mb-2"
                                    style="max-height: 40px"
                            /></a>
                            <a href="#"
                                ><img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Google Play"
                                    class="img-fluid mb-2"
                                    style="max-height: 40px"
                            /></a>
                            <a href="#"
                                ><img
                                    src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Huawei_AppGallery_Badge.svg"
                                    alt="AppGallery"
                                    class="img-fluid"
                                    style="max-height: 40px"
                            /></a>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="border-secondary my-4" />

            <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary"
            >
                <div class="d-flex align-items-center mb-3 mb-md-0">
                    <img
                        src="https://placehold.co/120x30/ff9100/ffffff?text=We+Accept"
                        alt="We Accept"
                        height="24"
                    />
                    <img
                        src="https://placehold.co/120x30/e60000/ffffff?text=KHQR"
                        alt="KHQR"
                        height="24"
                        class="ms-2"
                    />
                </div>
                <p class="mb-0 text-white-50">
                    &copy; 2024 Khmer24. All Rights Reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-background {
    background-image: url("../../../../public/assets/images/khr24r.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    /* https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80 */
}

.footer-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.6) 50%,
        rgba(0, 0, 0, 0.9) 100%
    );
    z-index: 1;
}

.footer-background > * {
    position: relative;
    z-index: 2;
}

/* Ensure text has proper contrast */
.footer-background h5,
.footer-background p,
.footer-background a,
.footer-background li {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-weight: 600;
}

/* Make links more visible on hover */
.footer-background a:hover {
    color: #ff9100 !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}
</style>
