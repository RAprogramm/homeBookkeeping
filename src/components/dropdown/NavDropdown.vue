<template>
	<div @click="dropdown = !dropdown">
		<slot name="toggler">
		<button class="dropdownBtn"><strong>{{name}}</strong> {{dropdown ? '▲' : '▼'}}</button>
		</slot>
		<slot />
	</div>
</template>

<script>
import {ref, provide, computed} from 'vue'
import {useStore} from 'vuex'

export default {
	setup() {
		const store = useStore()
		const dropdown = ref(false)
		const name = computed(() => store.getters['user/info'].name)

		provide('dropdown', dropdown)

		return {
			name,
			dropdown
		}
	}
}
</script>
