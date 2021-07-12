<template>
	<div class="page-subtitle">
		<h4>{{ t('Categories.Create.title') }}</h4>
	</div>

	<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
		<div class="card">
			<h6>{{ t('Categories.Create.newCat') }}</h6>
			<div class="p-float-label inp">
				<InputText
					id="title"
					type="text"
					v-model="state.title"
					:class="{ 'p-invalid': v$.title.$invalid && submitted }"
				/>
				<label
					:class="{ 'p-error': v$.title.$invalid && submitted }"
					for="title"
					>{{ t('Categories.Create.cat') }}</label
				>
			</div>
			<small
				v-if="(v$.title.$invalid && submitted) || v$.title.$pending.$response"
				class="p-error"
			>
				{{ t('Categories.Create.catEr') }}
			</small>
			<h6>{{ t('Categories.Create.newLimit') }}</h6>
			<div class="p-float-label inp">
				<InputNumber
					id="limit"
					v-model="state.limit"
					mode="currency"
					currency="KRW"
					locale="ru-RU"
					:class="{ 'p-invalid': v$.limit.$invalid && submitted }"
				/>
				<label
					:class="{ 'p-error': v$.limit.$invalid && submitted }"
					for="amount"
					>{{ t('Categories.Create.limit') }}</label
				>
			</div>
			<small
				v-if="(v$.limit.$invalid && submitted) || v$.limit.$pending.$response"
				class="p-error"
			>
				{{ t('Categories.Create.limitEr') }}
			</small>
		</div>

		<Button type="submit" label="Создать категорию" class="p-mt-2">
			<span class="p-button-label">{{ t('Categories.Create.submit') }}</span>
		</Button>
	</form>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
	components: { InputNumber, InputText },
	emits: ['created'],
	setup(_, { emit }) {
		const store = useStore()

		const state = reactive({
			title: null,
			limit: null
		})

		const rules = {
			title: { required },
			limit: { required }
		}

		const submitted = ref(false)

		const v$ = useVuelidate(rules, state)

		const handleSubmit = (isFormValid) => {
			if (isFormValid) {
				console.log(state)
				onSubmit(state)
				resetForm()
			} else {
				submitted.value = true
				return
			}
		}

		const resetForm = () => {
			state.title = null
			state.limit = null
			submitted.value = false
		}

		const onSubmit = async (values) => {
			try {
				const category = await store.dispatch('categories/createCat', values)
				emit('created', category)
			} catch (e) {}
		}

		return {
			handleSubmit,
			state,
			v$,
			submitted,
			...useI18n()
		}
	}
}
</script>

<style>
.inp {
	margin-top: 2rem;
}
</style>
