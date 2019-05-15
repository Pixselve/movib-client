const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,700' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@/assets/global.scss', '@/static/fontawesome/css/all.min.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/index.js', '~/plugins/directives.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources',
    'nuxt-fullpage.js'
  ],
  styleResources: {
    // your settings here
    scss: ['@/assets/var.scss']
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'https://movib-back-aowvt3qvvq-uc.a.run.app/api/1'
  },
  manifest: {
    name: 'Movib - C\'est plus qu\'un simple film.',
    short_name: 'Movib',
    start_url: '/',
    description: 'Découvrez et répertoriez de nouveaux films tous les jours',
    background_color: '#fff',
    lang: 'fr'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/login', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', propertyName: '' },
          logout: { url: '/user/logout', method: 'post' },
          tokenRequired: true,
          resetOnError: true,
          tokenType: 'Bearer'
        }
      }
    },
    redirect: {
      login: '/signin',
      home: '/',
      callback: '/signin',
      logout: '/signin'
    },
    rewriteRedirects: true
  },
  router: {
    middleware: 'auth'
  },
  toast: {
    position: 'bottom-center',
    duration: 5000
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
