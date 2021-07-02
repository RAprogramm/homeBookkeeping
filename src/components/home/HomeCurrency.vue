<template>
	<Card >
	<template #title>Курс валют</template>
	<template #subtitle>Последнее обновление {{formatDate(new Date(date))}}</template>
	<template #content>

		<DataTable
				:value="currencies"
				class="p-datatable"
				:rows="6"
				dataKey="code"
				:rowHover="true"
				responsiveLayout="scroll"
				:globalFilterFields="['code','rate']"
			>
				<Column field="code" header="Валюта" sortable >
				<template #body="{data}">
					{{data.code}}
				</template>
				</Column>

				<Column field="rate" header="Курс" sortable dataType="numeric" >
				<template #body="{data}">
					{{data.rate}}
				</template>
				</Column>

		</DataTable>
	</template>
	<template #footer><small>* Курс валют по отношению к Евро</small></template>
	</Card>
</template>

<script>
import {computed, reactive} from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
	components: {
	Card,
		DataTable, Column},
	props: ['rates', 'date'],
	setup(props) {
		const currencies = reactive([
			{code: 'EUR', rate: props.rates['EUR']},
			{code: 'USD', rate: props.rates['USD']},
			{code: 'RUB', rate: props.rates['RUB']},
			{code: 'KRW', rate: props.rates['KRW']},
			{code: 'THB', rate: props.rates['THB']},
			{code: 'BTC', rate: props.rates['BTC']}
		])
		const formatDate = (value) => {
			return value.toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
		};

		return {
			currencies,
			formatDate
		}
	}
}
</script>

<style>

</style>
