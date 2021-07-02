<template>
	<Page title="История записей" />
	<!-- <Panel header="График доходов/расходов" :toggleable="true" :collapsed="true"> -->
	<!-- <TheChart /> -->
	<!-- </Panel> -->

	<Panel header="Таблица" :toggleable="true" :collapsed="true">

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
				 :rowsPerPageOptions="[5,10,25]"
				 currentPageReportTemplate="Показаны с {first} по {last} из {totalRecords} элементов"
				 :globalFilterFields="['amount','categoryName','date','type']" 
				 responsiveLayout="stack"
				 breakpoint="640px"
				 >

				 <template #empty>
					 No customers found.
				 </template>

	<template #loading>
		Loading data. Please wait.
	</template>

	<!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->

	<Column field="amount" header="Сумма" sortable dataType="numeric" style="min-width: 8rem">
	<template #body="{data}">
		{{formatCurrency(data.amount)}}
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

	<Column field="categoryName" header="Категория" sortable style="min-width: 8rem">
	<template #body="{data}">
		{{data.categoryName}}
	</template>
	<template #filter="{filterModel}">
		<Dropdown 
																													 v-model="filterModel.value" 
																													 :options="catNames" 
																													 placeholder="Category" 
																													 class="p-column-filter" 
																													 :showClear="true"
																													 >
		</Dropdown>
	</template>
	</Column>

	<Column field="date" header="Дата" sortable dataType="date" style="min-width: 8rem">
	<template #body="{data}">
		{{formatDate(data.date)}}
	</template>
	<template #filter="{filterModel}">
		<Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
	</template>
	</Column>


	<Column 
																																field="type" 
																																header="Тип" 
																																sortable 
																																:filterMenuStyle="{'width':'14rem'}" 
																																style="min-width: 10rem"
																																>
																																<template #body="{data}">
																																	<Status :type="data.type"/>
																																</template>
	<template #filter="{filterModel}">
		<Dropdown 
																																v-model="filterModel.value" 
																																:options="statuses" 
																																placeholder="Type" 
																																class="p-column-filter" 
																																:showClear="true"
																																>
		</Dropdown>
	</template>
	</Column>

	<Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
	<template #body="{data}">
		<Button
				v-tooltip="'Подробнее'"
				type="button" 
				icon="pi pi-search"
				@click="$router.push('/detail/' + data.id)"
				></Button>
	</template>
	</Column>

	</DataTable>
	</Panel>

</template>

<script>
import {onMounted, ref, computed, watch, reactive} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import Loader from '@/components/ui/Loader'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Status from '@/components/ui/Status' 
import Panel from 'primevue/panel'
import TheChart from '@/views/TheChart'

export default {
	components: {
		TheChart,
		Panel,
		InputNumber,
		Dropdown,
		Calendar,
		Status,
		Page,  Loader,
		DataTable, Column, ColumnGroup},
	setup() {
		const items = ref([])
		const store = useStore()
		const loading = ref(true)
		const catNames = ref([])

		onMounted(async() => {
			const categories = await store.dispatch('categories/getCategories')
			const recordsFb = await store.dispatch('records/getRecords')
			items.value = recordsFb.map(record => {
				return {
					...record,
					date: new Date(record.date),
					categoryName: categories.find(c => c.id === record.categoryId).title,
				}
			})
			catNames.value = categories.map(c => c.title)
			loading.value = false
		})

		const formatDate = (value) => {
			return value.toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
		};

		const formatCurrency = (value) => {
			return value.toLocaleString("ru-RU", {
				style: "currency",
				currency: "KRW",
			});
		};

		const selectedCustomers = ref();
		const statuses = ref([
			"income",
			"outcome",
		])

		const filters = ref({
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			date: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
			},
			amount: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
			},
			type: {
				operator: FilterOperator.OR,
				constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
			},
			categoryName: {
				operator: FilterOperator.OR,
				constraints: [{ value: null}],
			},
			activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
			verified: { value: null, matchMode: FilterMatchMode.EQUALS },
		})

		return {
			catNames,
			statuses,
			filters,
			formatDate,
			formatCurrency,
			items,
			loading,
			selectedCustomers
		}
	}
}
</script>

<style>

</style>
