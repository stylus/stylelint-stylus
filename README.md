<h1 align="center">stylelint-stylus</h1>

<p align="center"><a href="https://stylelint.io/" alt="Stylelint">Stylelint</a> plugin for <a href="https://stylus-lang.com/" alt="Stylus">Stylus</a>.

<p align="center"><b><i>This plugin is still in an experimental state</i></b></p>

<p align="center">
  <a href="https://www.npmjs.com/package/stylelint-stylus">
    <img src="https://img.shields.io/npm/l/stylelint-stylus.svg" alt="NPM license">
  </a>
  <a href="https://www.npmjs.com/package/stylelint-stylus">
    <img src="https://img.shields.io/npm/v/stylelint-stylus.svg" alt="NPM version">
  </a>
  <a href="https://www.npmjs.com/package/stylelint-stylus">
    <img src="https://img.shields.io/npm/dw/stylelint-stylus.svg" alt="NPM downloads">
  </a>
  <a href="https://github.com/stylus/stylelint-stylus/actions?query=workflow%3ACI">
    <img src="https://github.com/stylus/stylelint-stylus/workflows/CI/badge.svg?branch=main" alt="Build Status">
  </a>
</p>
<br>

## :name_badge: Introduction

[Stylelint] plugin for [Stylus].

This plugin allows us to check the [Stylus] with [Stylelint].

- Finds the many wrong use of selector, declaration, at-rule and more using the rules of [Stylelint].
- Finds the violations in coding style for [Stylus].
- Use the [fix option] to automatically fixes the many stylistic violations.

[fix option]: https://stylelint.io/user-guide/usage/options#fix

