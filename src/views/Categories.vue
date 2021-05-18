<template>
	<Page title="Категории" />
		<section>
			<div class="row">
				<CreateCategory />
				<EditCategory />
			</div>
		</section>
</template>

<script>
import Page from '@/components/ui/Page'
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'

export default {
	components: {Page, CreateCategory, EditCategory}
}
</script>

<style>

</style>
