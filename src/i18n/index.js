import { createI18n } from 'vue-i18n'

const loadLocaleMessages = () => {
  const locales = require.context('@/i18n/locales', true, /[\w-]+\.json$/i)
  return locales.keys().reduce(
    (locs, loc) => ({
      ...locs,
      [loc.replace(/\.|\/|json/g, '')]: locales(loc)
    }),
    {}
  )
}

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages()
})
