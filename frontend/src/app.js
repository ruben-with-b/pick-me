'use strict';

const Vue = require('vue');
const App = require('./App.vue');
const router = require('./router');
const PrettyCheckbox = require('pretty-checkbox-vue');

Vue.use(PrettyCheckbox);

Vue.config.productionTip = false;
require('@/assets/main.scss');

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});
