<template>

	<Page title="Новая запись" />
	<Loader v-if="loading"/>

	<Dialog header="Сейчас или позже?" v-else-if="categories.length === 0" visible>
		<p>В настоящее время у Вас нет категорий.	Сперва необходимо создать хотя бы одну.</p>
		<template #footer>
			<Button 
				label="Не сейчас" 
				icon="pi pi-times" 
				@click="$router.push('/')" 
				class="p-button-text"
			/>
				<Button 
					label="Создать сейчас" 
					icon="pi pi-check" 
					@click="$router.push('/categories')" 
					autofocus 
				/>
		</template>
	</Dialog>

	<div v-else class="newRecForm">
		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

			<div class="card">
				<h5>Выберите категорию</h5>
				<div class="p-field">
					<div class="p-float-label inp">
						<Dropdown 
							 id="category"
							 v-model="state.category" 
							 :options="categories" 
							 optionLabel="title" 
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
				<h5>Выберите тип записи</h5>
				<div class="p-field-radiobutton inp">
					<RadioButton 
						 id="type"
						 name="type"
						 value="income"
						 v-model="state.type"
						 :class="{'p-invalid':v$.type.$invalid && submitted}"
						 />
					<label 
						 :class="{'p-error':v$.type.$invalid && submitted}"
						 for="type"> Доход</label>
				</div>
				<div class="p-field-radiobutton inp">
					<RadioButton 
						 id="type2"
						 name="type"
						 value="outcome"
						 v-model="state.type"
						 :class="{'p-invalid':v$.type.$invalid && submitted}"
						 />
					<label 
						 :class="{'p-error':v$.type.$invalid && submitted}"
						 for="type2"> Расход</label>
				</div>
			</div>


			<div class="card">
				<h5>Введите данные</h5>
				<div class="p-float-label inp">
					<InputNumber 
						 id="amount" 
						 v-model="state.amount" 
						 mode="currency"
						 currency="KRW"
						 locale="ru-RU"
						 :class="{'p-invalid':v$.amount.$invalid && submitted}"
						 />
					<label 
						 :class="{'p-error':v$.amount.$invalid && submitted}"
						 for="amount">Сумма</label>
				</div>
				<small 
						 v-if="(v$.amount.$invalid && submitted) || v$.amount.$pending.$response" 
						 class="p-error"
						 >
						 Необходимо ввести сумму
				</small>

					<div class="p-float-label inp">
						<InputText id="description" type="text" v-model="state.description" />
						<label for="description">Описание</label>
					</div>
			</div>


			<Button type="submit" label="Создать запись" class="p-mt-2" />
		</form>
	</div>

</template>

<script>
import {ref, onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import Page from '@/components/ui/Page'
import Loader from '@/components/ui/Loader'
import {useCreateRecord} from '@/use/record-form.js' 
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'


export default {
	components: {InputText, InputNumber, Page, Dialog, Loader, RadioButton, Dropdown},
	setup() {
		const store = useStore()
		const categories = ref([])
		const loading = ref(true)

		onBeforeMount(async() => {
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
