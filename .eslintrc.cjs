module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-hooks', 'jsx-a11y', 'react-refresh', 'prettier', 'eslint-plugin-no-inline-styles'],
  rules: {
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'jsx-a11y/alt-text': ['error', { elements: ['img'] }],
    'jsx-a11y/aria-role': ['error', { allowedInvalidRoles: ['text'], ignoreNonDOM: true }],
    'jsx-a11y/img-redundant-alt': ['error', { elements: ['img'], words: ['image', 'photo', 'picture'] }],
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-redundant-roles': ['error', { nav: ['navigation'] }],
    'no-empty-function': 'off',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-implied-eval': 'error',
    'no-inline-styles/no-inline-styles': 2,
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-underscore-dangle': ['error', { enforceInMethodNames: true }],
    'prefer-arrow-callback': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    quotes: ['error', 'single', { avoidEscape: true }],
    eqeqeq: 'error',
    radix: 'error',
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        endOfLine: 'auto',
        bracketSameLine: false,
        singleAttributePerLine: true,
        jsxSingleQuote: false,
        proseWrap: 'always',
        quoteProps: 'as-needed',
        useTabs: false,
        bracketSpacing: true,
        arrowParens: 'always',
        plugins: ['@trivago/prettier-plugin-sort-imports'],
        importOrder: [
          '^react(.*)$',
          '<THIRD_PARTY_MODULES>',
          '^@/components(.*)$',
          '^@/pages(.*)$',
          '^@/(assets|config|constants|hooks|routes|stores|styled|theme|types|utils)(.*)$',
          '^@/(.*)$',
          '^[./]',
        ],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        importOrderCaseInsensitive: true,
        importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
      },
    ],
  },
};
