module.exports = {
  /*
  ** Server
  */  
  server: {
    host: 'localhost',
    port: 3000
  },

  /*
  ** Mode
  */   
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'xChat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'minimal-ui, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { charset: 'utf-8' },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'description', name: 'description', content: 'A Firebase + Nuxt.js Chat App' },
      { hid: 'keywords', name: 'keywords', content: 'firebase, nuxt, chat, app' }  
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ] 
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/fonts/fontawesome/css/all.min.css', lang: 'css' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/store.js',
    '~/plugins/googleAuth.js'      
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'nuxt-fire',
      {
        useOnly: ['auth', 'firestore'],
        config: {
          development: {
            apiKey: 'AIzaSyDI_XZn-fyMvU2o2v906BTyBQr3gY7_xSk',
            authDomain: 'xchat-89559.firebaseapp.com',
            databaseURL: 'https://xchat-89559.firebaseio.com',
            projectId: 'xchat-89559',
            storageBucket: 'xchat-89559.appspot.com',
            messagingSenderId: '583829962388'
          },
          production: {
            apiKey: 'AIzaSyDI_XZn-fyMvU2o2v906BTyBQr3gY7_xSk',
            authDomain: 'xchat-89559.firebaseapp.com',
            databaseURL: 'https://xchat-89559.firebaseio.com',
            projectId: 'xchat-89559',
            storageBucket: 'xchat-89559.appspot.com',
            messagingSenderId: '583829962388'
          }
        }
      }
    ]
  ],
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  } 
}
