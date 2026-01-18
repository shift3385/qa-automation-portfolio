import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      // TypeScript Style Guide Implementation
      
      // 1. Language Features
      'no-var': 'error', // Always use const or let
      'prefer-const': 'error', // Use const by default
      'eqeqeq': ['error', 'always'], // Always use ===
      
      // Strings: Use single quotes
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      
      // ASI: Explicitly end all statements with a semicolon
      'semi': ['error', 'always'],

      // 2. Disallowed Features
      '@typescript-eslint/no-explicit-any': 'warn', // Avoid any
      'no-new-wrappers': 'error', // Do not instantiate String, Boolean, Number
      'no-eval': 'error',
      
      // 4. Type System
      '@typescript-eslint/no-wrapper-object-types': 'error', // Replaces ban-types for Object/String/etc in newer versions or use ban-types
      
      // General
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    },
  },
  {
    ignores: ['playwright.config.ts', 'dist/', 'node_modules/'],
  }
];
