import { reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { email, required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export function useLoginForm() {
	const router = useRouter()
	const store = useStore()
	const language = computed(() => store.getters['getLanguage'])

	const state = reactive({
		email: null,
		password: null
	})

	const rules = {
		email: { required, email },
		password: { required, minLength: minLength(6) }
	}

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
		submitted.value = false
	}

	const onSubmit = async (values) => {
		try {
			await store.dispatch('auth/login', values)
			router.push(`/${language.value}/account`)
		} catch (e) {}
	}

	return {
		handleSubmit,
		submitted,
		v$
	}
}
