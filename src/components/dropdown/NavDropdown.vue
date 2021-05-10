<template>
	<div @click="dropdown = !dropdown">
		<slot name="toggler">
			<button class="dropdownBtn">Dropdown {{dropdown ? '▲' : '▼'}}</button>
		</slot>
		<slot />
	</div>
</template>

<script>
import {ref, provide} from 'vue'

export default {
	setup() {
		const dropdown = ref(false)

		provide('dropdown', dropdown)

		return {
			dropdown
		}
	}
}
</script>
