<template>
	<form class="card auth-card" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия | registration</span>
			<div class="input-field">
				<input
						id="name"
						type="text"
						v-model="name"
						autocomplete="username"
						@blur="nBlur"
						placeholder="Имя"
						>
						<small v-if="nError" class="helper-text invalid">{{nError}}</small>
			</div>
			<div class="input-field">
				<input
					id="email"
					type="email"
					v-model="email"
					autocomplete="email"
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
						<small v-if="pError" class="helper-text invalid">{{pError}}</small>
			</div>
			<p>
			<label>
				<input 
					type="checkbox" 
					v-model="agree"
					@blur="aBlur"
				/>
				<span>С правилами согласен</span>
			</label>
			</p>
						<small v-if="aError" class="helper-text invalid">{{aError}}</small>
		</div>
		<div class="card-action">
			<div>
				<button
					:disabled="isSubmitting"
						class="btn waves-effect waves-light auth-submit"
						type="submit"
						>
						Зарегистрироваться
						<i class="material-icons right">✓</i>
				</button>
			</div>

			<p class="center">
			Уже есть аккаунт?
			<router-link to="/login">Войти!</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import {useRegisterForm} from '@/use/register-form'
import {error} from '@/utils/error'

export default {
	setup() {
		return {...useRegisterForm()}
	}
}
</script>

<style>

</style>
