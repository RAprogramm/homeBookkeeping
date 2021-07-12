<template>
	<Card>
		<template #title>
			{{ t('Home.title') }}
		</template>
		<template #subtitle>
			{{ t('Home.Bill.title') }}
		</template>
		<template #content>
			<p class="currency-line" v-for="cur of currencies" :key="cur.code">
				<span>{{ cur.desc }}</span>
				<span
					><strong>{{
						currencyFilter(getResult(cur.code), cur.code)
					}}</strong></span
				>
			</p>
		</template>
		<template #footer
			><small>{{ t('Home.Bill.desc') }}</small></template
		>
	</Card>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import currencyFilter from '@/utils/currency'
import Card from 'primevue/card'
import { useI18n } from 'vue-i18n'

export default {
	components: { Card },
	props: ['rates'],
	setup(props) {
		const i18n = useI18n()
		const store = useStore()

		const currencies = reactive([
			{ code: 'KRW', desc: i18n.t('Home.Bill.krw') },
			{ code: 'RUB', desc: i18n.t('Home.Bill.rub') },
			{ code: 'USD', desc: i18n.t('Home.Bill.usd') },
			{ code: 'EUR', desc: i18n.t('Home.Bill.eur') },
			{ code: 'THB', desc: i18n.t('Home.Bill.thb') },
			{ code: 'BTC', desc: i18n.t('Home.Bill.btc') }
		])

		const base = computed(
			() =>
				store.getters['user/info'].bill /
				props.rates['KRW'] /
				props.rates['EUR']
		)

		const getResult = (currency) => {
			return base.value * props.rates[currency]
		}

		return {
			...useI18n(),
			currencyFilter,
			currencies,
			getResult
		}
	}
}
</script>

<style></style>
