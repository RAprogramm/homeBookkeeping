<template>
	<div v-if="active" class="dropdown-backdrop" @click="close" />
	<transition name="dropdown-content">
		<div
				class="dropdownMenu"
				v-if="active"
		>
			<slot />
		</div>
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

