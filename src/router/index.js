import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
	  component: () => import('@/views/Home.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/login',
    name: 'Login',
	  component: () => import('@/views/Login.vue'),
	  meta: {
		  layout: 'auth'
	  }
  },
  {
    path: '/categories',
    name: 'Categories',
	  component: () => import('@/views/Categories.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/register',
    name: 'Register',
	  component: () => import('@/views/Register.vue'),
	  meta: {
		  layout: 'auth'
	  }
  },
  {
    path: '/detail',
    name: 'Detail',
	  component: () => import('@/views/DetailRecord.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/history',
    name: 'History',
	  component: () => import('@/views/History.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/planning',
    name: 'Planning',
	  component: () => import('@/views/Planning.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/profile',
    name: 'Profile',
	  component: () => import('@/views/Profile.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/record',
    name: 'Record',
	  component: () => import('@/views/Record.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
	const requireAuth = to.meta.auth

	if (requireAuth) {
		next()
	} else if (requireAuth) {
		next('/login?message=auth')
	} else {
		next()
	}
	// if (requireAuth && store.getters['auth/isAuthenticated']) {
	// 	next()
	// } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
	// 	next('/login?message=auth')
	// } else {
	// 	next()
	// }
})

export default router
