module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Imports do React e React Native em primeiro.
          ['^react', '^react-native'],
          ['^\\u0000$'],
          // Imports de libs externas.
          ['^@?\\w'],
          ['^\\u0000$'],
          // Imports das pastas do projeto.
          ['^@screens', '^@routes', '^@assets', '^@models', '^@contexts', '^@services'],
          ['^\\u0000$'],
          // Imports de icones da lib lucide-react-native.
          ['^lucide-react-native'],
          ['^\\u0000$'],
          // Imports da pasta @theme.
          ['^@theme'],
          ['^\\u0000$'],
          // Imports dos componentes de @components.
          ['^@components']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  }
}
