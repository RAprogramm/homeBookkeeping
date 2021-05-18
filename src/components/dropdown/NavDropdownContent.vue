<template>
	<div v-if="active" class="dropdown-backdrop" @click="close" />
	<transition name="dropdown-content">
		<ul
				class="dropdownMenu"
				v-if="active"
		>
			<slot />
		</ul>
	</transition>
</template>

<script>
import {computed, inject} from 'vue'

export default {
	setup() {
		const dropdown = inject('dropdown')

		return {
			active: computed(() => dropdown.value)
		}
	}
}
</script>

<style>

</style>

