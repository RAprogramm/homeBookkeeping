import {computed} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'

export function useCreateRecord() {
	const store = useStore()
	const {handleSubmit, isSubmitting} = useForm()
	
	const {value: category, errorMessage: cError, handleBlur: cBlur, resetField: cReset} = useField(
		'category',
		yup
			.string()
			.required('choose category for edit')
	)

	const {value: type, errorMessage: tError, handleBlur: tBlur, resetField: tReset} = useField(
		'type',
		yup
			.string()
			.required('choose type')
		
	)

	const {value: amount, errorMessage: aError, handleBlur: aBlur, resetField: aReset} = useField(
		'amount',
		yup
			.number()
			.required('Введите cymmy')
	)
	
 	const {value: description, errorMessage: dError, handleBlur: dBlur, resetField: dReset} = useField(
		'description',
		yup
			.string()
			.trim()
	)

	const canCreateRecord = computed(() => {
		if (type.value === "income") {
			return true
		} 
		return store.getters['user/info'].bill >= amount.value
	})

 	const onSubmit = handleSubmit(async values => {
		try {
			if (canCreateRecord.value) {
				await store.dispatch('records/createRecord', values)
				const bill = type.value === 'income'
					? store.getters['user/info'].bill + amount.value
					: store.getters['user/info'].bill - amount.value
				await store.dispatch('user/updateInfo', {bill})
				cReset()
				tReset()
				aReset()
				dReset()
			} else {
				store.dispatch('setMessage', {
					value: `
						there are not enough funds in the account. 
						you need ${amount.value - store.getters['user/info'].bill} more
					`,
					type: 'warning'
				})
			}
		} catch (e) {}
	})

	return {
		category, cError, cBlur,
		amount, aError, aBlur,
		type, tError, tBlur,
		description, dError, dBlur,
		onSubmit,
		isSubmitting,
	}
}
