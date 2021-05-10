<template>
	<form class="card auth-card" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия</span>
			<div class="input-field" >
				<input
					id="email"
					type="email"
					v-model="email"
					autocomplete="username"
					@blur="eBlur"
					placeholder="Email"
				>
				<small class="helper-text invalid" v-if="eError">{{eError}}</small>
			</div>
			<div class="input-field">
				<input
					id="password"
					type="password"
					v-model="password"
					autocomplete="current-password"
					@blur="pBlur"
					placeholder="Пароль"
				>
				<small class="helper-text invalid" v-if="pError">{{pError}}</small>
			</div>
		</div>

		<p class="helper-text invalid center" v-if="isTooManyAttempts">You are trying to log in too often. Try later...</p>

		<div class="card-action">
			<div>
				<button
					:disabled="isSubmitting || isTooManyAttempts"
					class="btn auth-submit"
					type="submit"
				>Войти</button>
			</div>

			<p class="center">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import {useLoginForm} from '@/use/login-form'
import {error} from '@/utils/error'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default {
	setup() {
		const route = useRoute()

		if (route.query.message) {
			store.dispatch('setMessage', {
				value: error(route.query.message),
				type: 'warning'
			})
		}


		return {
			...useLoginForm()
		}
	}
}
</script>

<style>

</style>
