import "./bootstrap";
import "jquery";
import "bootstrap";
import { createApp } from "vue";
import { createStore } from "vuex";
import router, { injectStore } from "./router/index";
import Layout from "./layout/main.vue";
import store from "./store";
// import "admin-lte/dist/css/adminlte.min.css";
// import "admin-lte/dist/js/adminlte.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css';
// import '@eonasdan/tempus-dominus/dist/js/tempus-dominus.min.js';
import App from "./pages/App.vue";
import i18n from "./i18n";

const app = createApp(App);

// Inject store into router
injectStore(store);

app.component("admin-layout", Layout);
//<admin-layout></admin-layout>

app.use(store);
app.use(router);
app.use(i18n);

app.mount("#app");
