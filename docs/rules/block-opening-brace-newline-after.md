# stylus/block-opening-brace-newline-after

> require a newline after the opening brace of blocks.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always-multi-line"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require a newline after the opening brace of blocks.

## :question: Why Not Use `stylelint` Rule

The [block-opening-brace-newline-after] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit braces in Stylus.  
The `stylus/block-opening-brace-newline-after` rule understands that can omit braces in Stylus.

## :wrench: Options

See [stylelint - block-opening-brace-newline-after - Options](https://stylelint.io/user-guide/rules/block-opening-brace-newline-after#options).

## :couple: Related rules

- [block-opening-brace-newline-after]

[block-opening-brace-newline-after]: https://stylelint.io/user-guide/rules/block-opening-brace-newline-after

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/lib/rules/block-opening-brace-newline-after.js)
- [Test source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/tests/lib/rules/block-opening-brace-newline-after.js)
