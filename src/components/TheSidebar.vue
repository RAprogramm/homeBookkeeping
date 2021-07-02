<template>
	<div class="p-grid p-flex-column" >
		<router-link
				v-for="link in links"
				:key="link.url"
				tag="div"
				:to="link.url"
		>
			<span class="hand"></span>
			<span class="p-col">{{link.title}}</span>
		</router-link>
	</div>
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
