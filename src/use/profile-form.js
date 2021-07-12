import { reactive, ref, computed } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from 'vuex'

export function useEditProfile() {
	const store = useStore()
	const submitted = ref(false)
	const languages = reactive([
		{ language: 'Русский язык', code: 'ru-RU' },
		{ language: '한국어', code: 'ko-KR' },
		{ language: 'پاکستانی زبان', code: 'ur-PK' },
		{ language: 'English', code: 'en-US' }
	])

	const state = reactive({
		name: store.getters['user/info'].name,
		language: store.getters['user/info'].language
	})

	const rules = {
		name: { required },
		language: { required }
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
		} catch (e) {}
	}

	return {
		languages,
		handleSubmit,
		v$,
		submitted
	}
}
