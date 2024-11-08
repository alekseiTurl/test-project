import { createApp } from 'vue';
import type { Directive } from 'vue';
import { mask } from 'vue-the-mask';
import App from './App.vue';
import './assets/styles/main.scss';

createApp(App)
  .directive('mask', mask as Directive)
  .mount('#app');
