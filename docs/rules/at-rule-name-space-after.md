# stylus/at-rule-name-space-after

> require a single space after at-rule names.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always-single-line"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require a single space after at-rule names.

## :wrench: Options

See [stylelint - at-rule-name-space-after - Options](https://stylelint.io/user-guide/rules/at-rule-name-space-after#options).

## :question: Why Not Use `stylelint` Rule

The [at-rule-name-space-after] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand the [postcss-styl] AST.  
The `stylus/at-rule-name-space-after` rule understands [postcss-styl] AST.

## :couple: Related rules

- [at-rule-name-space-after]

[at-rule-name-space-after]: https://stylelint.io/user-guide/rules/at-rule-name-space-after
[postcss-styl]: https://github.com/ota-meshi/postcss-styl

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/at-rule-name-space-after.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/at-rule-name-space-after.js)
