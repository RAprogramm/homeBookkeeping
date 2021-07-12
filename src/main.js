import { createApp } from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import '@/styles.css'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'

import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-luxon'
import i18n from '@/i18n'

Chart.register(...registerables)

let app

getAuth().onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(i18n, { locale: 'en' })
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
