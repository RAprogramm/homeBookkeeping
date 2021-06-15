<template>
	<Page title="История записей" />

		<div class="history-chart">
			<canvas></canvas>
		</div>

		<Loader v-if="loading" />

		<p v-else-if="items.length === 0">
			No records. 
			<router-link to="/record">create new record</router-link>
		</p>

		<section v-else>
			<HistoryTable :records="items" v-model="items"/>
			<Pagination 
						 @onClickPage="numberPage"
						 @onClickPrev="prevPage"
						 @onClickNext="nextPage"
						 @onClickFirst="firstPage"
						 @onClickLast="lastPage"
						 :pages="pageCount" 
						 :currentPage="page"
			/>
		</section>
</template>

<script>
import {onMounted, ref, computed, watch} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import HistoryTable from '@/components/history/HistoryTable'
import Loader from '@/components/ui/Loader'
import Pagination from '@/components/pagination/Pagination'
import {usePagination} from '@/mixins/pagination.mixin.js'

export default {
	components: {Page, HistoryTable, Loader, Pagination},
	setup() {
		onMounted(async() => {
			const categories = await store.dispatch('categories/getCategories')
			const recordsFb = await store.dispatch('records/getRecords')
			items.value = recordsFb.map(record => {
				return {
					...record,
					categoryName: categories.find(c => c.id === record.categoryId).title,
				}
			})
			setupPagination(items.value)
			loading.value = false
		})


		const store = useStore()
		const loading = ref(true)

		const {
			setupPagination, 
			items, 
			pageCount, 
			allItems, 
			page, 
			pageSize, 
			numberPage, 
			nextPage, 
			prevPage, 
			firstPage, 
			lastPage,
		} = usePagination()

		return {
			numberPage,
			nextPage,
			prevPage,
			firstPage,
			lastPage,
			page,
			pageSize,
			allItems,
			items,
			pageCount,
			loading,
		}
	}
}
</script>

<style>

</style>
