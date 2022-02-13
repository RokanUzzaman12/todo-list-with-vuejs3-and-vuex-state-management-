import { createApp } from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import store from './assets/store/store.js'
import route from './router.js'

const app = createApp(App);
app.use(route);
app.use(store);
app.use(VueToast);
app.use(VueSweetalert2);
app.mount('#app');
