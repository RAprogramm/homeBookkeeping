<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>

			<form @submit.prevent="onSubmit">
				<label>Выберите категорию</label>
				<div class="input-field" >
					<select 
					 	name="category"
						v-model="category" 
						@blur="cBlur" 
					>
						<option disabled>Выберите категорию</option>
						<option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
					</select>
					<span class="helper-text invalid" v-if="cError">{{cError}}</span>
				</div>

				<div class="input-field">
					<input
							name="title"
							type="text"
							v-model="title"
							@blur="tBlur"
							placeholder="Название"
							>
							<span class="helper-text invalid" v-if="tError">{{tError}}</span>
				</div>

				<div class="input-field">
					<input
							name="limit"
							type="number"
							v-model.number="limit"
							@blur="lBlur"
							placeholder="Лимит"
							>
							<span class="helper-text invalid" v-if="lError">{{lError}}</span>
				</div>

				<button class="btn waves-effect waves-light" :disabled="isSubmitting" type="submit">
					Обновить
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import {watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'

export default {
	props: ['categories'],
	emits: ['updated'],
	setup(props, context) {
		const store = useStore()
		const {handleSubmit, isSubmitting} = useForm()

		const {value: category, errorMessage: cError, handleBlur: cBlur} = useField(
			'category',
			yup
			.string()
			.required('choose category for edit')
		)

		const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
			'title',
			yup
				.string()
				.trim()
				.required('Введите название')
		)
		
	 	const MIN_VALUE = 100
	 	const {value: limit, errorMessage: lError, handleBlur: lBlur} = useField(
			'limit',
			yup
				.number()
				.required('Необходимо указать лимит!')
				.min(MIN_VALUE, `Минимальная величина больше ${MIN_VALUE}`)
		)

	 	const onSubmit = handleSubmit(async values => {
			try {
				await store.dispatch('categories/editCat', values)
				context.emit('updated', values)
			} catch (e) {}
		})

		const current = watch(category, catId => {
			const {title: catTitle, limit: catLimit} = props.categories.find(c => c.id === catId)
			title.value = catTitle
			limit.value = catLimit
		})

		return {
			category,
			title,
			limit,
			current,
			cError,
			cBlur,
			tError,
			lError,
			tBlur,
			lBlur,
			onSubmit,
			isSubmitting
		}
	}
}
</script>

<style>

</style>
