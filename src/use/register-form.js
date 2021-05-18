import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useRegisterForm() {
	const router = useRouter()
	const store = useStore()

	const {handleSubmit, isSubmitting} = useForm()

	const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
		'email',
		yup
			.string()
			.trim()
			.required('E-mail is required!')
			.email('E-mail must be correct!')
	)
 	const MIN_LENGTH = 6
 	const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
		'password',
		yup
			.string()
			.trim()
			.required('Password is required!')
			.min(MIN_LENGTH, `Password must be more than ${MIN_LENGTH} characters!`)
	)
	const {value: name, errorMessage: nError, handleBlur: nBlur} = useField(
		'name',
		yup
			.string()
			.trim()
			.required('What is your name?')
	)
	const {value: agree, errorMessage: aError, handleBlur: aBlur} = useField(
		'agree',
		yup
			.boolean()
			.required('You must confirm terms of service')
			.oneOf([true], 'You can not regiter without agreement')
	)
 	const onSubmit = handleSubmit(async values => {
		try {
			await store.dispatch('register/createUser', values)
			router.push('/login')
		} catch (e) {}
	})

 	return {
		email, eError, eBlur,
		password, pError, pBlur,
		name, nError, nBlur,
		agree, aError, aBlur,
		onSubmit,
		isSubmitting
	}
}
