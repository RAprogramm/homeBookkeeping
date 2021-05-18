<template>

			<div class="col s12 m6 l8">
				<div class="card orange darken-3 bill-card">
					<div class="card-content white-text">
						<div class="card-header">
							<span class="card-title">Курс валют</span>
						</div>
						<table class="tableOrange">
							<thead>
								<tr>
									<th>Валюта</th>
									<th>Курс</th>
									<th>Дата</th>
								</tr>
							</thead>

							<tbody>
								<tr v-for="cur in currencies" :key="cur">
									<td>{{cur}}</td>
									<td>{{(rates[cur]).toFixed(5)}}</td>
									<td>{{new Intl.DateTimeFormat('ru').format()}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
</template>

<script>
import {computed, ref} from 'vue'

export default {
	props: ['rates', 'date'],
	setup() {
		const currencies = ref(['KRW', 'RUB', 'USD', 'EUR', 'THB', 'BTC'])

		return {
			currencies
		}
	}
}
</script>

<style>

</style>
