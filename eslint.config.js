import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import globals from "globals";
import pluginJs from "@eslint/js";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";
import jslint from '@eslint/js';

export default [
    pluginJs.configs.recommended,
    ...jslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    eslintConfigPrettier,

    {
        files: ["src/**/*.js", "src/**/*.vue"],
        ignores: ["**/*.config.js", "!**/eslint.config.js"],
        rules: {
            semi: "error",
            "prefer-const": "error",
            "prettier/prettier": "error"
        },
        plugins: [prettier],
        languageOptions: {
            globals: globals.browser,
            parser: vueParser,
        },
    },
];
