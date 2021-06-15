<template>
	<Page title="Категории" />
		<section>
			<Loader v-if="loading"/>
			<div class="row" v-else>
				<CreateCategory @created="addNewCategory"/>
				<EditCategory 
				 	v-if="categories.length"
					:key="categories.length + upCount" 
					:categories="categories" 
					@updated="updateCategories"
				/>
				<p v-else>There is no categories</p>
			</div>
		</section>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import Loader from '@/components/ui/Loader'
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'

export default {
	components: {Page, CreateCategory, EditCategory, Loader},
	setup() {
		const store = useStore()
		const categories = ref([])
		const loading = ref(true)
		const upCount = ref(0)

		onBeforeMount(async() => {
			categories.value = await store.dispatch('categories/getCategories')
			loading.value = false
		})

		const addNewCategory = (category) => {
			categories.value.push(category)
		}

		const updateCategories = (values) => {
			const idx = categories.value.findIndex(c => c.id === values.category)
			categories.value[idx].title = values.title
			categories.value[idx].limit = values.limit
			upCount.value++
		}

		return {
			upCount,
			updateCategories,
			addNewCategory,
			loading,
			categories
		}
	}
}
</script>

<style>

</style>
