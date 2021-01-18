const extendWebpack = require('./extendWebpack');

module.exports = function (/* ctx */) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    boot: [
      'i18n',
      'axios',
      'json-printer',
      'vue-clamp',
      'async-computed',
    ],

    css: [
      'app.scss',
    ],

    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      extendWebpack: extendWebpack('quasar'),

      // transpile: false,
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // extractCSS: false,

    },

    devServer: {
      https: false,
      port: 2000,
      open: true,
    },

    framework: {
      importStrategy: 'all',
      plugins: [],
      config: {},
      iconSet: 'material-icons', // Quasar icon set
      cssAddon: true,
      lang: 'ru', // Quasar language pack
    },
    animations: 'all',

    ssr: {
      pwa: false,
    },

    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'vue-gram',
        short_name: 'vue-gram',
        description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/favicon-16x16.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-32x32.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-96x96.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
        ],
      },
    },

    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        appId: 'vue-gram',
      },

      nodeIntegration: true,
    },
  };
};
