<template>
	<Page>
		<template #title>
			{{ t('Categories.title') }}
		</template>
	</Page>
	<section>
		<ProgressSpinner v-if="loading" />

		<div class="row" v-else>
			<div class="col">
				<div class="homeCard">
					<CreateCategory @created="addNewCategory" />
				</div>
			</div>

			<div class="col">
				<div class="homeCard">
					<EditCategory
						v-if="categories.length"
						:key="categories.length + upCount"
						:categories="categories"
						@updated="updateCategories"
					/>
					<p v-else>{{ t('Categories.text') }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Page from '@/components/ui/Page'
import ProgressSpinner from 'primevue/progressspinner'
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'
import { useI18n } from 'vue-i18n'

export default {
	components: { Page, CreateCategory, EditCategory, ProgressSpinner },
	setup() {
		const store = useStore()
		const categories = ref([])
		const loading = ref(true)
		const upCount = ref(0)

		onBeforeMount(async () => {
			categories.value = await store.dispatch('categories/getCategories')
			loading.value = false
		})

		const addNewCategory = (category) => {
			categories.value.push(category)
		}

		const updateCategories = (values) => {
			const idx = categories.value.findIndex((c) => c.id === values.category)
			categories.value[idx].title = values.title
			categories.value[idx].limit = values.limit
			upCount.value++
		}

		return {
			...useI18n(),
			upCount,
			updateCategories,
			addNewCategory,
			loading,
			categories
		}
	}
}
</script>

<style></style>
