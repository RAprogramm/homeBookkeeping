<template>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>
	<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

			<div class="card">
				<h6>Выберите категорию</h6>
				<div class="p-field">
					<div class="p-float-label inp">
						<Dropdown 
							 id="category"
							 v-model="category" 
							 :options="categories" 
							 optionLabel="title" 
							 optionValue="id"
							 :class="{'p-invalid':v$.category.$invalid && submitted}"
							 />
						<label 
							 for="category"
							 :class="{'p-error':v$.category.$invalid && submitted}"
							 >Категория</label>
					</div>
				</div>
				<small 
							 v-if="(v$.category.$invalid && submitted) || v$.category.$pending.$response" 
							 class="p-error"
							 >
							 Необходимо выбрать категорию
				</small>

			</div>
		<div class="card">
			<h6>Введите новое название для категории</h6>
			<div class="p-float-label inp">
				<InputText 
					 :disabled="!category"
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
			<h6>Укажите новой лимит для категории</h6>
			<div class="p-float-label inp">
				<InputNumber 
					 :disabled="!category"
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

		<Button type="submit" label="Обновить категорию" class="p-mt-2" />
	</form>
</template>

<script>
import {useStore} from 'vuex'
import {watch, reactive, ref} from 'vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Dropdown from 'primevue/dropdown'

export default {
	components: {InputNumber, InputText, Dropdown},
	props: ['categories'],
	emits: ['updated'],
	setup(props, context) {
		const store = useStore()
		const category = ref(null)

		const state = reactive({
			category: null,
			title: null,
			limit: null,
		})

		const rules = {
			category: { required },
			title: { required },
			limit: { required },
		};

		const submitted = ref(false);

		const v$ = useVuelidate(rules, state);

		const handleSubmit = (isFormValid) => {
			if (isFormValid) {
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
				context.emit('updated', values)
				await store.dispatch('categories/editCat', values)
			} catch (e) {}
		})

		const current = watch(category, catId => {
			const {title: catTitle, limit: catLimit} = props.categories.find(c => c.id === catId)
			state.category = catId
			state.title = catTitle
			state.limit = catLimit
		})

		return {
			category,
			handleSubmit,
			state, 
			v$, 
			submitted
		}
	}
}
</script>

<style>

</style>
