<template>
	<Page title="Новая запись" />

	<Loader v-if="loading"/>

		<p v-else-if="categories.length === 0">
			at first create a category.
			<router-link to="/categories">create now</router-link>
		</p>

		<form v-else class="form" @submit.prevent="onSubmit" v-if="categories.length">
			<label>Выберите категорию</label>
			<div class="input-field" >
				<select v-model="category" @blur="cBlur">
						<option disabled>Выберите категорию</option>
						<option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
				</select>
					<span class="helper-text invalid" v-if="cError">{{cError}}</span>
			</div>

			<div>
				<p>
				<label>
					<input
						v-model="type"
						class="with-gap"
						name="type"
						type="radio"
						value="income"
						@blur="tBlur"
					/>
					<span> Доход</span>
				</label>
				</p>

				<p>
				<label>
					<input
							v-model="type"
							class="with-gap"
							name="type"
							type="radio"
							value="outcome"
							@blur="tBlur"
							/>
					<span> Расход</span>
				</label>
				</p>
						<span class="helper-text invalid" v-if="tError">{{tError}}</span>
			</div>

			<div class="input-field">
				<input
						v-model.number="amount"
						type="number"
						placeholder="Сумма"
						@blur="aBlur"
						>
						<span class="helper-text invalid" v-if="aError">{{aError}}</span>
			</div>

			<div class="input-field">
				<input
						v-model="description"
						type="text"
						placeholder="Описание"
						@blur="dBlur"
						>
						<span class="helper-text invalid" v-if="dError">{{dError}}</span>
			</div>

			<button class="btn waves-effect waves-light" type="submit" :disabled="isSubmitting">
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import Loader from '@/components/ui/Loader'
import {useCreateRecord} from '@/use/record-form.js' 

export default {
	components: {Page, Loader},
	setup() {
		const store = useStore()
		const categories = ref([])
		const loading = ref(true)
		
		onBeforeMount(async() => {
			categories.value = await store.dispatch('categories/getCategories')
			loading.value = false
		})

		return {
			...useCreateRecord(),
			loading,
			categories
		}
	}
}
</script>

<style>

</style>
