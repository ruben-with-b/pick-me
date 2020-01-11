import Vue from 'vue';
import Router from 'vue-router';

// Page content
import Overview from '@/components/Overview';
import Dashboard from '@/components/Dashboard';
import List from '@/components/List';
import EditList from '@/components/EditList';
import Account from '@/components/Account';
import SignUp from '@/components/SignUp';
import Login from '@/components/Login';

// Fallback page
import PageNotFound from '@/components/PageNotFound';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { 
        guest: true
      }
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
      path: '/custom-list',
      name: 'EditList',
      component: EditList,
      props: true,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
      meta: { 
        guest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
      meta: { 
        guest: true
      }
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  // if want to route to an auth required page
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null && to.path !== '/login') { // if user not logged in
      next({
        path: '/login'
      }) 
    } else {
      	next()
    }

  } else {
    next() 
  }
})

export default router

