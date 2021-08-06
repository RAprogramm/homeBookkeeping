import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import store from '@/store'
import { setI18nLanguage, loadLocaleMessages } from '@/i18n'

function load(component) {
	return () => import(`@/views/${component}.vue`)
}

export function setupRouter(i18n) {
	const lang = computed(() => store.getters['getLanguage'])
	const locale = lang.value || i18n.global.locale.value
	const routes = [
		{
			path: '/',
			beforeEnter: (to, from, next) => {
				const localePath = to.params.locale
				const supported_locales = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(
					','
				)
				if (!supported_locales.includes(localePath)) return next(locale)
				return next()
			}
		},
		{
			path: '/:pathMatch(.*)*',
			redirect() {
				return '/' + locale + '/profile'
			}
		},
		{
			path: '/:locale',
			redirect() {
				return '/' + locale + '/profile'
			},
			component: {
				template: '<router-view />'
			},
			meta: {
				auth: true,
				layout: 'main',
				transition: 'fade'
			},
			children: [
				{
					path: 'account',
					name: 'Account',
					component: load('Home')
				},
				{
					path: 'categories',
					name: 'Categories',
					component: load('Categories')
				},
				{
					path: 'detail/:id',
					name: 'Detail',
					component: load('DetailRecord')
				},
				{
					path: 'history',
					name: 'History',
					component: load('History')
				},
				{
					path: 'planning',
					name: 'Planning',
					component: load('Planning')
				},
				{
					path: 'profile',
					name: 'Profile',
					component: load('Profile')
				},
				{
					path: 'record',
					name: 'Record',
					component: load('Record')
				}
			]
		},
		{
			path: '/login',
			component: () => import('@/views/Login.vue'),
			meta: {
				layout: 'auth'
			}
		},
		{
			path: '/register',
			component: () => import('@/views/Register.vue'),
			meta: {
				layout: 'auth'
			}
		}
	]

	const router = createRouter({
		history: createWebHistory(process.env.BASE_URL),
		routes,
		linkActiveClass: 'active',
		linkExactActiveClass: 'active'
	})

	router.beforeEach(async (to, from, next) => {
		const currentUser = await getAuth().currentUser
		const requireAuth = to.meta.auth
		const paramsLocale = to.params.locale

		if (requireAuth && !currentUser) {
			next('/login?message=auth')
		} else {
			next()
		}

		if (!i18n.global.availableLocales.includes(paramsLocale)) {
			await loadLocaleMessages(i18n, paramsLocale)
		}

		setI18nLanguage(i18n, paramsLocale)
	})

	return router
}
