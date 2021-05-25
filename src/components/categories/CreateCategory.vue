<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form @submit.prevent="onSubmit">
				<div class="input-field">
					<input
							id="title"
							type="text"
							v-model="title"
							@blur="tBlur"
							placeholder="Название"
							>
							<span class="helper-text invalid" v-if="tError">{{tError}}</span>
				</div>

				<div class="input-field">
					<input
							id="limit"
							type="number"
							v-model.number="limit"
							@blur="lBlur"
							placeholder="Лимит"
							>
							<span class="helper-text invalid" v-if="lError">{{lError}}</span>
				</div>

				<button
					:disabled="isSubmitting" 
					class="btn waves-effect waves-light" 
					type="submit" 
				>
					Создать
					<i class="material-icons right">✓</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import {useStore} from 'vuex'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export default {
	emits: ['created'],
	setup(_, {emit}) {
		const store = useStore()
		const {handleSubmit, isSubmitting} = useForm()

		const {value: title, errorMessage: tError, handleBlur: tBlur, resetField: tReset} = useField(
			'title',
			yup
			.string()
			.trim()
			.required('Введите название')
		)
		 	const MIN_VALUE = 100
		const {value: limit, errorMessage: lError, handleBlur: lBlur, resetField: lReset} = useField(
			'limit',
			yup
			.number()
			.required('Необходимо указать лимит!')
			.min(MIN_VALUE, `Минимальная величина больше ${MIN_VALUE}`)
		)

		 	const onSubmit = handleSubmit(async values => {
			try {
				const category = await store.dispatch('categories/createCat', values)
				emit('created', category)
				tReset()
				lReset()
			} catch (e) {}
		})

		return {
			onSubmit,
			title,
			limit,
			tError,
			lError,
			tBlur,
			lBlur,
			isSubmitting
		}
	}
}
</script>

<style>

</style>
