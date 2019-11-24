import Vue from 'vue';
import Router from 'vue-router';

// Page content
import Overview from '@/components/Overview';
import Dashboard from '@/components/Dashboard';

// Fallback page
import PageNotFound from '@/components/PageNotFound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview,
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
});
