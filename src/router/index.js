import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior(to) {
    if (to.hash) {
      const element = document.querySelector(to.hash);

      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
});
router.beforeEach((to, from, next) => {
  if (!store.getters['auth/isAuthorized'] && to.matched.some((route) => route.meta.protected)) {
    next({
      name: 'registry',
      query: {
        redirectTo: to.fullPath,
      },
    });
  } else if (window.navigator.onLine === false) {
    next({
      name: 'empty',
      query: {
        redirectTo: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
