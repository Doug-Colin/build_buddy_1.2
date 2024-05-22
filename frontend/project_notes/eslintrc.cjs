/* ------- 

This is the version of eslintrc.cjs that first resolved the 'unable to resolve paths' eslint flag  issues. 
I gradually commented out the different solutions/reccomendations I found online until I found what was key to resolving that
Turned out fo be having 'import-resolver-alias' in the plugins array of eslint config.

If any other linting path resolution issues arise, during build or otherwise, try this version of the eslint config to see if it fixes anything.  
------- */  

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
      'import',
      'import-resolver-alias',
      'import-resolver-typescript',
      'react-refresh',
    ],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }