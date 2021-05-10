import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
	const router = useRouter()
	const store = useStore()

	const {handleSubmit, isSubmitting, submitCount} = useForm()

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
 	const isTooManyAttempts = computed(() => submitCount.value >= 3)
 	watch(isTooManyAttempts, val => {
		if(val) {
			setTimeout(() => submitCount.value = 0, 5000)
		}
	})
 	const onSubmit = handleSubmit(async values => {
		try {
			// await store.dispatch('auth/login', values)
			console.log(values)
			router.push('/')
		} catch (e) {}
	})
 	return {
		isTooManyAttempts,
		email,
		password,
		eError,
		pError,
		eBlur,
		pBlur,
		onSubmit,
		isSubmitting
	}
}
