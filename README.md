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

## :cd: Installation

Via [npm]:
```bash
npm install --save-dev stylelint stylelint-plugin-stylus
```

## :book: Usage

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
    // "stylus/declaration-colon": ["never"]
  }
}
```

## RuleSets

This plugin provides some rulesets. It can be used by specifying it in the [`extends` of the stylelint configuration](https://stylelint.io/user-guide/configure#extends).

<!-- - `"stylelint-plugin-stylus/recommended"` ... WIP. -->
- `"stylelint-plugin-stylus/standard"` ... <!-- Above, plus --> rules to improve code readability.

## Rules

The `--fix` option on the [command line](https://stylelint.io/user-guide/usage/options#fix) automatically fixes problems reported by rules which have a wrench :wrench: below.

<!--RULES_TABLE_START-->

### Standard Rules

These rules relate to style guidelines.

|    | Rule ID | Description |
|:---|:--------|:------------|
| :wrench: | [stylus/declaration-colon](./docs/rules/declaration-colon.md) | require or disallow declaration colons. |
| :wrench: | [stylus/pythonic](./docs/rules/pythonic.md) | enforces pythonic or brace style. |
| :wrench: | [stylus/selector-list-comma](./docs/rules/selector-list-comma.md) | require or disallow selector list comma. |
| :wrench: | [stylus/semicolon](./docs/rules/semicolon.md) | require or disallow semicolon. |

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
