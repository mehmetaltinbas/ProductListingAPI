import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    {
        rules: {
            eqeqeq: 'error', // enforce === instead of ==
            'no-console': 'warn', // warn on console.log usage
            'no-debugger': 'error', // disallow debugger statements
            'no-unused-vars': 'off', // disable JS version; use TS version instead
            curly: 'error', // require braces for all control statements
            'no-undef': 'error', // disallow use of undeclared variables
            'no-redeclare': 'error', // disallow variable redeclaration
            'no-unreachable': 'error', // disallow unreachable code after return/throw
            semi: ['error', 'always'], // require semicolons
            quotes: ['warn', 'single'], // enforce single quotes for strings
            indent: ['off', 4], // enforce 4-space indentation
            'comma-dangle': ['off', 'never'], // require trailing commas in multiline
            '@typescript-eslint/no-unused-vars': ['off'], // TS-aware unused vars check
            '@typescript-eslint/no-explicit-any': 'warn', // warn on use of `any` type
            '@typescript-eslint/explicit-function-return-type': 'warn', // suggest explicit return types
            '@typescript-eslint/no-inferrable-types': 'warn', // warn on redundant type annotations
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // enforce interfaces for object types
            '@typescript-eslint/ban-ts-comment': 'warn', // warn on disabling TS checks with comments
        },
    },
]);
