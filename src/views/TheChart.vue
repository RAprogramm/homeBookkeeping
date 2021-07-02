<template>
	<div class="graph">
	  <LineChart :data="chartData" :options="chartOptions"/>
	</div>
</template>

<script>
import {onMounted, ref, computed} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import { LineChart } from 'vue-chart-3';
import currencyFilter from '@/utils/currency'

export default {
	components: {Page, LineChart},
	setup() {
		const store = useStore()
		const loading = ref(true)
		const chartData = ref({})
		const chartOptions = ref({})

		onMounted(async() => {
			const recordsFb = await store.dispatch('records/getRecords')

			chartData.value = {
				labels: recordsFb.map(record => new Date(record.date)),
				datasets: [
					{
						label: 'Доход',
						borderColor: 'rgb(11,156,49)',
						backgroundColor: 'rgba(11,156,49,.4)',
						data: recordsFb
							.map(record => record.type === 'income' ? record.amount : 'outcome')
							.filter(n => n !== 'outcome')
					},
					{
						label: 'Расход',
						borderColor: 'rgb(255,0,0)',
						backgroundColor: 'rgba(255, 0, 0, .4)',
						data: recordsFb
							.map(record => record.type === 'outcome' ? record.amount : 'income')
							.filter(n => n !== 'income')
					}
				]
			}
			
			chartOptions.value = {
				responsive: true,
				scales: {
					x: {
						type: 'time',
						time: {
							unit: 'day',
							locale: 'ru-RU'
						},
						display: true,
						title: {
							display: true,
							text: 'Дата',
							font: {
								family: 'Comic Sans MS',
								size: 20,
								weight: 'bold',
								lineHeight: 1.2,
							},
							padding: {top: 20, left: 0, right: 0, bottom: 0}
						}
					},
					y: {
						ticks: {
							stepSize: 50000,
							// callback: function(val, index) {
							// 	return val
							// }
						},
						display: true,
						title: {
							display: true,
							text: 'Сумма',
							font: {
								family: 'Comic Sans MS',
								size: 20,
								weight: 'bold',
								lineHeight: 1.2,
							},
							padding: {top: 30, left: 0, right: 0, bottom: 0}
						}
					}
				},
				elements: {
					line: {
						tension: 0.5
					},
				},
			}
			loading.value = false
		})
		return {
			loading,
			chartData,
			chartOptions
		}
	}
}
</script>

<style>

</style>
