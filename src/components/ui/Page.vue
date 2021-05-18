<template>
	<div class="page-title">
		<h1 class="title">
			{{title}}
			<slot name="header" />
		</h1>

		<slot />
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}
	},
	setup(props) {
		document.title = `${props.title} | Домашняя бухгалтерия`
	}
}
</script>

<style>

</style>
