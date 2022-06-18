# stylus/number-no-trailing-zeros

> disallow trailing zeros in numbers.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `true`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports trailing zeros in numbers.

## :question: Why Not Use `stylelint` Rule

The [number-no-trailing-zeros] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that range operator of the Stylus.  
The `stylus/number-no-trailing-zeros` rule understands that range operator of the Stylus.

## :wrench: Options

See [stylelint - number-no-trailing-zeros - Options](https://stylelint.io/user-guide/rules/number-no-trailing-zeros#options).

## :couple: Related rules

- [number-no-trailing-zeros]

[number-no-trailing-zeros]: https://stylelint.io/user-guide/rules/number-no-trailing-zeros

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/number-no-trailing-zeros.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/number-no-trailing-zeros.js)
