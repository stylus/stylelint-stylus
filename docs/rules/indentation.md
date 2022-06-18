# stylus/indentation

> enforces indentation.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `2`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces indentation.

## :question: Why Not Use `stylelint` Rule

The [indentation] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that `postfix` of the Stylus.  
The `stylus/indentation` rule understands that `postfix` of the Stylus.

## :wrench: Options

See [stylelint - indentation - Options](https://stylelint.io/user-guide/rules/indentation#options).

## :couple: Related rules

- [indentation]

[indentation]: https://stylelint.io/user-guide/rules/indentation

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/indentation.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/indentation.js)
