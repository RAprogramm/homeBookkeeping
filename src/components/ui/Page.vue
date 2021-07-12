<template>
	<div class="page-title">
		<div class="title">
			<h1 ref="pageTitle">
				<slot name="title" />
			</h1>
			<slot name="header" />
		</div>

		<slot />
	</div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
	setup() {
		const i18n = useI18n()
		const pageTitle = ref(null)
		watchEffect(
			() => {
				document.title = `${pageTitle.value.textContent} | ${i18n.t('Page.mainTitle')}`
			},
			{
				flush: 'post'
			}
		)
		return { pageTitle }
	}
}
</script>

<style scoped>
.page-title {
	padding-bottom: 1rem;
	border-bottom: solid 1px rgba(51, 51, 51, 0.12);
}
.title {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style>
