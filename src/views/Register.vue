<template>
	<div class="auth-page authCard">
		<h1 style="marginBottom: 4rem">{{ t('Register.title') }}</h1>
		<div class="authForm">
			<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				<div class="card">
					<h5>{{ t('Register.entName') }}</h5>
					<div class="p-float-label inp">
						<InputText
							id="name"
							v-model="v$.name.$model"
							:class="{ 'p-invalid': v$.name.$invalid && submitted }"
						/>
						<label
							for="name"
							:class="{ 'p-error': v$.name.$invalid && submitted }"
							>{{ t('Register.name') }}</label
						>
					</div>
					<small
						v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
						class="p-error"
					>
						{{ t('Register.nameEr') }}
					</small>
				</div>

				<div class="card">
					<h5>{{ t('Register.bill') }}</h5>
					<div class="p-float-label inp">
						<InputNumber
							id="bill"
							v-model="v$.bill.$model"
							:class="{ 'p-invalid': v$.bill.$invalid && submitted }"
							mode="currency"
							currency="KRW"
							locale="ru-RU"
						/>
						<label
							for="bill"
							:class="{ 'p-error': v$.bill.$invalid && submitted }"
							>{{ t('Register.acc') }}</label
						>
					</div>
					<small
						v-if="(v$.bill.$invalid && submitted) || v$.bill.$pending.$response"
						class="p-error"
					>
						{{ t('Register.accEr') }}
					</small>
				</div>

				<div class="card">
					<h5>{{ t('Login.email') }}</h5>
					<div class="p-float-label inp">
						<InputText
							autocomplete="current-email"
							id="email"
							v-model="v$.email.$model"
							aria-describedby="email-error"
							:class="{ 'p-invalid': v$.email.$invalid && submitted }"
						/>
						<label
							for="email"
							:class="{ 'p-error': v$.email.$invalid && submitted }"
							>{{ t('Login.e-m') }}</label
						>
					</div>
					<span v-if="v$.email.$error && submitted">
						<span
							id="email-error"
							v-for="(error, index) of v$.email.$errors"
							:key="index"
						>
							<small class="p-error">
								{{
									(error.$message = 'Value is not a valid email address'
										? t('Login.emailEr')
										: error.$message)
								}}
							</small>
						</span>
					</span>
					<small
						v-else-if="
							(v$.email.$invalid && submitted) || v$.email.$pending.$response
						"
						class="p-error"
					>
						{{ t('Login.emEr2') }}
					</small>
				</div>

				<div class="card">
					<h5>{{ t('Login.password') }}</h5>
					<div class="p-float-label inp">
						<Password
							autocomplete="new-password"
							toggleMask
							id="password"
							v-model="v$.password.$model"
							:class="{ 'p-invalid': v$.password.$invalid && submitted }"
						/>
						<label
							for="password"
							:class="{ 'p-error': v$.password.$invalid && submitted }"
							>{{ t('Login.passwd') }}</label
						>
					</div>
					<small
						v-if="
							(v$.password.required.$invalid && submitted) ||
								v$.password.$pending.$response
						"
						class="p-error"
					>
						{{ t('Login.passEr') }}
					</small>
					<small
						v-else-if="
							(v$.password.minLength.$invalid && submitted) ||
								v$.password.$pending.$response
						"
						class="p-error"
					>
						{{ t('Login.passMin') }} {{ v$.password.minLength.$params.min }}
						{{ t('Login.simbols') }}
					</small>

					<div class="p-float-label inp">
						<Password
							autocomplete="repeat-password"
							toggleMask
							id="repeatPassword"
							v-model="v$.repeatPassword.$model"
							:class="{
								'p-invalid':
									v$.repeatPassword.sameAsPassword.$invalid && submitted
							}"
						/>
						<label
							for="repeatPassword"
							:class="{
								'p-error': v$.repeatPassword.sameAsPassword.$invalid & submitted
							}"
							>{{ t('Register.repeat') }}</label
						>
					</div>
					<small
						v-if="
							(v$.repeatPassword.sameAsPassword.$invalid && submitted) ||
								v$.repeatPassword.$pending.$response
						"
						class="p-error"
					>
						{{ t('Register.repEr') }}
					</small>
				</div>

				<div class="card">
					<Checkbox
						id="accept"
						name="accept"
						value="Accept"
						v-model="v$.accept.$model"
						:class="{ 'p-invalid': v$.accept.$invalid && submitted }"
					/>
					<label
						for="accept"
						:class="{ 'p-error': v$.accept.$invalid && submitted }"
					>
						{{ t('Register.check') }}
					</label>
				</div>

				<Button type="submit" class="p-mt-2">
					<span class="p-button-label">{{ t('Register.reg') }}</span>
				</Button>
			</form>
		</div>

		<p class="center" style="marginTop: 2rem">
			{{ t('Register.have') }}
			<router-link to="/login">{{ t('Login.button') }}</router-link>
		</p>
	</div>
</template>

<script>
import { useRegisterForm } from '@/use/register-form'
import { error } from '@/utils/error'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import { useI18n } from 'vue-i18n'

export default {
	components: { InputText, Password, InputNumber, Checkbox },
	setup() {
		const route = useRoute()
		const store = useStore()

		if (route.query.message) {
			store.commit('setMessage', {
				value: error(route.query.message),
				type: 'warn'
			})
		}

		return {
			...useI18n(),
			...useRegisterForm()
		}
	}
}
</script>

<style scoped>
.inp {
	margin-top: 2rem;
}
.auth-page {
}
.authCard {
	margin: 1rem;
	padding-top: 0.5rem;
	border-radius: 1rem;
	padding-bottom: 0.5rem;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
	padding-left: 1rem;
	padding-right: 1rem;
	background-color: #f1f1f1;
}
</style>
