# stylus/block-opening-brace-space-before

> require a single space or disallow whitespace before the opening brace of blocks.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"always"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require a single space or disallow whitespace before the opening brace of blocks.

## :question: Why Not Use `stylelint` Rule

The [block-opening-brace-space-before] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit braces in Stylus.  
The `stylus/block-opening-brace-space-before` rule understands that can omit braces in Stylus.

## :wrench: Options

See [stylelint - block-opening-brace-space-before - Options](https://stylelint.io/user-guide/rules/block-opening-brace-space-before#options).

## :couple: Related rules

- [block-opening-brace-space-before]

[block-opening-brace-space-before]: https://stylelint.io/user-guide/rules/block-opening-brace-space-before

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/block-opening-brace-space-before.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/block-opening-brace-space-before.js)
