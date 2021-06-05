import colors from 'vuetify/es5/util/colors'

export default {
    ssr: true,
    target: 'server',
    publicRuntimeConfig: {
        axios: {
            browserBaseURL:
                process.env.BROWSER_BASE_URL || 'http://0.0.0.0:8000',
            proxyHeaders: false,
            credentials: false,
        },
    },
    privateRuntimeConfig: {
        axios: {
            baseURL: process.env.BASE_URL || 'http://app:8000',
            proxyHeaders: false,
            credentials: false,
        },
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - mineralogy.rocks',
        title: 'mineralogy.rocks',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'an open-access resource for accessing the mineralogical data',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap',
            },
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
            },
        ],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['~/assets/global.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/axios',
        { src: '~plugins/leaflet.js', ssr: false },
        '~/plugins/commonMixins.js',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/svg',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: ['@nuxtjs/axios'],

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        // optionsPath: './vuetify.options.js',
        treeShake: {
            loaderOptions: {
                registerStylesSSR: true,
                progressiveImages: true,
            },
        },
        defaultAssets: {
            font: {
                family: 'IBM Plex Mono',
            },
            icons: 'mdi',
        },
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            options: {
                customProperties: true,
            },
            themes: {
                light: {
                    background: colors.lightBlue.darken4,
                    primary: colors.green.darken4,
                    secondary: colors.amber.lighten4,
                    accent: colors.shades.black,
                    error: colors.red.accent3,
                    info: colors.grey.lighten5,
                    nav: colors.blueGrey.darken4,
                    ns_chip: colors.teal.lighten2,
                    status_chip: colors.blue.lighten1,
                    on_hover: colors.blueGrey.lighten4,
                    nav_background: colors.blueGrey.darken4,
                    card_background: colors.grey.lighten2,
                    nav_text: colors.orange.lighten5,
                    font1: colors.orange.lighten5,
                },
                dark: {
                    background: colors.cyan.darken4,
                    primary: colors.cyan.darken4,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.lighten5,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    ns_chip: colors.teal.darken2,
                    status_chip: colors.blue.darken1,
                    on_hover: colors.blueGrey.lighten4,
                    nav_background: colors.blueGrey.darken4,
                    card_background: colors.grey.lighten2,
                    nav_text: colors.orange.lighten5,
                    font1: colors.orange.lighten5,
                },
            },
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        loaders: {
            vueStyle: { manualInject: true },
        },
    },
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0', // default: localhost
    },
}
