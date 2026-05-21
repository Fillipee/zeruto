import tailwindcss from '@tailwindcss/vite';

const siteUrl = 'https://zeruto.cz';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxtjs/color-mode',
		'@nuxtjs/sitemap',
		'@nuxtjs/mdc',
		'@nuxt/image',
	],

	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	devtools: { enabled: true },

	app: {
		head: {
			htmlAttrs: {
				lang: 'cs',
			},
		},
	},

	css: ['./app/assets/css/main.css'],

	site: {
		url: siteUrl,
		name: 'Žeru to',
	},

	colorMode: {
		preference: 'system',
		fallback: 'light',
		dataValue: 'theme',
	},

	runtimeConfig: {
		public: {
			siteUrl: siteUrl,
		},
	},
	compatibilityDate: '2025-07-15',

	vite: {
		plugins: [tailwindcss()],
	},
	typescript: {
		typeCheck: true,
	},

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
		checker: {
			eslintPath: 'eslint',
		},
	},

	fonts: {
		families: [
			{
				name: 'Public Sans',
				provider: 'google',
				weights: ['300', '400', '600', '700', '900'],
			},
			{
				name: 'Inter',
				provider: 'google',
				weights: ['300', '400', '600', '700', '900'],
			},
		],
	},

	sitemap: {
		urls: ['/'],
		xsl: false,
	},
});
