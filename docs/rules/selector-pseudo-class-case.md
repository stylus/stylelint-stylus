# stylus/selector-pseudo-class-case

> enforce lowercase or uppercase for pseudo-class selectors.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"lower"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforce lowercase or uppercase for hex colors.

## :question: Why Not Use `stylelint` Rule

The [selector-pseudo-class-case] rule correctly report errors in Stylus, but breaks the syntax in autofix.  
This problem is that the core rules do not understand selector of the Stylus.  
The `stylus/selector-pseudo-class-case` rule understands selector of the Stylus.

## :wrench: Options

See [stylelint - selector-pseudo-class-case - Options](https://stylelint.io/user-guide/rules/selector-pseudo-class-case#options).

## :couple: Related rules

- [selector-pseudo-class-case]

[selector-pseudo-class-case]: https://stylelint.io/user-guide/rules/selector-pseudo-class-case
[postcss-styl]: https://github.com/stylus/postcss-styl

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/selector-pseudo-class-case.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/selector-pseudo-class-case.js)
