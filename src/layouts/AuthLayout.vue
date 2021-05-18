<template>
	<div class="grey darken-1 auth-layout">
			<message />
		<router-view />
	</div>
</template>

<script>
import Message from '@/components/ui/Message'

export default {
	components: {Message}
}
</script>

<style>

</style>
