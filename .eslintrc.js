module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
