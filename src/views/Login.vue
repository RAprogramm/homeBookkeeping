<template>
	<div class="auth-page authCard">
		<h1 style="marginBottom: 4rem">Домашняя бухгалтерия</h1>
		<div class="authForm">
			<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

				<div class="card">
					<h5>Введите адрес электронной почты</h5>
					<div class="p-float-label inp">
						<InputText 
							 autocomplete="current-email"
							 id="email"
							 v-model="v$.email.$model"
							 aria-describedby="email-error"
							 :class="{'p-invalid':v$.email.$invalid && submitted}"
						/>
						<label for="email" :class="{'p-error':v$.email.$invalid && submitted}">E-mail</label>
					</div>
					<span v-if="v$.email.$error && submitted">
						<span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
							<small class="p-error">
								{{error.$message = 'Value is not a valid email address' 
									? 'Введите корректный адрес электронной почты' 
									: error.$message
								}}
							</small>
						</span>
					</span>
					<small 
						v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" 
						class="p-error"
					>
						Необходимо ввести адрес электронной почты
					</small>
				</div>

				<div class="card">
					<h5>Введите пароль</h5>
					<div class="p-float-label inp">
						<Password 
							 autocomplete="current-password"
							 toggleMask
							 id="password"
							 v-model="v$.password.$model"
							 :class="{'p-invalid':v$.password.$invalid && submitted}"
						/>
						<label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Пароль</label>
					</div>
					<small 
						v-if="(v$.password.required.$invalid && submitted) || v$.password.$pending.$response" 
						class="p-error"
					>
						Необходимо ввести пароль
					</small>
					<small 
						v-else-if="(v$.password.minLength.$invalid && submitted) || v$.password.$pending.$response" 
						class="p-error"
					>
						Пароль должен состоять минимум из {{v$.password.minLength.$params.min}} символов
					</small>
				</div>

				<Button type="submit" label="Войти в систему" class="p-mt-2" />
			</form>
		</div>

				<p class="center" style="marginTop: 2rem">
					Нет аккаунта?
					<router-link to="/register">Зарегистрироваться</router-link>
				</p>
	</div>
</template>

<script>
import {useLoginForm} from '@/use/login-form'
import {error} from '@/utils/error'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

export default {
	components: {InputText, Password},
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
			...useLoginForm()
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
	padding-top: .5rem;
	border-radius: 1rem;
	padding-bottom: .5rem;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
	padding-left: 1rem;
	padding-right: 1rem;
	background-color: #f1f1f1;
}
</style>
