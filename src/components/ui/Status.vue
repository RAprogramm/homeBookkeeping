<template>
	<span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

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
		const { t } = useI18n()

		const classesMap = {
			income: 'primary',
			outcome: 'danger'
		}

		const textMap = {
			income: t('History.Chart.income'),
			outcome: t('History.Chart.outcome')
		}

		watch(props, (val) => {
			className.value = classesMap[val.type]
			text.value = textMap[val.type]
		})

		const className = ref(classesMap[props.type])
		const text = ref(textMap[props.type])

		return { className, text }
	}
}
</script>

<style></style>
