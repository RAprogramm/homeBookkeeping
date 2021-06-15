<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Категория</th>
				<th>Тип</th>
				<th>Открыть</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(record, idx) in records" :key="record.id">
				<td>{{idx + 1}}</td>
				<td>{{currencyFilter(record.amount)}}</td>
				<td>{{record.date.slice(0, 10)}}</td>
				<td>{{record.categoryName}}</td>
				<td><Status :type="record.type"/></td>
				<td>
					<button 
						class="btn-small btn" 
						@click="$router.push('/detail/' + record.id)"
						v-tooltip="'Show record'"
					>
						<i class="material-icons">⌕</i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import currencyFilter from '@/utils/currency'
import Status from '@/components/ui/Status' 

export default {
	components: {Status},
	props: {
		records: {
			required: true,
			type: Array
		}
	},
	setup() {
		return {
			currencyFilter
		}
	}
}
</script>

<style>

</style>
