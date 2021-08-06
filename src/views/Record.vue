<template>
	<Page>
		<template #title>
			{{ $t('Record.title') }}
		</template>
	</Page>
	<!-- <ProgressSpinner v-if="loading" /> -->

	<!-- <Dialog v-else-if="categories.length === 0" visible> -->
	<!-- 	<template #header> -->
	<!-- 		<h3>{{ $t('Record.Dialog.header') }}</h3> -->
	<!-- 	</template> -->
	<!-- 	<p> -->
	<!-- 		{{ $t('Record.Dialog.text') }} -->
	<!-- 	</p> -->
	<!-- 	<template #footer> -->
	<!-- 		<Button -->
	<!-- 			label="label" -->
	<!-- 			icon="pi pi-times" -->
	<!-- 			@click="$router.push('/')" -->
	<!-- 			class="p-button-text" -->
	<!-- 		> -->
	<!-- 			<span class="p-button-label">{{ $t('Record.Dialog.no') }}</span> -->
	<!-- 		</Button> -->
	<!-- 		<Button -->
	<!-- 			label="label" -->
	<!-- 			icon="pi pi-check" -->
	<!-- 			@click="$router.push('/categories')" -->
	<!-- 			autofocus -->
	<!-- 		> -->
	<!-- 			<span class="p-button-label">{{ $t('Record.Dialog.yes') }}</span> -->
	<!-- 		</Button> -->
	<!-- 	</template> -->
	<!-- </Dialog> -->

	<div class="newRecForm">
		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
			<div class="card">
				<h5>{{ $t('Record.chooseCat') }}</h5>
				<div class="p-field">
					<div class="p-float-label inp">
						<Dropdown
							id="category"
							v-model="state.category"
							:options="categories"
							optionLabel="title"
							:class="{ 'p-invalid': v$.category.$invalid && submitted }"
						/>
						<label
							for="category"
							:class="{ 'p-error': v$.category.$invalid && submitted }"
							>{{ $t('Record.category') }}</label
						>
					</div>
				</div>
				<small
					v-if="
						(v$.category.$invalid && submitted) ||
							v$.category.$pending.$response
					"
					class="p-error"
				>
					{{ $t('Record.catEr') }}
				</small>
			</div>

			<div class="card">
				<h5>{{ $t('Record.chooseType') }}</h5>
				<div class="p-field-radiobutton inp">
					<RadioButton
						id="type"
						name="type"
						value="income"
						v-model="state.type"
						:class="{ 'p-invalid': v$.type.$invalid && submitted }"
					/>
					<label
						:class="{ 'p-error': v$.type.$invalid && submitted }"
						for="type"
					>
						{{ $t('Record.income') }}</label
					>
				</div>
				<div class="p-field-radiobutton inp">
					<RadioButton
						id="type2"
						name="type"
						value="outcome"
						v-model="state.type"
						:class="{ 'p-invalid': v$.type.$invalid && submitted }"
					/>
					<label
						:class="{ 'p-error': v$.type.$invalid && submitted }"
						for="type2"
					>
						{{ $t('Record.outcome') }}</label
					>
				</div>
			</div>

			<div class="card">
				<h5>{{ $t('Record.dataRec') }}</h5>
				<div class="p-float-label inp">
					<InputNumber
						id="amount"
						v-model="state.amount"
						mode="currency"
						currency="KRW"
						locale="ru-RU"
						:class="{ 'p-invalid': v$.amount.$invalid && submitted }"
					/>
					<label
						:class="{ 'p-error': v$.amount.$invalid && submitted }"
						for="amount"
						>{{ $t('Record.amount') }}</label
					>
				</div>
				<small
					v-if="
						(v$.amount.$invalid && submitted) || v$.amount.$pending.$response
					"
					class="p-error"
				>
					{{ $t('Record.amountEr') }}
				</small>

				<div class="p-float-label inp">
					<InputText id="description" type="text" v-model="state.description" />
					<label for="description">{{ $t('Record.description') }}</label>
				</div>
			</div>

			<Button type="submit" class="p-mt-2">
				<span class="p-button-label">{{ $t('Record.submit') }}</span>
			</Button>
		</form>
	</div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Page from '@/components/ui/Page'
import ProgressSpinner from 'primevue/progressspinner'
import { useCreateRecord } from '@/use/record-form.js'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

export default {
	components: {
		InputText,
		InputNumber,
		Page,
		Dialog,
		ProgressSpinner,
		RadioButton,
		Dropdown
	},
	setup() {
		const store = useStore()
		const categories = ref([])
		const loading = ref(true)

		onBeforeMount(async () => {
			categories.value = await store.dispatch('categories/getCategories')
			loading.value = false
		})

		return {
			...useCreateRecord(),
			loading,
			categories
		}
	}
}
</script>

<style scoped>
.inp {
	margin-top: 2rem;
}
.newRecForm {
	margin: 2rem;
}
</style>
