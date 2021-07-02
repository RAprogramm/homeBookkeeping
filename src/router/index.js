import { createRouter, createWebHistory } from 'vue-router'
import {getAuth} from 'firebase/auth'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Счёт',
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
    name: 'Категории',
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
	  path: '/detail/:id',
    name: 'Информация о записи',
	  component: () => import('@/views/DetailRecord.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/history',
    name: 'История записей',
	  component: () => import('@/views/History.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/planning',
    name: 'Планирование',
	  component: () => import('@/views/Planning.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/profile',
    name: 'Профиль',
	  component: () => import('@/views/Profile.vue'),
	  meta: {
		  auth: true,
		  layout: 'main'
	  }
  },
  {
    path: '/record',
    name: 'Новая запись',
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

router.beforeEach(async(to, from, next) => {
	const currentUser = await getAuth().currentUser
	const requireAuth = to.meta.auth

	if (requireAuth && !currentUser) {
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
