---
title: "Introduction"
---

<h1 align="center">stylelint-plugin-stylus</h1>

<p align="center"><a href="https://stylelint.io/" alt="stylelint">stylelint</a> plugin for <a href="https://stylus-lang.com/" alt="Stylus">Stylus</a>.

<p align="center"><b><i>This plugin is still in an experimental state</i></b></p>

<p align="center">
  <a href="https://www.npmjs.com/package/stylelint-plugin-stylus">
    <img src="https://img.shields.io/npm/l/stylelint-plugin-stylus.svg" alt="NPM license">
  </a>
  <a href="https://www.npmjs.com/package/stylelint-plugin-stylus">
    <img src="https://img.shields.io/npm/v/stylelint-plugin-stylus.svg" alt="NPM version">
  </a>
  <a href="https://www.npmjs.com/package/stylelint-plugin-stylus">
    <img src="https://img.shields.io/npm/dw/stylelint-plugin-stylus.svg" alt="NPM downloads">
  </a>
  <a href="https://github.com/ota-meshi/stylelint-plugin-stylus/actions?query=workflow%3ACI">
    <img src="https://github.com/ota-meshi/stylelint-plugin-stylus/workflows/CI/badge.svg?branch=master" alt="Build Status">
  </a>
</p>
<br>

## :name_badge: Introduction

[stylelint] plugin for [Stylus].

This plugin allows us to check the [Stylus] with [stylelint].

- Finds the many wrong use of selector, declaration, at-rule and more using the rules of [stylelint].
- Finds the violations in coding style for [Stylus].

