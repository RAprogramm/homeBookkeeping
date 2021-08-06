import { nextTick, computed } from 'vue'
import store from '@/store'
import { createI18n } from 'vue-i18n'

const lang = computed(() => store.getters['getLanguage'])

export function setupI18n(
  options = { locale: lang.value || process.env.VUE_APP_I18N_LOCALE }
) {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale)
  return i18n
}

export function setI18nLanguage(i18n, locale) {
  i18n.global.locale.value = lang.value || locale
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
  const messages = await import(`@/i18n/locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}
