<template>
	<div class="auth-layout">
		<Language />
		<router-view />
	</div>
</template>

<script>
import Language from '@/components/ui/Language'

export default {
	components: { Language }
}
</script>

<style scoped>
.auth-layout {
	margin-top: auto;
	margin-bottom: auto;
}
</style>
