# stylus/block-closing-brace-newline-after

> require a newline or disallow whitespace after the closing brace of blocks.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require a newline or disallow whitespace after the closing brace of blocks.

## :question: Why Not Use `stylelint` Rule

The [block-closing-brace-newline-after] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit braces in Stylus.  
The `stylus/block-closing-brace-newline-after` rule understands that can omit braces in Stylus.

## :wrench: Options

See [stylelint - block-closing-brace-newline-after - Options](https://stylelint.io/user-guide/rules/block-closing-brace-newline-after#options).

## :couple: Related rules

- [block-closing-brace-newline-after]

[block-closing-brace-newline-after]: https://stylelint.io/user-guide/rules/block-closing-brace-newline-after

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/block-closing-brace-newline-after.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/block-closing-brace-newline-after.js)
