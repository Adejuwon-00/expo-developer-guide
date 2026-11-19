const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/**', 'coverage/**'] },
  {
    files: ['jest.setup.js', '__tests__/**/*.tsx'],
    languageOptions: {
      globals: { jest: 'readonly', test: 'readonly', expect: 'readonly' },
    },
  },
]);
