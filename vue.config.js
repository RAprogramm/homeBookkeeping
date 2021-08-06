module.exports = {
    runtimeCompiler: true,
    publicPath: './',

    // configureWebpack: {
    //   resolve: {
    //     alias: {
    //       'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    //     }
    //   }
    // },
    pluginOptions: {
		i18n: {
			locale: 'ru',
			fallbackLocale: 'en',
			localeDir: 'i18n/locales',
			enableLegacy: false,
			runtimeOnly: false,
			compositionOnly: true,
			fullInstall: true
		}
	},

    chainWebpack: (config) => {
		config.module
			.rule('i18n')
			.resourceQuery(/blockType=i18n/)
			.type('javascript/auto')
			.use('i18n')
			.loader('@intlify/vue-i18n-loader')
	},

    pwa: {
      name: 'HomeBookkeeping'
    }
}
