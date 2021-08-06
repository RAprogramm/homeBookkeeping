<template>
	<div class="auth-page authCard">
		<h1 style="marginBottom: 4rem">{{ $t('Login.title') }}</h1>
		<div class="authForm">
			<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				<div class="card">
					<h5>{{ $t('Login.email') }}</h5>
					<div class="p-inputgroup">
						<span class="p-inputgroup-addon">
							<i
								:class="{ 'p-error': v$.email.$invalid && submitted }"
								class="pi pi-envelope"
							/>
						</span>
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
								>{{ $t('Login.e-m') }}</label
							>
						</div>
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
										? $t('Login.emailEr')
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
						{{ $t('Login.emEr2') }}
					</small>
				</div>

				<div class="card">
					<h5>{{ $t('Login.password') }}</h5>
					<div class="p-inputgroup">
						<span class="p-inputgroup-addon">
							<i
								:class="{ 'p-error': v$.password.$invalid && submitted }"
								class="pi pi-lock"
							/>
						</span>
						<div class="p-float-label inp">
							<Password
								autocomplete="current-password"
								toggleMask
								id="password"
								v-model="v$.password.$model"
								:class="{ 'p-invalid': v$.password.$invalid && submitted }"
							/>
							<label
								for="password"
								:class="{ 'p-error': v$.password.$invalid && submitted }"
								>{{ $t('Login.passwd') }}</label
							>
						</div>
					</div>
					<small
						v-if="
							(v$.password.required.$invalid && submitted) ||
								v$.password.$pending.$response
						"
						class="p-error"
					>
						{{ $t('Login.passEr') }}
					</small>
					<small
						v-else-if="
							(v$.password.minLength.$invalid && submitted) ||
								v$.password.$pending.$response
						"
						class="p-error"
					>
						{{ $t('Login.passMin') }} {{ v$.password.minLength.$params.min }}
						{{ $t('Login.simbols') }}
					</small>
				</div>

				<Button type="submit" class="p-mt-2">
					<span class="p-button-label">{{ $t('Login.button') }}</span>
				</Button>
			</form>
		</div>

		<p class="center" style="marginTop: 2rem">
			{{ $t('Login.noAc') }}
			<router-link to="/register">{{ $t('Login.reg') }}</router-link>
		</p>
	</div>
</template>

<script>
import { useLoginForm } from '@/use/login-form'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

export default {
	components: { InputText, Password },
	setup() {
		const route = useRoute()
		const store = useStore()

		if (route.query.message) {
			store.commit('setMessage', {
				value: route.query.message,
				type: 'info'
			})
		}

		return {
			...useLoginForm()
		}
	}
}
</script>

<style scoped>
.inp {
	margin-top: 1.5rem;
}
</style>
