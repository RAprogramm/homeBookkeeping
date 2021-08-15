import { createApp } from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import { setupRouter } from '@/router'
import store from '@/store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import '@/styles.css'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'chartjs-adapter-luxon'

import {setupI18n } from '@/i18n'

import en from "@/i18n/locales/en.json"
import ko from '@/i18n/locales/ko.json'
import ru from '@/i18n/locales/ru.json'
import ur from '@/i18n/locales/ur.json'

const i18n = setupI18n({
	globalInjection: true,
	legacy: false,
	locale: process.env.VUE_APP_I18N_LOCALE,
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACKLOCALE,
	messages: { en, ru, ko, ur }
})

const router = setupRouter(i18n)

	let app

getAuth().onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(i18n)
			.use(PrimeVue, { ripple: true })
			.use(ToastService)
			.use(router)
			.component('Button', Button)
			.component('Toast', Toast)
			.directive('tooltip', Tooltip)
			.directive('ripple', Ripple)
			.mount('#app')
	}
})
