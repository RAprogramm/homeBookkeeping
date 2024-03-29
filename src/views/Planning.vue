<template>
	<Page>
		<template #title>
			{{ $t('Planning.title') }}
		</template>
		<template #header>
			<div>
				<p class="balInfo">{{ $t('Planning.header') }}</p>
				<h4 class="balInfoAm">{{ currencyFilter(bill) }}</h4>
			</div>
		</template>
	</Page>

	<ProgressSpinner v-if="loading" />

	<Dialog v-else-if="categories.length === 0" visible>
		<template #header>
			<h3>{{ $t('Planning.Dialog.header') }}</h3>
		</template>
		<p>{{ $t('Planning.Dialog.text') }}</p>
		<template #footer>
			<Button
				label="label"
				icon="pi pi-times"
				@click="$router.push('/')"
				class="p-button-text"
			>
				<span class="p-button-label">{{ $t('Planning.Dialog.no') }}</span>
			</Button>
			<Button
				label="label"
				icon="pi pi-check"
				@click="$router.push('/categories')"
				autofocus
			>
				<span class="p-button-label">{{ $t('Planning.Dialog.yes') }}</span>
			</Button>
		</template>
	</Dialog>

	<section v-else>
		<Panel :toggleable="true" :collapsed="true">
			<template #header>
				<strong>{{ $t('Planning.Panel.header') }}</strong>
			</template>
			<Chart type="pie" :data="chartData" :options="chartOptions" />
		</Panel>
		<div class="progBars">
			<div class="card" v-for="c in categories" :key="c.id">
				<div class="homeCard">
					<p>
						<strong>{{ c.title }}: </strong>
						{{ currencyFilter(c.spend) }} {{ $t('Planning.outOf') }}
						{{ currencyFilter(c.limit) }}
					</p>
					<ProgressBar
						:value="+c.progressPercent.toFixed(2)"
						v-tooltip="c.tooltip"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Page from '@/components/ui/Page'
import ProgressSpinner from 'primevue/progressspinner'
import currencyFilter from '@/utils/currency'
import Dialog from 'primevue/dialog'
import ProgressBar from 'primevue/progressbar'
import Panel from 'primevue/panel'
import { useI18n } from 'vue-i18n'
import Chart from 'primevue/chart'

export default {
	components: { Page, Dialog, ProgressSpinner, ProgressBar, Panel, Chart},
	setup() {
		const store = useStore()
		const loading = ref(true)
		const categories = ref([])
		const chartData = ref({})
		const chartOptions = ref({})
		const {t} = useI18n()

		const bill = computed(() => store.getters['user/info'].bill)

		onMounted(async () => {
			const categoriesFb = await store.dispatch('categories/getCategories')
			const records = await store.dispatch('records/getRecords')

			categories.value = categoriesFb.map((cat) => {
				const spend = records
					.filter((r) => r.categoryId === cat.id)
					.filter((r) => r.type === 'outcome')
					.reduce((total, record) => {
						return (total += +record.amount)
					}, 0)
				const percent = (100 * spend) / cat.limit
				const progressPercent = percent > 100 ? 100 : percent

				const tooltipValue = cat.limit - spend
				const tooltip = `${
					tooltip < 0
						? t('Planning.tooltip+')
						: t('Planning.tooltip-')
				} ${currencyFilter(Math.abs(tooltipValue))}`

				return {
					...cat,
					progressPercent,
					spend,
					tooltip
				}
			})
			chartData.value = {
				labels: categories.value.map((cat) => cat.title),
				datasets: [
					{
						data: categories.value.map((cat) => cat.spend),
						backgroundColor: categories.value.map(
							(cat) => `hsla(${Math.random() * 360}, 100%, 70%, 1)`
						),
						hoverBackgroundColor: 'white'
					}
				]
			}
			loading.value = false
		})

		return {
			bill,
			loading,
			categories,
			currencyFilter,
			chartData,
			chartOptions
		}
	}
}
</script>

<style>
.progBars {
	margin: 1rem;
}
.balInfo {
	margin: 1rem 0 0 0;
}
.balInfoAm {
	margin: 0;
}
</style>
