import { createApp } from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import tooltipDerective from '@/directives/tooltip.directive.js'
import '@/styles.css'
import '@/assets/tooltip.css'

let app

getAuth().onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App).use(store).use(router).directive('tooltip', tooltipDerective).mount('#app')
	}
})
