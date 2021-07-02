import {reactive, ref, computed} from 'vue'
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useStore} from 'vuex'
import currencyFilter from '@/utils/currency.js'

export function useCreateRecord() {
	const store = useStore()

	const state = reactive({
		category: null,
		type: null,
		amount: null,
		description: ''
	})

	const rules = {
		category: { required },
		type: { required },
		amount: { required },
	};

	const submitted = ref(false);

	const v$ = useVuelidate(rules, state);

	const handleSubmit = (isFormValid) => {
		if (isFormValid) {
			if (state.description === '') {
				state.description = 'Описание отсутствует'
			}
			state.category = state.category.id
			onSubmit(state)
			resetForm()
		}	else {
			submitted.value = true;
			return;
		}
	}

	const resetForm = () => {
		state.category = null
		state.type = null;
		state.amount = null
		state.description = '';
		submitted.value = false;
	}

	const canCreateRecord = computed(() => {
		if (state.type === "income") {
			return true
		} 
		return store.getters['user/info'].bill >= state.amount
	})

 	const onSubmit = (async values => {
		try {
			if (canCreateRecord.value) {
				const amount = values.amount
				const type = values.type
				await store.dispatch('records/createRecord', values)
				const bill = type === 'income'
					? store.getters['user/info'].bill + amount
					: store.getters['user/info'].bill - amount
				await store.dispatch('user/updateInfo', {bill})
			} else {
				store.commit('setMessage', {
					value: `
						На вашем счету недостаточно средств. 
						Для выполнения операции необходимо поступление на сумму ${currencyFilter(values.amount - store.getters['user/info'].bill)}
					`,
					type: 'warn'
				})
			}
		} catch (e) {}
	})

	return {
		handleSubmit,
		state, 
		v$, 
		submitted
	}
}
