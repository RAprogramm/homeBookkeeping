<template>
	<Page title="Категории" />
		<section>
			<Loader v-if="loading"/>
			<div class="row" v-else>
				<CreateCategory @created="addNewCategory"/>
				<EditCategory :categories="categories"/>
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

		onBeforeMount(async() => {
			categories.value = await store.dispatch('categories/getCategories')
			loading.value = false
		})

		const addNewCategory = (category) => {
			categories.value.push(category)
		}

		return {
			addNewCategory,
			loading,
			categories
		}
	}
}
</script>

<style>

</style>
