<template>
	<Page :key="locale">
		<template #title>
			{{ t('Profile.title') }}
		</template>
	</Page>
	<div class="newProfForm">
		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
			<div class="card">
				<h5>{{ t('Profile.newName') }}</h5>
				<div class="p-float-label inp">
					<InputText
						id="name"
						type="text"
						v-model="v$.name.$model"
						:class="{ 'p-invalid': v$.name.$invalid }"
					/>
					<label for="name" :class="{ 'p-error': v$.name.$invalid }">{{
						t('Profile.name')
					}}</label>
				</div>
				<small
					v-if="v$.name.$invalid || v$.name.$pending.$response"
					class="p-error"
				>
					{{ t('Profile.nEr') }}
				</small>
			</div>

			<div class="card" style="marginTop: 3rem;">
				<h5>{{ t('Profile.chooseLang') }}</h5>
				<div class="p-float-label inp">
					<Dropdown
						v-model="v$.language.$model"
						:options="languages"
						optionLabel="language"
						optionValue="code"
					/>
				</div>
			</div>

			<Button :disabled="v$.$invalid" type="submit">
				<span class="p-button-label">{{ t('Profile.submit') }}</span>
			</Button>
		</form>
	</div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import Page from '@/components/ui/Page'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useEditProfile } from '@/use/profile-form'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

export default {
	components: { Page, InputText, Dropdown },
	setup: () => {
		const globalLocale = useI18n().locale
		const store = useStore()
		const userLang = computed(() => store.getters['user/info'].language)
		watch([globalLocale, userLang], (val) => {
			globalLocale.value = userLang.value
		})
		return { ...useI18n(), ...useEditProfile() }
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
.p-dropdown {
	width: 14rem;
}
</style>
