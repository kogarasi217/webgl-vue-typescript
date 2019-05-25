import Vue from 'vue';
import Router from 'vue-router';
import WebGLPage from './views/WebGL.vue';
import WebGLPage2 from './views/WebGL2.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'webgl',
      component: WebGLPage,
    },
    {
      path: '/sphere',
      name: 'sphere',
      component: WebGLPage2
    }
  ],
});
