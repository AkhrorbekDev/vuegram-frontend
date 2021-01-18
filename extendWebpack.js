const path = require('path');
const eslint = require('eslint');

const configChunks = {
  aliases: {
    common: {
      '@': path.resolve(__dirname, 'src'),
      ...(process.env.NODE_ENV === 'production'),
    },
    getFinal(target) {
      return { ...this.common, ...(this[target] || {}) };
    },
  },

  loaders: {
    common: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: eslint.CLIEngine.getFormatter('stylish'),
        },
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        use: ['@intlify/vue-i18n-loader', 'yaml-loader'],
      },
    ],

    getFinal(target) {
      return [...this.common, ...(this[target] || [])];
    },
  },
};

module.exports = (target) => (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    ...configChunks.aliases.getFinal(target),
  };

  config.module.rules.push(...configChunks.loaders.getFinal(target));

  return config;
};
