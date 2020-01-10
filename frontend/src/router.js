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
        requiresAuth: true
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
      // props: true,
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
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      	next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
	    if(localStorage.getItem('jwt') == null){
	        next()
	    }
	    else{
	        next({ name: 'Dashboard'})
	    }
    }else {
    next() 
  }
})

export default router

