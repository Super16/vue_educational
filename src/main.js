import Vue from 'vue';
import App from './App.vue';

import { message, secondMessage } from './data';
import alertFunction from './functions';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertFunction(message);
alertFunction(secondMessage);
