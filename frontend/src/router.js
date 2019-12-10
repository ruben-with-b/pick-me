import Vue from 'vue';
import Router from 'vue-router';

// Page content
import Overview from '@/components/Overview';
import Dashboard from '@/components/Dashboard';
import List from '@/components/List';

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
      path: '/list',
      name: 'List',
      component: List,
      props: true,
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
});
