<template>
	<Toast position="bottom-center" />
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

export default {
	setup() {
		const { t } = useI18n()
		const store = useStore()
		const toast = useToast()
		const toCompute = (wordLink) => {
			return computed(() => t(wordLink))
		}
		const TITLE_MAP = reactive({
			success: toCompute('Toast.success'),
			error: toCompute('Toast.error'),
			warn: toCompute('Toast.warn'),
			info: toCompute('Toast.info')
		})
		const INFO_CODES = reactive({
			auth: toCompute('Errors.auth'),
			logout: toCompute('Errors.logout'),
			loged: toCompute('Toast.logedIn'),
			createCat: toCompute('Toast.createCat'),
			updateCat: toCompute('Toast.updateCat'),
			createRec: toCompute('Toast.createRec'),
			createUser: toCompute('Toast.createUser'),
			updateInfo: toCompute('Toast.updateInfo')
		})
		const message = computed(() => store.state.message)
		const title = computed(() =>
			message.value ? TITLE_MAP[message.value.type] : null
		)
		const text = computed(() =>
			INFO_CODES[message.value.value]
				? INFO_CODES[message.value.value]
				: message.value.value
		)
		const showToast = () => {
			toast.add({
				severity: message.value.type,
				summary: title,
				detail: text,
				life: 5000
			})
		}
		watch(message, (val) => {
			showToast()
		})
	}
}
</script>

<style></style>
