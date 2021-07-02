<template>
	<div class="page-subtitle">
		<h4>Создать</h4>
	</div>

	<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

		<div class="card">
			<h6>Введите название новой категории</h6>
			<div class="p-float-label inp">
				<InputText 
					id="title" 
					type="text" 
					v-model="state.title" 
					 :class="{'p-invalid':v$.title.$invalid && submitted}"
				/>
				<label 
					 :class="{'p-error':v$.title.$invalid && submitted}"
					for="title">Название</label>
			</div>
			<small 
					 v-if="(v$.title.$invalid && submitted) || v$.title.$pending.$response" 
					 class="p-error"
					 >
					 Необходимо указать название
			</small>
			<h6>Укажите лимит новой категории</h6>
			<div class="p-float-label inp">
				<InputNumber 
					 id="limit" 
					 v-model="state.limit" 
					 mode="currency"
					 currency="KRW"
					 locale="ru-RU"
					 :class="{'p-invalid':v$.limit.$invalid && submitted}"
					 />
				<label 
					 :class="{'p-error':v$.limit.$invalid && submitted}"
					 for="amount">Лимит</label>
			</div>
			<small 
					 v-if="(v$.limit.$invalid && submitted) || v$.limit.$pending.$response" 
					 class="p-error"
					 >
					 Необходимо указать лимит
			</small>

		</div>

		<Button type="submit" label="Создать категорию" class="p-mt-2" />
	</form>
</template>

<script>
import {reactive, ref} from 'vue'
import {useStore} from 'vuex'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
	components: {InputNumber, InputText},
	emits: ['created'],
	setup(_, {emit}) {
		const store = useStore()

		const state = reactive({
			title: null,
			limit: null,
		})

		const rules = {
			title: { required },
			limit: { required },
		};

		const submitted = ref(false);

		const v$ = useVuelidate(rules, state);

		const handleSubmit = (isFormValid) => {
			if (isFormValid) {
			console.log(state)
				onSubmit(state)
				resetForm()
			}	else {
				submitted.value = true;
				return;
			}
		}

		const resetForm = () => {
			state.title = null
			state.limit = null;
			submitted.value = false;
		}

		 	const onSubmit = (async values => {
			try {
				const category = await store.dispatch('categories/createCat', values)
				emit('created', category)
			} catch (e) {}
		})

		return {
		handleSubmit,
		state, 
		v$, 
		submitted

		}
	}
}
</script>

<style>
.inp {
	margin-top: 2rem;
}
</style>
