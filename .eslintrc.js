module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: [],
  globals: {
    test: 'readonly',
    expect: 'readonly',
    it: 'readonly',
    describe: 'readonly',
    jest: 'readonly',
  },
  rules: {
    'comma-dangle': ['warn', 'only-multiline'],
    'no-unused-vars': 'warn',
    'no-console': 1,
    'no-alert': 1,
    'no-shadow': 1,
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
