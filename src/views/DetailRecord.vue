<template>
	<Loader v-if="loading"/>
		<div v-else>
			<div class="breadcrumb-wrap">
				<router-link to="/history" class="breadcrumb">История</router-link>
					<Status :type="record.type"/>
			</div>
			<div class="row">
				<div class="col s12 m6">
					<div class="card" :class="[record.typeClass]">
						<div class="card-content" >
							<p><strong>Описание: </strong>{{record.description}}</p>
							<p><strong>Сумма: </strong>{{currencyFilter(record.amount)}}</p>
							<p><strong>Категория: </strong>{{record.categoryName}}</p>

							<small style="font-style: italic;">{{record.dateTest}}</small>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import currencyFilter from '@/utils/currency'
import Loader from '@/components/ui/Loader'
import Status from '@/components/ui/Status' 

export default {
	components: {Loader, Status},
	setup() {
		const store = useStore()
		const loading = ref(true)
		const route = useRoute()
		const record = ref(null)

		onMounted(async() => {
			const id = route.params.id
			const recordById = await store.dispatch('records/getRecordById', id)
			const category = await store.dispatch('categories/getCategoryById', recordById.categoryId)

			const excitingEventTime = recordById.date
			const eventDate = new Date(excitingEventTime);
			const formatter = Intl.DateTimeFormat("ru-RU", {
				// timeZone: "Australia/Melbourne",
				day: "numeric",
				month: "long",
				year: "numeric",
				weekday: "long",
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
				// timeZoneName: "short"
			});

			record.value = {
				dateTest: formatter.format(eventDate),
				...recordById,
				categoryName: category.title,
				typeClass: recordById.type === "income" ? 'green' : 'red'
			}
			loading.value = false
		})
		return {
			currencyFilter,
			loading,
			record
		}
	}
}
</script>

<style>

</style>
