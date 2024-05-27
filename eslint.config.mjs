import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJS from '@stylistic/eslint-plugin-js'


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJS
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        4
      ],
      '@stylistic/js/linebreak-style': [
          'error',
          'unix'
      ],
      '@stylistic/js/quotes': [
          'error',
          'single'
      ],
      '@stylistic/js/semi': [
          'error',
          'never'
      ],
    },
    ignores: ["dist/*"]
  }
];