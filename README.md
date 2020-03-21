# stylelint-plugin-stylus

[stylelint] plugin for [Stylus].

:::
**_This plugin is still in an experimental state_**
:::

## :cd: Installation

Via [npm]:
```bash
npm install --save-dev stylelint stylelint-plugin-stylus
```

## :book: Usage

### Custom Syntax

Set [custom syntax](https://stylelint.io/user-guide/usage/options#customsyntax) to parses [Stylus]. By this, [Stylus] parses by [postcss-styl].


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
- `"stylelint-plugin-stylus/standard"` ... Above, plus rules to improve code readability.

## Rules

The `--fix` option on the [command line](https://stylelint.io/user-guide/usage/options#fix) automatically fixes problems reported by rules which have a wrench :wrench: below.

<!--RULES_TABLE_START-->

### Standard Rules

These rules relate to style guidelines.

|    | Rule ID | Description |
|:---|:--------|:------------|
| :wrench: | [stylus/declaration-colon](./docs/rules/declaration-colon.md) | requires or disallows declaration colons. |
| :wrench: | [stylus/semicolon](./docs/rules/semicolon.md) | requires or disallows semicolon. |

<!--RULES_TABLE_END-->

## License

See the [LICENSE] file for license rights and limitations (MIT).

[license]: ./LICENSE
[stylelint]: https://stylelint.io/
[Stylus]: https://stylus-lang.com/
[VSCode extension]: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
[postcss-styl]: https://github.com/ota-meshi/postcss-styl
[npm]: https://www.npmjs.com/