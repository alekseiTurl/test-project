import { createApp } from 'vue';
import type { Directive } from 'vue';
import { mask } from 'vue-the-mask';
import { createVfm } from 'vue-final-modal';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './assets/styles/main.scss';
import 'vue-final-modal/style.css';

const app = createApp(App);
const vfm = createVfm();

app
  .directive('mask', mask as Directive)
  .use(VueAxios, axios)
  .use(vfm)
  .mount('#app');
