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
			message: null,
			currencies: JSON.parse(localStorage.getItem('currencies'))
		}
	},
	mutations: {
		setMessage(state, message) {
			state.message = message
		},
		setCurrencies(state, value) {
			state.currencies = value
			localStorage.setItem('currencies', JSON.stringify(value))
		},
	},
	actions: {
		async fetchCurrency({commit}) {
			try {
				const key = process.env.VUE_APP_FIXER
				const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,KRW,THB,BTC`)
				const rates = await res.json()
				commit('setCurrencies', rates)
			} catch(error) {
				commit('setMessage', {
					value: error.message,
					type: 'error'
				})
			}
		}
	},
	getters: {
		getCurrencies(state) {
			return state.currencies
		}
	},
	modules: {
		auth, register, user, categories, records
	}
})
