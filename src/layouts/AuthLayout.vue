<template>
	<div class="auth-layout">
		<auth-language />
		<router-view v-slot="{ Component, route }">
			<transition :name="route.meta.transition || 'fade'" mode="out-in">
				<component :is="Component" :key="route.path" />
			</transition>
		</router-view>
	</div>
</template>

<script>
import AuthLanguage from '@/components/ui/AuthLanguage'

export default {
	components: { AuthLanguage }
}
</script>

<style scoped>
.auth-layout {
	margin-top: auto;
	margin-bottom: auto;
}
</style>