[Stylelint editor integrations](https://stylelint.io/user-guide/integrations/editor) are useful to check your code in real-time.

You can check on the [Online DEMO](https://stylus.github.io/stylelint-stylus/playground/).

## :cd: Installation

Via [npm]:

```bash
npm install --save-dev stylelint stylelint-stylus
```

## :book: Usage

`stylelint-stylus` is a plugin for [Stylelint], so it is for use with [Stylelint].  
If you are not using [Stylelint], start by using [Stylelint].

### Configuration

Use `.stylelintrc.*` or `stylelint.config.js` file to configure rules. See also: [https://stylelint.io/user-guide/configure](https://stylelint.io/user-guide/configure).

Example **stylelint.config.js**:

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // "stylelint-config-standard",
    "stylelint-stylus/standard",
  ],
  rules: {
    // override/add rules settings here, such as:
    // "stylus/declaration-colon": "never"
  },
};
```

If you want to set all the rules yourself, set as follows.

```js
module.exports = {
  plugins: [
    // add this plugin here:
    "stylelint-stylus",
  ],
  // makes the stylus files parseable.
  overrides: [
    {
      files: ["*.stylus", "*.styl", "**/*.stylus", "**/*.styl"],
      customSyntax: "postcss-styl",
    },
  ],
  rules: {
    // add rules settings here, such as:
    "stylus/declaration-colon": "never",
    "stylus/pythonic": "always",
    "stylus/selector-list-comma": "never",
    "stylus/semicolon": "never",
    "stylus/single-line-comment": "always",
  },
};
```

## :computer: Editor integrations

### Visual Studio Code

Use the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension that [Stylelint] provides officially.

You have to configure the `stylelint.validate` option of the extension to check `.stylus` files, because the extension does not check the `*.stylus` file by default.

Example **.vscode/settings.json**:

```jsonc
{
  "stylelint.validate": [
      ...,
      // ↓ Add "stylus" language.
      "stylus"
  ]
}
```

### Custom Syntax

**If you are using stylelint v13, you need to do the following:**

Set [custom syntax](https://stylelint.io/user-guide/usage/options#customsyntax) for parsing [Stylus]. With the following setting, `.styl` and `<style lang="stylus">` are parsed by [postcss-styl].

- via CLI

  ```bash
  stylelint ... --custom-syntax stylelint-stylus/custom-syntax
  ```

- with [VSCode extension]

  ```json
  {
    "stylelint.customSyntax": "stylelint-stylus/custom-syntax",
    "stylelint.validate": [
      ...,
      // ↓ Add "stylus" language.
      "stylus"
    ]
  }
  ```

## :arrow_heading_up: RuleSets

This plugin provides some rulesets. It can be used by specifying it in the [`extends` of the Stylelint configuration](https://stylelint.io/user-guide/configure#extends).

- `"stylelint-stylus/recommended"` ... Turns Off rules that cannot be used with the Stylus within `stylelint` (WIP). And turns On rules that possible errors rules within `stylelint-stylus`.
- `"stylelint-stylus/standard"` ... Above, plus rules to improve code readability.

## :white_check_mark: Rules

You can use [the rules built into Stylelint](https://stylelint.io/user-guide/rules/list) and the rules provided by this plugin.

The `--fix` option on the [command line](https://stylelint.io/user-guide/usage/options#fix) automatically fixes problems reported by rules which have a wrench :wrench: below.

<!--RULES_TABLE_START-->

### Possible Errors Rules

These rules relate to possible syntax or logic errors in Stylus.

|    | Rule ID | Description | RuleSet |
|:---|:--------|:------------|:--------|
|  | [stylus/at-rule-no-unknown](https://stylus.github.io/stylelint-stylus/rules/at-rule-no-unknown.html) | disallow unknown at-rules. | `/recommended` |
|  | [stylus/property-no-unknown](https://stylus.github.io/stylelint-stylus/rules/property-no-unknown.html) | disallow unknown properties. | `/recommended` |
|  | [stylus/selector-type-no-unknown](https://stylus.github.io/stylelint-stylus/rules/selector-type-no-unknown.html) | disallow unknown type selectors. | `/recommended` |
|  | [stylus/single-line-comment-no-empty](https://stylus.github.io/stylelint-stylus/rules/single-line-comment-no-empty.html) | disallow empty single-line comments. | `/recommended` |

### Standard Rules

These rules relate to style guidelines.

|    | Rule ID | Description | RuleSet |
|:---|:--------|:------------|:--------|
| :wrench: | [stylus/at-extend-style](https://stylus.github.io/stylelint-stylus/rules/at-extend-style.html) | enforces `@extend` style. | `/standard` |
| :wrench: | [stylus/at-rule-empty-line-before](https://stylus.github.io/stylelint-stylus/rules/at-rule-empty-line-before.html) | require or disallow an empty line before at-rules. | `/standard` |
| :wrench: | [stylus/at-rule-name-space-after](https://stylus.github.io/stylelint-stylus/rules/at-rule-name-space-after.html) | require a single space after at-rule names. | `/standard` |
| :wrench: | [stylus/block-closing-brace-empty-line-before](https://stylus.github.io/stylelint-stylus/rules/block-closing-brace-empty-line-before.html) | require or disallow an empty line before the closing brace of blocks. | `/standard` |
| :wrench: | [stylus/block-closing-brace-newline-after](https://stylus.github.io/stylelint-stylus/rules/block-closing-brace-newline-after.html) | require a newline or disallow whitespace after the closing brace of blocks. | `/standard` |
| :wrench: | [stylus/block-closing-brace-newline-before](https://stylus.github.io/stylelint-stylus/rules/block-closing-brace-newline-before.html) | require a newline or disallow whitespace before the closing brace of blocks. | `/standard` |
|  | [stylus/block-closing-brace-space-after](https://stylus.github.io/stylelint-stylus/rules/block-closing-brace-space-after.html) | require a single space or disallow whitespace after the closing brace of blocks. |  |
| :wrench: | [stylus/block-closing-brace-space-before](https://stylus.github.io/stylelint-stylus/rules/block-closing-brace-space-before.html) | require a single space or disallow whitespace before the closing brace of blocks. | `/standard` |
| :wrench: | [stylus/block-opening-brace-newline-after](https://stylus.github.io/stylelint-stylus/rules/block-opening-brace-newline-after.html) | require a newline after the opening brace of blocks. | `/standard` |
| :wrench: | [stylus/block-opening-brace-space-after](https://stylus.github.io/stylelint-stylus/rules/block-opening-brace-space-after.html) | require a single space or disallow whitespace after the opening brace of blocks. | `/standard` |
| :wrench: | [stylus/block-opening-brace-space-before](https://stylus.github.io/stylelint-stylus/rules/block-opening-brace-space-before.html) | require a single space or disallow whitespace before the opening brace of blocks. | `/standard` |
| :wrench: | [stylus/color-hex-case](https://stylus.github.io/stylelint-stylus/rules/color-hex-case.html) | enforce lowercase or uppercase for hex colors. | `/standard` |
| :wrench: | [stylus/declaration-colon](https://stylus.github.io/stylelint-stylus/rules/declaration-colon.html) | require or disallow declaration colons. | `/standard` |
| :wrench: | [stylus/hash-object-property-comma](https://stylus.github.io/stylelint-stylus/rules/hash-object-property-comma.html) | require or disallow commas in hash object properties. | `/standard` |
| :wrench: | [stylus/indentation](https://stylus.github.io/stylelint-stylus/rules/indentation.html) | enforces indentation. | `/standard` |
| :wrench: | [stylus/media-feature-colon](https://stylus.github.io/stylelint-stylus/rules/media-feature-colon.html) | require or disallow media feature colons. | `/standard` |
| :wrench: | [stylus/no-at-require](https://stylus.github.io/stylelint-stylus/rules/no-at-require.html) | disallow `@require`, use `@import` instead. | `/standard` |
| :wrench: | [stylus/no-eol-whitespace](https://stylus.github.io/stylelint-stylus/rules/no-eol-whitespace.html) | disallow end-of-line whitespace. | `/standard` |
| :wrench: | [stylus/number-leading-zero](https://stylus.github.io/stylelint-stylus/rules/number-leading-zero.html) | require or disallow a leading zero for fractional numbers less than 1. | `/standard` |
| :wrench: | [stylus/number-no-trailing-zeros](https://stylus.github.io/stylelint-stylus/rules/number-no-trailing-zeros.html) | disallow trailing zeros in numbers. | `/standard` |
| :wrench: | [stylus/pythonic](https://stylus.github.io/stylelint-stylus/rules/pythonic.html) | enforces pythonic or brace style. | `/standard` |
| :wrench: | [stylus/selector-list-comma-newline-after](https://stylus.github.io/stylelint-stylus/rules/selector-list-comma-newline-after.html) | require a newline or disallow whitespace after the commas of selector lists. | `/standard` |
| :wrench: | [stylus/selector-list-comma-newline-before](https://stylus.github.io/stylelint-stylus/rules/selector-list-comma-newline-before.html) | require a newline or disallow whitespace before the commas of selector lists. |  |
| :wrench: | [stylus/selector-list-comma-space-after](https://stylus.github.io/stylelint-stylus/rules/selector-list-comma-space-after.html) | require a single space or disallow whitespace after the commas of selector lists. |  |
| :wrench: | [stylus/selector-list-comma-space-before](https://stylus.github.io/stylelint-stylus/rules/selector-list-comma-space-before.html) | require a single space or disallow whitespace before the commas of selector lists. | `/standard` |
| :wrench: | [stylus/selector-list-comma](https://stylus.github.io/stylelint-stylus/rules/selector-list-comma.html) | require or disallow selector list comma. | `/standard` |
| :wrench: | [stylus/selector-pseudo-class-case](https://stylus.github.io/stylelint-stylus/rules/selector-pseudo-class-case.html) | enforce lowercase or uppercase for pseudo-class selectors. | `/standard` |
| :wrench: | [stylus/semicolon](https://stylus.github.io/stylelint-stylus/rules/semicolon.html) | require or disallow semicolon. | `/standard` |
| :wrench: | [stylus/single-line-comment-double-slash-space-after](https://stylus.github.io/stylelint-stylus/rules/single-line-comment-double-slash-space-after.html) | require or disallow whitespace after the double-slash of single-line comments. | `/standard` |
| :wrench: | [stylus/single-line-comment](https://stylus.github.io/stylelint-stylus/rules/single-line-comment.html) | enforces comment style where single-line comments are allowed. | `/standard` |

<!--RULES_TABLE_END-->

## License

See the [LICENSE] file for license rights and limitations (MIT).

[license]: ./LICENSE
[stylelint]: https://stylelint.io/
[stylus]: https://stylus-lang.com/
[vscode extension]: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
[postcss-styl]: https://github.com/stylus/postcss-styl
[npm]: https://www.npmjs.com/
[npm license]: https://img.shields.io/npm/l/stylelint-stylus.svg
[npm version]: https://img.shields.io/npm/v/stylelint-stylus.svg
[npm downloads]: https://img.shields.io/npm/dw/stylelint-stylus.svg
[build status]: https://github.com/stylus/stylelint-stylus/workflows/CI/badge.svg?branch=main
