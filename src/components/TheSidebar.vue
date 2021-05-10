<template>
	<ul class="sidenav app-sidenav testside" :class="{open: modelValue}">
		<router-link
				v-for="link in links"
				:key="link.url"
				tag="li"
				:to="link.url"
		>
			<span class="hand"></span>
			<span>{{link.title}}</span>
		</router-link>
	</ul>
</template>

<script>
import {reactive} from 'vue'

export default {
	props: ['modelValue'],
	setup() {
		const links = reactive([
			{title: 'Счет', url: '/'},
			{title: 'История', url: '/history'},
			{title: 'Планирование', url: '/planning'},
			{title: 'Новая запись', url: '/record'},
			{title: 'Категории', url: '/categories'},
		])

		return {
			links
		}
	}
}
</script>

<style>

</style>
