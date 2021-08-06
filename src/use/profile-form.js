import { reactive, ref } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useEditProfile() {
	const store = useStore()
	const router = useRouter()
	const submitted = ref(false)
	const languages = reactive([
		{ language: 'Русский язык', code: 'ru' },
		{ language: '한국어', code: 'ko' },
		{ language: 'پاکستانی زبان', code: 'ur' },
		{ language: 'English', code: 'en' }
	])
	const currencies = reactive([
		{ name: 'Register.rub', code: 'RUB' },
		{ name: 'Register.krw', code: 'KRW' },
		{ name: 'Register.usd', code: 'USD' }
	])

	const state = reactive({
		name: store.getters['user/info'].name,
		language: store.getters['user/info'].language,
		currency: store.getters['user/info'].currency
	})

	const rules = {
		name: { required },
		language: { required },
		currency: { required }
	}

	const v$ = useVuelidate(rules, state)

	const handleSubmit = (isFormValid) => {
		if (isFormValid) {
			onSubmit(state)
		}
		return
	}

	const onSubmit = async (values) => {
		try {
			await store.dispatch('user/updateInfo', values)
			store.commit('setLanguage', values.language)
			router.push(`/${values.language}/profile`)
		} catch (e) {}
	}

	return {
		currencies,
		languages,
		handleSubmit,
		v$,
		submitted
	}
}
