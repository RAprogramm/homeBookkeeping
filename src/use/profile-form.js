import {reactive, ref, computed} from 'vue'
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useStore} from 'vuex'

export function useEditProfile() {
	const store = useStore()

	const state = reactive({
		name: null,
	})

	const rules = {
		name: { required },
	};

	const submitted = ref(false);

	const v$ = useVuelidate(rules, state);

	const handleSubmit = (isFormValid) => {
		if(isFormValid) {
			onSubmit(state)
			resetForm()
		}
		return
	}

	const resetForm = () => {
		state.name = null
	}

 	const onSubmit = (async values => {
		try {
			await store.dispatch('user/updateProfile', values)			
		} catch (e) {}
	})

	return {
		handleSubmit,
		state, 
		v$, 
		submitted
	}
}
