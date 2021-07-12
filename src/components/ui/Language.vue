<template>
	<div class="panelLang">
		<div class="langButtons">
			<Button
				v-for="lang in languages"
				type="button"
				class="p-button-raised"
				:class="[lang.code !== locale ? 'p-button-outlined' : '']"
				@click="locale = lang.code"
			>
				<img :src="lang.flag" style="width: 3.5rem; marginRight: 1rem" />
				<span class="p-ml-2 p-text-bold">{{ lang.language }}</span>
			</Button>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import RU from '@/assets/images/RU.png'
import KR from '@/assets/images/KR.png'
import EN from '@/assets/images/EN.png'
import PK from '@/assets/images/PK.png'

export default {
	components: { Button },
	setup() {
		const languages = reactive([
			{
				language: 'Русский язык',
				code: 'ru-RU',
				flag: RU
			},
			{ language: '한국어', code: 'ko-KR', flag: KR },
			{
				language: 'پاکستانی زبان',
				code: 'ur-PK',
				flag: PK
			},
			{ language: 'English', code: 'en-US', flag: EN }
		])

		return { languages, ...useI18n() }
	}
}
</script>
