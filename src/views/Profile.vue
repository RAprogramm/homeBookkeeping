<template>
	<Page title="Профиль" />
	<div class="newProfForm">
		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

			<div class="card">
				<h5>Введите новое имя</h5>
				<div class="p-float-label inp">
					<InputText id="name" type="text" v-model="state.name" />
					<label for="name">Имя</label>
				</div>
			</div>


			<Button type="submit" label="Внести изменения" class="p-mt-2" />
		</form>
	</div>
</template>

<script>
import Page from '@/components/ui/Page'
import InputText from 'primevue/inputtext'
import {useEditProfile} from '@/use/profile-form'

export default {
	components: {Page, InputText},
	setup() {

		return {
			...useEditProfile()
		}
	}
}
</script>

<style scoped>
.inp {
	margin-top: 2rem;
}
.newProfForm {
	margin: 2rem;
}

</style>
