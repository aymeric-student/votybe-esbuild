import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
});

createApp(App).use(vuetify).mount('#app');
