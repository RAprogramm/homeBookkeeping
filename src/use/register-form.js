import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref, computed, watch } from 'vue'
import { email, required, minLength, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'

export function useRegisterForm() {
	const router = useRouter()
	const store = useStore()
	const language = useI18n().locale.value

	const currencies = reactive([
		{ name: 'Register.rub', code: 'RUB' },
		{ name: 'Register.krw', code: 'KRW' },
		{ name: 'Register.usd', code: 'USD' }
	])

	const state = reactive({
		email: null,
		password: null,
		repeatPassword: null,
		name: null,
		bill: null,
		currency: null,
		accept: null
	})

	const rules = reactive({
		email: { required, email },
		password: { required, minLength: minLength(6) },
		repeatPassword: { sameAsPassword: sameAs(computed(() => state.password)) },
		name: { required },
		bill: { required },
		currency: { required },
		accept: { required }
	})

	const submitted = ref(false)

	const v$ = useVuelidate(rules, state)

	const handleSubmit = (isFormValid) => {
		if (isFormValid) {
			onSubmit(state)
			resetForm()
		} else {
			submitted.value = true
			return
		}
	}

	const resetForm = () => {
		state.email = null
		state.password = null
		state.repeatPassword = null
		state.name = null
		state.bill = null
		state.currency = null
		state.accept = null
		submitted.value = false
	}

	const onSubmit = async (values) => {
		try {
			const data = { ...values, language }
			await store.dispatch('register/createUser', data)
			router.push('/login')
		} catch (e) {}
	}

	return {
		currencies,
		handleSubmit,
		submitted,
		v$
	}
}
