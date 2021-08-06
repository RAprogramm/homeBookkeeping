<template>
	<Page>
		<template #title>
			{{ t('History.title') }}
		</template>
	</Page>

	<ProgressSpinner v-if="loading" />

	<div v-else>
		<Panel :toggleable="true" :collapsed="true">
			<template #header>
				<strong>{{ t('History.panel1') }}</strong>
			</template>
			<LineChart :data="chartData" :options="chartOptions" />
		</Panel>

		<Panel :toggleable="true" :collapsed="true">
			<template #header>
				<strong>{{ t('History.panel2') }}</strong>
			</template>

			<DataTable
				:value="items"
				:paginator="true"
				class="p-datatable"
				:rows="5"
				dataKey="id"
				:rowHover="true"
				v-model:selection="selectedCustomers"
				v-model:filters="filters"
				filterDisplay="menu"
				:loading="loading"
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
				:rowsPerPageOptions="[5, 10, 25]"
				:globalFilterFields="['amount', 'categoryName', 'date', 'type']"
				responsiveLayout="stack"
				breakpoint="640px"
			>
				<template #empty>
					{{ t('History.DataTable.null') }}
				</template>

				<template #loading>
					{{ t('History.DataTable.loading') }}
				</template>

				<Column selectionMode="multiple" headerStyle="width: 3rem" />

				<Column
					field="amount"
					:header="t('History.DataTable.amountCol')"
					sortable
					dataType="numeric"
					style="min-width: 8rem"
				>
					<template #body="{data}">
						{{ formatCurrency(data.amount) }}
					</template>
					<template #filter="{filterModel}">
						<InputNumber
							v-model="filterModel.value"
							mode="currency"
							currency="KRW"
							locale="ru-RU"
							placeholder="Enter amount"
						/>
					</template>
				</Column>

				<Column
					:header="t('History.DataTable.catCol')"
					field="categoryName"
					sortable
					style="min-width: 8rem"
				>
					<template #body="{data}">
						{{ data.categoryName }}
					</template>
					<template #filter="{filterModel}">
						<Dropdown
							v-model="filterModel.value"
							:options="catNames"
							placeholder="Category"
							class="p-column-filter"
							:showClear="true"
						/>
					</template>
				</Column>

				<Column
					:header="t('History.DataTable.dateCol')"
					field="date"
					sortable
					dataType="date"
					style="min-width: 8rem"
				>
					<template #body="{data}">
						{{ formatDate(data.date) }}
					</template>
					<template #filter="{filterModel}">
						<Calendar
							v-model="filterModel.value"
							dateFormat="dd/mm/yy"
							placeholder="dd/mm/yyyy"
						/>
					</template>
				</Column>

				<Column
					:header="t('History.DataTable.typeCol')"
					field="type"
					sortable
					:filterMenuStyle="{ width: '14rem' }"
					style="min-width: 10rem"
				>
					<template #body="{data}">
						<Status :type="data.type" />
					</template>
					<template #filter="{filterModel}">
						<Dropdown
							v-model="filterModel.value"
							:options="statuses"
							placeholder="Type"
							class="p-column-filter"
							:showClear="true"
						/>
					</template>
				</Column>

				<Column
					headerStyle="width: 4rem; text-align: center"
					bodyStyle="text-align: center; overflow: visible"
				>
					<template #body="{data}">
						<Button
							v-tooltip.left="t('History.DataTable.detail')"
							type="button"
							icon="pi pi-search"
							@click="$router.push('detail/' + data.id)"
						/>
					</template>
				</Column>
			</DataTable>
		</Panel>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { onMounted, ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import Page from '@/components/ui/Page'
import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Status from '@/components/ui/Status'
import Panel from 'primevue/panel'
import { LineChart } from 'vue-chart-3'
import currencyFilter from '@/utils/currency'

export default {
	components: {
		Panel,
		InputNumber,
		Dropdown,
		Calendar,
		Status,
		LineChart,
		Page,
		ProgressSpinner,
		DataTable,
		Column,
		ColumnGroup
	},
	setup() {
		const i18n = useI18n()
		const items = ref([])
		const store = useStore()
		const loading = ref(true)
		const catNames = ref([])
		const selectedCustomers = ref()
		const statuses = ref(['income', 'outcome'])
		const chartData = ref({})

		const footer = (tooltipItems) => {
			let sum = 0
			tooltipItems.forEach(function(tooltipItem) {
				tooltipItem.dataset.label === i18n.t('Record.outcome')
					? (sum -= tooltipItem.parsed.y)
					: (sum += tooltipItem.parsed.y)
			})
			return i18n.t('History.Chart.tooltip') + ' ' + currencyFilter(sum)
		}

		const chartOptions = ref({
			interaction: {
				mode: 'x',
				intersect: false
			},
			scales: {
				x: {
					ticks: {
						callback: function(val) {
							const array = []
							this.chart.data.datasets.forEach((d) => {
								d.data.forEach((i) => {
									array.push(i.x)
								})
							})
							const test = array.map((el) =>
								new Date(el).toLocaleDateString('ru')
							)
							return test.includes(val) ? val : null
						}
					},
					display: true,
					type: 'timeseries',
					time: {
						display: true,
						unit: 'day',
						locale: 'ru',
						tooltipFormat: 'EEEE, dd MMMM yyyy',
						round: 'day',
						displayFormats: {
							day: 'dd.MM.yyyy',
							month: 'MM.yyyy'
						}
					}
				}
			},
			plugins: {
				tooltip: {
					callbacks: {
						footer: footer
					}
				}
			},
			elements: {
				line: {
					tension: 0.5
				}
			}
		})

		onMounted(async () => {
			const categories = await store.dispatch('categories/getCategories')
			const recordsFb = await store.dispatch('records/getRecords')
			items.value = recordsFb.map((record) => {
				return {
					...record,
					date: new Date(record.date),
					categoryName: categories.find((c) => c.id === record.categoryId).title
				}
			})
			catNames.value = categories.map((c) => c.title)

			chartData.value = {
				datasets: [
					{
						label: i18n.t('History.Chart.income'),
						borderColor: 'rgb(11,156,49)',
						backgroundColor: 'rgba(11,156,49,.4)',
						data: recordsFb
							.filter((record) => record.type === 'income')
							.map((record) => {
								return { x: Date.parse(record.date), y: record.amount }
							})
							.sort((a, b) => {
								return a.x - b.x
							})
					},
					{
						label: i18n.t('History.Chart.outcome'),
						borderColor: 'rgb(255,0,0)',
						backgroundColor: 'rgba(255, 0, 0, .4)',
						data: recordsFb
							.filter((record) => record.type === 'outcome')
							.map((record) => {
								return { x: Date.parse(record.date), y: record.amount }
							})
							.sort((a, b) => {
								return a.x - b.x
							})
					}
				]
			}
			loading.value = false
		})

		const formatDate = (value) => {
			return value.toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
		}

		const formatCurrency = (value) => {
			return value.toLocaleString('ru-RU', {
				style: 'currency',
				currency: 'KRW'
			})
		}

		const filters = ref({
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			date: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
			},
			amount: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
			},
			type: {
				operator: FilterOperator.OR,
				constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
			},
			categoryName: {
				operator: FilterOperator.OR,
				constraints: [{ value: null }]
			},
			activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
			verified: { value: null, matchMode: FilterMatchMode.EQUALS }
		})

		return {
			...useI18n(),
			catNames,
			statuses,
			filters,
			formatDate,
			formatCurrency,
			items,
			loading,
			selectedCustomers,
			chartData,
			chartOptions
		}
	}
}
</script>

<style></style>
