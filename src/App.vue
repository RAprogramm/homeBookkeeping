<template>
	<Toast />
	<component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useToast } from 'primevue/usetoast'

export default {
	components: { MainLayout, AuthLayout },
	setup() {
		const route = useRoute()
		const store = useStore()
		const toast = useToast()
		const TITLE_MAP = reactive({
			success: 'Успех!',
			error: 'Ошибка!',
			warn: 'Внимание!',
			info: 'Информация'
		})
		const message = computed(() => store.state.message)
		const title = computed(() =>
			message.value ? TITLE_MAP[message.value.type] : null
		)
		const showToast = () => {
			toast.add({
				severity: message.value.type,
				summary: title,
				detail: message.value.value,
				life: 5000
			})
		}
		watch(message, (val) => {
			showToast()
		})

		return {
			layout: computed(() => route.meta.layout)
		}
	}
}
</script>

<style></style>
