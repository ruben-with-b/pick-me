import Vue from 'vue';
import App from './App.vue';
import router from './router';
import PrettyCheckbox from 'pretty-checkbox-vue';

Vue.use(PrettyCheckbox);

Vue.config.productionTip = false;
require('@/assets/main.scss');

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});
