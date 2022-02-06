import { createApp } from 'vue'
import App from './App.vue'

import store from './assets/store/store.js'
import route from './router.js'

const app = createApp(App);
app.use(route);
app.use(store);

app.mount('#app');
