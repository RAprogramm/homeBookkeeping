<template>
		<Page title="Счет">
			<template #header>
				<Button @click="refresh" v-tooltip="'Обновить курс валют'">
					<i class="pi pi-refresh" style="fontSize: 1.3rem"/>
				</Button>
			</template>
		</Page>

		<Loader v-if="loading"/>

		<div class="row" v-else>
			<h2>{{$store.getters['user/info'].bill}}</h2>
			<div class="col">
				<div class="homeCard">
					<home-bill :rates="currency.rates"/>
				</div>
			</div>
			<div class="col">
				<div class="homeCard">
					<home-currency :rates="currency.rates" :date="currency.date"/>
				</div>
			</div>
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

<style scoped>
.p-button {
	margin-top: 1.2rem;
	height: 3rem;	
}
</style>
