# stylus/number-leading-zero

> require or disallow a leading zero for fractional numbers less than 1.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow a leading zero for fractional numbers less than 1.

## :question: Why Not Use `stylelint` Rule

The [number-leading-zero] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that range operator of the Stylus.  
The `stylus/number-leading-zero` rule understands that range operator of the Stylus.

## :wrench: Options

See [stylelint - number-leading-zero - Options](https://stylelint.io/user-guide/rules/number-leading-zero#options).

## :couple: Related rules

- [number-leading-zero]

[number-leading-zero]: https://stylelint.io/user-guide/rules/number-leading-zero

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/number-leading-zero.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/number-leading-zero.js)
