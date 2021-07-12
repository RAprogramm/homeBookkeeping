<template>
	<Card>
		<template #title>{{ t('Home.Currency.title') }}</template>
		<template #subtitle
			>{{ t('Home.Currency.subtitle') }}
			{{ formatDate(new Date(date)) }}</template
		>
		<template #content>
			<DataTable
				:value="currencies"
				class="p-datatable"
				:rows="6"
				dataKey="code"
				:rowHover="true"
				responsiveLayout="scroll"
				:globalFilterFields="['code', 'rate']"
			>
				<Column field="code" sortable>
					<template #header>
						<strong>{{ t('Home.Currency.codeCol') }}</strong>
					</template>
					<template #body="{data}">
						{{ data.code }}
					</template>
				</Column>

				<Column field="rate" sortable dataType="numeric">
					<template #header>
						<strong>{{ t('Home.Currency.rateCol') }}</strong>
					</template>
					<template #body="{data}">
						{{ data.rate }}
					</template>
				</Column>
			</DataTable>
		</template>
		<template #footer
			><small>{{ t('Home.Currency.desc') }}</small></template
		>
	</Card>
</template>

<script>
import { computed, reactive } from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useI18n } from 'vue-i18n'

export default {
	components: {
		Card,
		DataTable,
		Column
	},
	props: ['rates', 'date'],
	setup(props) {
		const currencies = reactive([
			{ code: 'EUR', rate: props.rates['EUR'] },
			{ code: 'USD', rate: props.rates['USD'] },
			{ code: 'RUB', rate: props.rates['RUB'] },
			{ code: 'KRW', rate: props.rates['KRW'] },
			{ code: 'THB', rate: props.rates['THB'] },
			{ code: 'BTC', rate: props.rates['BTC'] }
		])
		const formatDate = (value) => {
			return value.toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
		}

		return {
			...useI18n(),
			currencies,
			formatDate
		}
	}
}
</script>

<style></style>
