const { FlatCompat } = require("@eslint/eslintrc");
const next = require("eslint-config-next");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintrc = require("./.eslintrc.json");
const { extends: eslintrcExtends = [], ...eslintrcRest } = eslintrc;

const extendsWithoutNext = eslintrcExtends.filter((name) => name !== "next/core-web-vitals");

module.exports = [
  ...next,
  ...compat.extends(...extendsWithoutNext),
  ...compat.config(eslintrcRest),
  { ignores: [".next/**", "node_modules/**"] },
];
