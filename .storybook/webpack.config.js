const path = require("path");

const postcssOptions = {
  config: {
    path: './.storybook/',
  },
};

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.stylus$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: postcssOptions,
      },
      'stylus-loader',
    ]
  });

  defaultConfig.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: postcssOptions,
      },
      'stylus-loader',
    ]
  });

  defaultConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ],
  });

  defaultConfig.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader'
  });

  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    '\/imports': path.resolve(__dirname, '../imports'),
    'imports': path.resolve(__dirname, '../imports'),
  };

  return defaultConfig;
};