[stylelint editor integrations](https://stylelint.io/user-guide/integrations/editor) are useful to check your code in real-time.

You can check on the [Online DEMO](./playground/).

## :cd: Installation

Via [npm]:

```bash
npm install --save-dev stylelint stylelint-plugin-stylus
```

## :book: Usage

`stylelint-plugin-stylus` is a plugin for [stylelint], so it is for use with [stylelint].  
If you are not using [stylelint], start by using [stylelint].

### Custom Syntax

Set [custom syntax](https://stylelint.io/user-guide/usage/options#customsyntax) for parsing [Stylus]. With the following setting, `.styl` and `<style lang="stylus">` are parsed by [postcss-styl].

- via CLI

    ```bash
    stylelint ... --custom-syntax stylelint-plugin-stylus/custom-syntax.js
    ```

- with [VSCode extension]

    ```js
    {
    "stylelint.customSyntax": "stylelint-plugin-stylus/custom-syntax.js",
    "stylelint.validate": [
        ...,
        // ↓ Add "stylus" language.
        "stylus"
    ]
    }
     ```

### Configuration

Use `.stylelintrc.*` or `stylelint.config.js` file to configure rules. See also: [https://stylelint.io/user-guide/configure](https://stylelint.io/user-guide/configure).

Example **stylelint.config.js**:

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // "stylelint-config-standard",
    "stylelint-plugin-stylus/standard"
  ],
  rules: {
    // override/add rules settings here, such as:
    // "stylus/declaration-colon": "never"
  }
}
```

If you want to set all the rules yourself, set as follows.

```js
module.exports = {
  plugins: [
    // add this plugin here:
    "stylelint-plugin-stylus"
  ],
  rules: {
    // add rules settings here, such as:
    "stylus/declaration-colon": "never",
    "stylus/pythonic": "always",
    "stylus/selector-list-comma": "never",
    "stylus/semicolon": "never",
    "stylus/single-line-comment": "always",
  }
}
```

## :arrow_heading_up: RuleSets

This plugin provides some rulesets. It can be used by specifying it in the [`extends` of the stylelint configuration](https://stylelint.io/user-guide/configure#extends).

- `"stylelint-plugin-stylus/recommended"` ... Turns Off rules that cannot be used with the Stylus within `stylelint` (WIP). And turns On rules that possible errors rules within `stylelint-plugin-stylus`.
- `"stylelint-plugin-stylus/standard"` ... Above, plus rules to improve code readability.

## :white_check_mark: Rules

You can use [the rules built into stylelint](https://stylelint.io/user-guide/rules/list) and the rules provided by this plugin.

The `--fix` option on the [command line](https://stylelint.io/user-guide/usage/options#fix) automatically fixes problems reported by rules which have a wrench :wrench: below.

<!--RULES_TABLE_START-->

### Possible Errors Rules

These rules relate to possible syntax or logic errors in Stylus.

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [stylus/at-rule-no-unknown](./rules/at-rule-no-unknown.md) | disallow unknown at-rules. |
|  | [stylus/property-no-unknown](./rules/property-no-unknown.md) | disallow unknown properties. |
|  | [stylus/selector-type-no-unknown](./rules/selector-type-no-unknown.md) | disallow unknown type selectors. |
|  | [stylus/single-line-comment-no-empty](./rules/single-line-comment-no-empty.md) | disallow empty single-line comments. |

### Standard Rules

These rules relate to style guidelines.

|    | Rule ID | Description |
|:---|:--------|:------------|
| :wrench: | [stylus/at-rule-empty-line-before](./rules/at-rule-empty-line-before.md) | require or disallow an empty line before at-rules. |
| :wrench: | [stylus/at-rule-name-space-after](./rules/at-rule-name-space-after.md) | require a single space after at-rule names. |
| :wrench: | [stylus/block-closing-brace-empty-line-before](./rules/block-closing-brace-empty-line-before.md) | require or disallow an empty line before the closing brace of blocks. |
| :wrench: | [stylus/block-closing-brace-newline-after](./rules/block-closing-brace-newline-after.md) | require a newline or disallow whitespace after the closing brace of blocks. |
| :wrench: | [stylus/block-closing-brace-newline-before](./rules/block-closing-brace-newline-before.md) | require a newline or disallow whitespace before the closing brace of blocks. |
| :wrench: | [stylus/block-closing-brace-space-before](./rules/block-closing-brace-space-before.md) | require a single space or disallow whitespace before the closing brace of blocks. |
| :wrench: | [stylus/block-opening-brace-newline-after](./rules/block-opening-brace-newline-after.md) | require a newline after the opening brace of blocks. |
| :wrench: | [stylus/block-opening-brace-space-after](./rules/block-opening-brace-space-after.md) | require a single space or disallow whitespace after the opening brace of blocks. |
| :wrench: | [stylus/block-opening-brace-space-before](./rules/block-opening-brace-space-before.md) | require a single space or disallow whitespace before the opening brace of blocks. |
| :wrench: | [stylus/color-hex-case](./rules/color-hex-case.md) | enforce lowercase or uppercase for hex colors. |
| :wrench: | [stylus/declaration-colon](./rules/declaration-colon.md) | require or disallow declaration colons. |
| :wrench: | [stylus/indentation](./rules/indentation.md) | enforces indentation. |
| :wrench: | [stylus/number-leading-zero](./rules/number-leading-zero.md) | require or disallow a leading zero for fractional numbers less than 1. |
| :wrench: | [stylus/number-no-trailing-zeros](./rules/number-no-trailing-zeros.md) | disallow trailing zeros in numbers. |
| :wrench: | [stylus/pythonic](./rules/pythonic.md) | enforces pythonic or brace style. |
| :wrench: | [stylus/selector-list-comma-newline-after](./rules/selector-list-comma-newline-after.md) | require a newline whitespace after the commas of selector lists. |
| :wrench: | [stylus/selector-list-comma-space-before](./rules/selector-list-comma-space-before.md) | require a single space or disallow whitespace before the commas of selector lists. |
| :wrench: | [stylus/selector-list-comma](./rules/selector-list-comma.md) | require or disallow selector list comma. |
| :wrench: | [stylus/selector-pseudo-class-case](./rules/selector-pseudo-class-case.md) | enforce lowercase or uppercase for pseudo-class selectors. |
| :wrench: | [stylus/semicolon](./rules/semicolon.md) | require or disallow semicolon. |
| :wrench: | [stylus/single-line-comment-double-slash-space-after](./rules/single-line-comment-double-slash-space-after.md) | require or disallow whitespace after the double-slash of single-line comments. |
| :wrench: | [stylus/single-line-comment](./rules/single-line-comment.md) | enforces comment style where single-line comments are allowed. |

<!--RULES_TABLE_END-->

## License

See the [LICENSE] file for license rights and limitations (MIT).

[license]: ./LICENSE
[stylelint]: https://stylelint.io/
[Stylus]: https://stylus-lang.com/
[VSCode extension]: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
[postcss-styl]: https://github.com/ota-meshi/postcss-styl
[npm]: https://www.npmjs.com/
[npm license]: https://img.shields.io/npm/l/stylelint-plugin-stylus.svg
[npm version]: https://img.shields.io/npm/v/stylelint-plugin-stylus.svg
[npm downloads]: https://img.shields.io/npm/dw/stylelint-plugin-stylus.svg
[Build Status]: https://github.com/ota-meshi/stylelint-plugin-stylus/workflows/CI/badge.svg?branch=master
