export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Forum App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/toast-service', ssr: false},
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/postcss8',
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'primevue/nuxt',
    'cookie-universal-nuxt',
    'nuxt-socket-io',
  ],

  io: {
    sockets: [
      {
        name: 'home',
        url: 'http://localhost:4000'
      }
    ]
  },

  primevue: {
    theme: 'md-light-indigo',
    ripple: true,
    components: [
      'InputText',
      'Button',
      'DataTable', 
      'Dialog',
      'Carousel',
      'TabView',
      'TabPanel'
    ],
    directives: ['Tooltip']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:4000/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    transpile: [ /primevue/ ],
    extend(config, ctx) { },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: 'http://localhost:4000/api/auth/login', method: 'post' },
          logout: { url: 'http://localhost:4000/api/auth/logout', method: 'post' },
          user: { url: 'http://localhost:4000/api/auth/user', method: 'get' }
        }
      }
    },
    redirect: false
  },
}
