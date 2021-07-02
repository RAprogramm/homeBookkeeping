<template>
	<Page title="Планирование">
		<template #header>
			<div>
				<p class="balInfo">На Вашем счёте: </p>
				<h4 class="balInfoAm">{{currencyFilter(bill)}}</h4>
			</div>
		</template>
	</Page>

	<Loader v-if="loading"/>

	<Dialog header="Сейчас или позже?" v-else-if="categories.length === 0" visible>
		<p>Сперва необходимо создать хотя бы одну категорию.</p>
		<template #footer>
			<Button 
				label="Не сейчас" 
				icon="pi pi-times" 
				@click="$router.push('/')" 
				class="p-button-text"
			/>
				<Button 
					label="Создать сейчас" 
					icon="pi pi-check" 
					@click="$router.push('/categories')" 
					autofocus 
				/>
		</template>
	</Dialog>

	<section v-else> 
	<!-- <Panel header="График доходов/расходов" :toggleable="true" :collapsed="true"> -->
	<!-- <Pie :data="chartData" :options="chartOptions"/> -->
	<!-- </Panel> -->
		<div class="progBars">
			<div class="card" v-for="c in categories" :key="c.id">
				<div class="homeCard">
					<p>
					<strong>{{c.title}}: </strong>
					{{currencyFilter(c.spend)}} из {{currencyFilter(c.limit)}}
					</p>
					<ProgressBar :value="+c.progressPercent.toFixed(2)" v-tooltip="c.tooltip"/>
				</div>
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
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import Panel from 'primevue/panel'
import { Pie } from 'vue-chart-3';


export default {
	components: {Page, Dialog, Loader, ProgressBar,
	Panel, Pie},
	setup() {
		const store = useStore()
		const loading = ref(true)
		const categories = ref([])
		const chartData = ref({
			labels: ['A','B','C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ["#42A5F5","#66BB6A","#FFA726"],
                        hoverBackgroundColor: ["#64B5F6","#81C784","#FFB74D"]
                    }
                ]
		})
		const chartOptions = ref({})

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
				const tooltip = `${tooltip < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

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
	margin: 0	
}
</style>
