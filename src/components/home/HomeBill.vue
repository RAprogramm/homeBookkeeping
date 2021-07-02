<template>
	<Card>
		<template #title>
			Счёт
		</template>
		<template #subtitle>
			Счёт в иностранной валюте
		</template>
		<template #content>
			<p class="currency-line" v-for="cur of currencies" :key="cur.code">
				<span>{{cur.desc}}</span>
				<span><strong>{{currencyFilter(getResult(cur.code), cur.code)}}</strong></span>
			</p>
		</template>
		<template #footer><small>* Данная конвертация носит информационный характер</small></template>
	</Card>
</template>

<script>
import {computed, reactive} from 'vue'
import {useStore} from 'vuex'
import currencyFilter from '@/utils/currency'
import Card from 'primevue/card'

export default {
	components: {Card},
	props: ['rates'],
	setup(props) {
		const store = useStore()
		const currencies = reactive([
			{code: 'KRW', desc: 'Южнокорейская вона: '},
			{code: 'RUB', desc: 'Российский рубль: '},
			{code: 'USD', desc: 'Доллар США: '},
			{code: 'EUR', desc: 'Евро: '},
			{code: 'THB', desc: 'Тайский бат: '},
			{code: 'BTC', desc: 'Биткоин: '},
		])

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
