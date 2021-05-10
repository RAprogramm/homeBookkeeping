<template>
	<div class="app-main-layout">

		<the-navbar @toggleSide="isOpen = !isOpen"/>
		<the-sidebar v-model="isOpen"/>

		<main class="app-content" :class="{full: !isOpen}">
			<div class="app-page">
				<router-view />
			</div>
		</main>

		<div class="fixed-action-btn btn-add">
			<router-link class="btn-floating btn-large  btn-add blue" to="/record">
				<i class="large material-icons btn-add">+</i>
			</router-link>
		</div>

	</div>
</template>

<script>
import {ref} from 'vue'
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'

export default {
	components: {TheNavbar, TheSidebar},
	setup() {
		const isOpen = ref(true)

		return {
			isOpen
		}
	}
}
</script>

<style>

</style>
