<template>
	<ProgressSpinner v-if="loading" />
	<div v-else>
		<div class="detailCard">
			<Card>
				<template #header>
					<img
						src="@/assets/images/income.png"
						style="height: 15rem; width: 15rem"
						v-if="record.type === 'income'"
					/>
					<img
						v-else
						src="@/assets/images/outcome.png"
						style="height: 15rem; width: 15rem"
					/>
				</template>
				<template #title>
					{{ $t('DetailRecord.infoAbout') }}
					{{
						record.type === 'income'
							? $t('DetailRecord.inc')
							: $t('DetailRecord.out')
					}}
				</template>
				<template #subtitle>
					<small style="font-style: italic;">{{ record.dateTest }}</small>
				</template>
				<template #content>
					<p>
						<strong>{{ $t('Record.description') }}: </strong
						>{{ record.description }}
					</p>
					<p>
						<strong>{{ $t('Record.amount') }}: </strong
						>{{ currencyFilter(record.amount) }}
					</p>
					<p>
						<strong>{{ $t('Record.category') }}: </strong
						>{{ record.categoryName }}
					</p>
				</template>
				<template #footer>
					<Button
						icon="pi pi-list"
						label="label"
						class="p-button-secondary"
						@click="$router.push({ name: 'History' })"
					>
						<span class="p-button-label">{{
							$t('DetailRecord.buttonHist')
						}}</span>
					</Button>
					<!-- <Button icon="pi pi-check" label="Save" style="margin-left: .5em"/> -->
				</template>
			</Card>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import currencyFilter from '@/utils/currency'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'

export default {
	components: { ProgressSpinner, Card },
	setup() {
		const store = useStore()
		const loading = ref(true)
		const route = useRoute()
		const record = ref(null)

		onMounted(async () => {
			const id = route.params.id
			const recordById = await store.dispatch('records/getRecordById', id)
			const category = await store.dispatch(
				'categories/getCategoryById',
				recordById.categoryId
			)

			const excitingEventTime = recordById.date
			const eventDate = new Date(excitingEventTime)
			const formatter = Intl.DateTimeFormat('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				weekday: 'long',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			})

			record.value = {
				dateTest: formatter.format(eventDate),
				...recordById,
				categoryName: category.title
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
.detailCard {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 16px;
	text-align: center;
	background-color: #f1f1f1;
}
</style>
