# stylus/color-hex-case

> enforce lowercase or uppercase for hex colors.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"lower"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforce lowercase or uppercase for hex colors.

## :question: Why Not Use `stylelint` Rule

The [color-hex-case] rule correctly report errors in Stylus, but breaks the syntax in autofix.  
This problem is that the core rules do not understand the [postcss-styl] AST.  
The `stylus/color-hex-case` rule understands [postcss-styl] AST.

## :wrench: Options

See [stylelint - color-hex-case - Options](https://stylelint.io/user-guide/rules/color-hex-case#options).

## :couple: Related rules

- [color-hex-case]

[color-hex-case]: https://stylelint.io/user-guide/rules/color-hex-case
[postcss-styl]: https://github.com/stylus/postcss-styl

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/lib/rules/color-hex-case.js)
- [Test source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/tests/lib/rules/color-hex-case.js)
