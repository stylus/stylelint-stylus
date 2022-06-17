# stylus/at-rule-empty-line-before

> require or disallow an empty line before at-rules.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `["always",{"except":["blockless-after-same-name-blockless","first-nested"],"ignore":["after-comment"]}]`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow an empty line before at-rules.

## :wrench: Options

See [stylelint - at-rule-empty-line-before - Options](https://stylelint.io/user-guide/rules/at-rule-empty-line-before#options).

## :question: Why Not Use `stylelint` Rule

The [at-rule-empty-line-before] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand the [postcss-styl] AST.  
The `stylus/at-rule-empty-line-before` rule understands [postcss-styl] AST.

## :couple: Related rules

- [at-rule-empty-line-before]

[at-rule-empty-line-before]: https://stylelint.io/user-guide/rules/at-rule-empty-line-before
[postcss-styl]: https://github.com/stylus/postcss-styl

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/lib/rules/at-rule-empty-line-before.js)
- [Test source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/tests/lib/rules/at-rule-empty-line-before.js)
