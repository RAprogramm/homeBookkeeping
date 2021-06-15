<template>
	<Loader v-if="loading"/>
	<div class="app-main-layout" v-else>

			<message />
		<the-navbar @toggleSide="isOpen = !isOpen"/>
		<the-sidebar v-model="isOpen"/>

		<main class="app-content" :class="{full: !isOpen}">
			<div class="app-page">
				<router-view />
			</div>
		</main>

		<div class="fixed-action-btn btn-add">
			<router-link 
				class="btn-floating btn-large  btn-add blue" 
				to="/record" 
				style="position: initial"
				v-tooltip="'Create a new record'">
				<i class="large material-icons btn-add">+</i>
			</router-link>
		</div>

	</div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'
import Message from '@/components/ui/Message'
import Loader from '@/components/ui/Loader'

export default {
	components: {TheNavbar, TheSidebar, Message, Loader},
	setup() {
		const store =useStore()
		const isOpen = ref(true)
		const loading = ref(true)

		onMounted(async() => {
			if (!Object.keys(store.getters['user/info']).lenght) {
				await store.dispatch('user/getAuthUser')
			}
			loading.value = false
		})
		return {
			isOpen,
			loading
		}
	}
}
</script>

<style>

</style>
