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
- Use the [fix option] to automatically fixes the many stylistic violations.

[fix option]: https://stylelint.io/user-guide/usage/options#fix

[stylelint editor integrations](https://stylelint.io/user-guide/integrations/editor) are useful to check your code in real-time.

You can check on the [Online DEMO](https://ota-meshi.github.io/stylelint-plugin-stylus/playground/).

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
    stylelint ... --custom-syntax stylelint-plugin-stylus/custom-syntax
    ```

- with [VSCode extension]

    ```js
    {
    "stylelint.customSyntax": "stylelint-plugin-stylus/custom-syntax",
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

|    | Rule ID | Description | RuleSet |
|:---|:--------|:------------|:--------|
|  | [stylus/at-rule-no-unknown](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/at-rule-no-unknown.html) | disallow unknown at-rules. | `/recommended` |
|  | [stylus/property-no-unknown](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/property-no-unknown.html) | disallow unknown properties. | `/recommended` |
|  | [stylus/selector-type-no-unknown](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-type-no-unknown.html) | disallow unknown type selectors. | `/recommended` |
|  | [stylus/single-line-comment-no-empty](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/single-line-comment-no-empty.html) | disallow empty single-line comments. | `/recommended` |

### Standard Rules

These rules relate to style guidelines.

|    | Rule ID | Description | RuleSet |
|:---|:--------|:------------|:--------|
| :wrench: | [stylus/at-extend-style](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/at-extend-style.html) | enforces `@extend` style. | `/standard` |
| :wrench: | [stylus/at-rule-empty-line-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/at-rule-empty-line-before.html) | require or disallow an empty line before at-rules. | `/standard` |
| :wrench: | [stylus/at-rule-name-space-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/at-rule-name-space-after.html) | require a single space after at-rule names. | `/standard` |
| :wrench: | [stylus/block-closing-brace-empty-line-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-closing-brace-empty-line-before.html) | require or disallow an empty line before the closing brace of blocks. | `/standard` |
| :wrench: | [stylus/block-closing-brace-newline-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-closing-brace-newline-after.html) | require a newline or disallow whitespace after the closing brace of blocks. | `/standard` |
| :wrench: | [stylus/block-closing-brace-newline-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-closing-brace-newline-before.html) | require a newline or disallow whitespace before the closing brace of blocks. | `/standard` |
|  | [stylus/block-closing-brace-space-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-closing-brace-space-after.html) | require a single space or disallow whitespace after the closing brace of blocks. |  |
| :wrench: | [stylus/block-closing-brace-space-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-closing-brace-space-before.html) | require a single space or disallow whitespace before the closing brace of blocks. | `/standard` |
| :wrench: | [stylus/block-opening-brace-newline-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-opening-brace-newline-after.html) | require a newline after the opening brace of blocks. | `/standard` |
| :wrench: | [stylus/block-opening-brace-space-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-opening-brace-space-after.html) | require a single space or disallow whitespace after the opening brace of blocks. | `/standard` |
| :wrench: | [stylus/block-opening-brace-space-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/block-opening-brace-space-before.html) | require a single space or disallow whitespace before the opening brace of blocks. | `/standard` |
| :wrench: | [stylus/color-hex-case](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/color-hex-case.html) | enforce lowercase or uppercase for hex colors. | `/standard` |
| :wrench: | [stylus/declaration-colon](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/declaration-colon.html) | require or disallow declaration colons. | `/standard` |
| :wrench: | [stylus/hash-object-property-comma](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/hash-object-property-comma.html) | require or disallow commas in hash object properties. | `/standard` |
| :wrench: | [stylus/indentation](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/indentation.html) | enforces indentation. | `/standard` |
| :wrench: | [stylus/media-feature-colon](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/media-feature-colon.html) | require or disallow media feature colons. | `/standard` |
| :wrench: | [stylus/no-at-require](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/no-at-require.html) | disallow `@require`, use `@import` instead. | `/standard` |
| :wrench: | [stylus/no-eol-whitespace](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/no-eol-whitespace.html) | disallow end-of-line whitespace. | `/standard` |
| :wrench: | [stylus/number-leading-zero](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/number-leading-zero.html) | require or disallow a leading zero for fractional numbers less than 1. | `/standard` |
| :wrench: | [stylus/number-no-trailing-zeros](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/number-no-trailing-zeros.html) | disallow trailing zeros in numbers. | `/standard` |
| :wrench: | [stylus/pythonic](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/pythonic.html) | enforces pythonic or brace style. | `/standard` |
| :wrench: | [stylus/selector-list-comma-newline-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-list-comma-newline-after.html) | require a newline or disallow whitespace after the commas of selector lists. | `/standard` |
| :wrench: | [stylus/selector-list-comma-newline-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-list-comma-newline-before.html) | require a newline or disallow whitespace before the commas of selector lists. |  |
| :wrench: | [stylus/selector-list-comma-space-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-list-comma-space-after.html) | require a single space or disallow whitespace after the commas of selector lists. |  |
| :wrench: | [stylus/selector-list-comma-space-before](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-list-comma-space-before.html) | require a single space or disallow whitespace before the commas of selector lists. | `/standard` |
| :wrench: | [stylus/selector-list-comma](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-list-comma.html) | require or disallow selector list comma. | `/standard` |
| :wrench: | [stylus/selector-pseudo-class-case](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/selector-pseudo-class-case.html) | enforce lowercase or uppercase for pseudo-class selectors. | `/standard` |
| :wrench: | [stylus/semicolon](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/semicolon.html) | require or disallow semicolon. | `/standard` |
| :wrench: | [stylus/single-line-comment-double-slash-space-after](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/single-line-comment-double-slash-space-after.html) | require or disallow whitespace after the double-slash of single-line comments. | `/standard` |
| :wrench: | [stylus/single-line-comment](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/single-line-comment.html) | enforces comment style where single-line comments are allowed. | `/standard` |

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
