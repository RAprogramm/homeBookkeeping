<template>
	<div class="page-title">
		<div class="title">
			<h1>{{title}}</h1>
			<slot name="header" />
		</div>

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

<style scoped>
.page-title {
	padding-bottom:1rem;
	border-bottom:solid 1px rgba(51,51,51,.12)
}
.title {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style>
