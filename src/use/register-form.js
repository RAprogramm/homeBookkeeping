import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref, computed, watch } from 'vue'
import { email, required, minLength, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'

export function useRegisterForm() {
	const router = useRouter()
	const store = useStore()
	const i18n = useI18n()

	const state = reactive({
		email: null,
		password: null,
		repeatPassword: null,
		name: null,
		bill: null,
		accept: null
	})

	const rules = reactive({
		email: { required, email },
		password: { required, minLength: minLength(6) },
		repeatPassword: { sameAsPassword: sameAs(computed(() => state.password)) },
		name: { required },
		bill: { required },
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
		state.accept = null
		submitted.value = false
	}

	const onSubmit = async (values) => {
		try {
			const data = { ...values, language: i18n.locale.value }
			await store.dispatch('register/createUser', data)
			router.push('/login')
		} catch (e) {}
	}

	return {
		handleSubmit,
		submitted,
		v$
	}
}
