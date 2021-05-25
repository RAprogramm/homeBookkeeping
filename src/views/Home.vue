<template>
		<Page title="Счет">
			<template #header>
				<button @click="refresh" class="btn waves-effect waves-light btn-small">
					<i class="material-icons">refresh</i>
				</button>
			</template>
		</Page>

		<Loader v-if="loading"/>

		<div class="row" v-else>
			<home-bill :rates="currency.rates"/>
			<home-currency :rates="currency.rates" :date="currency.date"/>
		</div>

</template>

<script>
import {ref, reactive, onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import Loader from '@/components/ui/Loader'
import HomeBill from '@/components/home/HomeBill'
import HomeCurrency from '@/components/home/HomeCurrency'

export default {
	setup() {
		const store = useStore()
		const loading = ref(false)
		const currency = ref({})

		const refresh = async () => {
			loading.value = true
			currency.value = await store.dispatch('fetchCurrency')
			loading.value = false
		}

		onBeforeMount(async() => {
			loading.value = true
			currency.value = await store.dispatch('fetchCurrency')
			loading.value = false
		})

		return {
			refresh,
			loading,
			currency
		}
	},
	components: {
		Page,
		HomeBill,
		HomeCurrency,
		Loader
	}
}
</script>

<style>
</style>
