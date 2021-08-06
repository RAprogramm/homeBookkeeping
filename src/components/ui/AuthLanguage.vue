<template>
	<div class="panelLang">
		<div class="langButtons">
			<Button
				v-for="lang in languages"
				type="button"
				class="p-button-raised"
				:class="[lang.code !== $i18n.locale ? 'p-button-outlined' : '']"
				@click="setLang(lang.code)"
			>
				<img :src="lang.flag" style="width: 3.5rem; marginRight: 1rem" />
				<span class="p-ml-2 p-text-bold">{{ lang.language }}</span>
			</Button>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import RU from '@/assets/images/RU.png'
import KR from '@/assets/images/KR.png'
import EN from '@/assets/images/EN.png'
import PK from '@/assets/images/PK.png'

export default {
	setup() {
		const i18n = useI18n()
		const store = useStore()
		const languages = reactive([
			{
				language: 'Русский язык',
				code: 'ru',
				flag: RU
			},
			{ language: '한국어', code: 'ko', flag: KR },
			{
				language: 'پاکستانی زبان',
				code: 'ur',
				flag: PK
			},
			{ language: 'English', code: 'en', flag: EN }
		])
		const setLang = (value) => {
			i18n.locale.value = value
			store.commit('setLanguage', value)
		}

		return { languages, setLang }
	}
}
</script>
