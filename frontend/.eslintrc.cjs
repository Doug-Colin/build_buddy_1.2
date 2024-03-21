module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    //'plugin:import/errors',
    'plugin:import/warnings',
    //'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react-refresh'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // 'import/no-unresolved': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'off', // Disable the rule globally
    '@typescript-eslint/no-explicit-any': 'off', // Disable explicit any check temporarily
    '@typescript-eslint/ban-types': 'off', // Disable ban types check temporarily
    'react-hooks/rules-of-hooks': 'off', // Disable react hooks rules temporarily
    // eslint-disable-next-line react/display-name (errant comment found in plate-ui/toolbar)
  },
}
