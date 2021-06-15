<template>
	<Page title="Планирование">
		<template #header>
			<h4>{{currencyFilter(bill)}}</h4>
		</template>
	</Page>
	<Loader v-if="loading"/>

		<p v-else-if="categories.length === 0">
			at first create a category.
			<router-link to="/categories">create now</router-link>
		</p>
		<section v-else> 
			<div v-for="c in categories" :key="c.id" :value="c.id">
				<p>
				<strong>{{c.title}}: </strong>
				{{currencyFilter(c.spend)}} из {{currencyFilter(c.limit)}}
				</p>
				<div class="progress" v-tooltip="c.tooltip">
					<p class="progressPercent">{{c.progressPercent}} %</p>
					<div
							class="progressBar"
							:style="{width: c.progressPercent + '%'}"
					></div>
				</div>
			</div>
		</section>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import Loader from '@/components/ui/Loader'
import currencyFilter from '@/utils/currency'

export default {
	components: {Page, Loader},
	setup() {
		const store = useStore()
		const loading = ref(true)
		const categories = ref([])

		const bill = computed(() => store.getters['user/info'].bill)

		onMounted(async() => {
			const categoriesFb = await store.dispatch('categories/getCategories')
			const records = await store.dispatch('records/getRecords')

			categories.value = categoriesFb.map(cat => {
				const spend = records
					.filter(r => r.categoryId === cat.id)
					.filter(r => r.type === "outcome")
					.reduce((total, record) => {
						return total += +record.amount
					}, 0)
				const percent = 100 * spend / cat.limit
				const progressPercent = percent > 100 ? 100 : percent

				const tooltipValue = cat.limit - spend
				const tooltip = `${tooltip < 0 ? 'More ' : 'Left'} ${currencyFilter(Math.abs(tooltipValue))}`

				return {
					...cat,
					progressPercent, 
					spend,
					tooltip
				}
			})
			loading.value = false
		})

		return {
			bill,
			loading,
			categories,
			currencyFilter,
		}
	}
}
</script>

<style>

</style>
