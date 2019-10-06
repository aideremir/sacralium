module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "@meteorjs/eslint-config-meteor",
    "plugin:vue/recommended"
  ],
  "settings": {
    "import/resolver": {
      "meteor": {
        "extensions": [
          ".js",
          ".vue",
          ".styl",
        ],
      },
    },
  },
  "overrides": [
    {
      "files": "*.story.js",
      "rules": {
        "no-underscore-dangle": ["error", { "allow": ["__docs"] }],
      }
    }
  ]
};