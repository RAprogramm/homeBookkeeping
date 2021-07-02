import { createStore, createLogger } from 'vuex'
import auth from '@/store/modules/auth.module.js'
import register from '@/store/modules/register.module.js'
import user from '@/store/modules/user.module.js'
import categories from '@/store/modules/categories.module.js'
import records from '@/store/modules/records.module.js'

const plugins = []

if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}

export default createStore({
	plugins,
	state() {
		return {
			message: null
		}
	},
	mutations: {
		setMessage(state, message) {
			state.message = message
		},
	},
	actions: {
		async fetchCurrency() {
			const key = process.env.VUE_APP_FIXER
			const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,KRW,THB,BTC`)
			return await res.json()
		}
	},
	modules: {
		auth, register, user, categories, records
	}
})
