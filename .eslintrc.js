module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest": true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: [
    'react', 'jest'
  ],
  rules: {
  }
}
