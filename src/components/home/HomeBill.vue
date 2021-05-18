<template>
			<div class="col s12 m6 l4">
				<div class="card light-blue bill-card">
					<div class="card-content white-text">
						<span class="card-title">Счет в валюте</span>
						<p class="currency-line" v-for="cur of currencies" :key="cur">
						<span>{{currencyFilter(getResult(cur), cur)}}</span>
						</p>
					</div>
				</div>
			</div>

</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import currencyFilter from '@/utils/currency'

export default {
	props: ['rates'],
	setup(props) {
		const store = useStore()
		const currencies = ref(['KRW', 'RUB', 'USD', 'EUR', 'THB', 'BTC'])

		const base = computed(() => store.getters['user/info'].bill / props.rates['KRW'] / props.rates['EUR'])
		
		const getResult = (currency) => {
			return base.value * props.rates[currency]
		}

		return {
			currencyFilter,
			currencies,
			getResult
		}
	}
}
</script>

<style>

</style>
