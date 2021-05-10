import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
	  component: () => import('@/views/Home.vue'),
	  meta: {
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
		  layout: 'main'
	  }
  },
  {
    path: '/history',
    name: 'History',
	  component: () => import('@/views/History.vue'),
	  meta: {
		  layout: 'main'
	  }
  },
  {
    path: '/planning',
    name: 'Planning',
	  component: () => import('@/views/Planning.vue'),
	  meta: {
		  layout: 'main'
	  }
  },
  {
    path: '/profile',
    name: 'Profile',
	  component: () => import('@/views/Profile.vue'),
	  meta: {
		  layout: 'main'
	  }
  },
  {
    path: '/record',
    name: 'Record',
	  component: () => import('@/views/Record.vue'),
	  meta: {
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

export default router
