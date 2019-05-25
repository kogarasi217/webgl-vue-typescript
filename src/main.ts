import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PageLoadedConsole from './plugins/pageloaded';

Vue.config.productionTip = false;
Vue.use(PageLoadedConsole);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
