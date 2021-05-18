import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'

export function useCreateCategory() {
	const store = useStore()

	const {handleSubmit, isSubmitting, submitCount} = useForm()

	const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
		'title',
		yup
			.string()
			.trim()
			.required('Введите название')
	)
 	const MIN_VALUE = 1
 	const {value: limit, errorMessage: lError, handleBlur: lBlur} = useField(
		'limit',
		yup
			.string()
			.trim()
			.required('Необходимо указать лимит!')
			.min(MIN_VALUE, `Минимальная величина больше ${MIN_VALUE}`)
	)

 	const onSubmit = handleSubmit(async values => {
		try {
			// await store.dispatch('auth/login', values)
			console.log('createCat', values)
		} catch (e) {}
	})
 	return {
		title,
		limit,
		tError,
		lError,
		tBlur,
		lBlur,
		onSubmit,
		isSubmitting
	}
}
