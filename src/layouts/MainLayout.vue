<template>
	<ProgressSpinner v-if="loading" />
	<div v-else class="app-main-layout">
		<TheNavbar @showSidebar="openSidebar" />
		<TheSidebar ref="sidebar" />
		<router-view v-slot="{ Component, route }">
			<transition :name="route.meta.transition || 'fade'" appear mode="out-in">
				<div class="app-page">
					<component :is="Component" :key="route.path" />
					<hr style="borderTop: rgba(51, 51, 51, 0.12)" />
				</div>
			</transition>
		</router-view>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProgressSpinner from 'primevue/progressspinner'
import TheSidebar from '@/components/TheSidebar'
import TheNavbar from '@/components/navbar/TheNavbar'

export default {
	components: { ProgressSpinner, TheSidebar, TheNavbar },
	setup() {
		const store = useStore()
		const loading = ref(true)
		const sidebar = ref(null)

		const openSidebar = () => {
			sidebar.value.visibleLeft = true
		}

		onMounted(async () => {
			if (!Object.keys(store.getters['user/info']).lenght) {
				await store.dispatch('user/getAuthUser')
			}
			loading.value = false
		})

		return {
			loading,
			openSidebar,
			sidebar
		}
	}
}
</script>
