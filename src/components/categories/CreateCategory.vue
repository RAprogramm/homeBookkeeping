<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form @submit.prevent="onSubmit">
				<div class="input-field">
					<input
							id="title"
							type="text"
							v-model="title"
							@blur="tBlur"
							placeholder="Название"
							>
							<span class="helper-text invalid" v-if="tError">{{tError}}</span>
				</div>

				<div class="input-field">
					<input
							id="limit"
							type="number"
							v-model="limit"
							@blur="lBlur"
							placeholder="Лимит"
							>
							<span class="helper-text invalid" v-if="lError">{{lError}}</span>
				</div>

				<button class="btn waves-effect waves-light" type="submit">
					Создать
					<i class="material-icons right">✓</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import {useCreateCategory} from '@/use/create-category-form'

export default {
	setup() {
		return {
			...useCreateCategory()
		}
	}
}
</script>

<style>

</style>
