<template>
	<span :class="['badge', className]">{{text}}</span>
</template>

<script>
import {ref, watch} from 'vue'

export default {
	props: {
		type: {
			type: String,
			required: true,
			validator(value) {
				return ['income', 'outcome'].includes(value)
			}
		}
	},
	setup(props) {
		const classesMap = {
			income: 'primary',
			outcome: 'danger',
		}

		const textMap = {
			income: 'Доход',
			outcome: 'Расход',
		}

		watch(props, val => {
			className.value = classesMap[val.type]
			text.value = textMap[val.type]
		})

		const className = ref(classesMap[props.type])
		const text = ref(textMap[props.type])

		return {className, text}
	}
}
</script>

<style>

</style>
