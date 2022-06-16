# stylus/block-closing-brace-empty-line-before

> require or disallow an empty line before the closing brace of blocks.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"never"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow an empty line before the closing brace of blocks.

## :question: Why Not Use `stylelint` Rule

The [block-closing-brace-empty-line-before] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit braces in Stylus.  
The `stylus/block-closing-brace-empty-line-before` rule understands that can omit braces in Stylus.

## :wrench: Options

See [stylelint - block-closing-brace-empty-line-before - Options](https://stylelint.io/user-guide/rules/block-closing-brace-empty-line-before#options).

## :couple: Related rules

- [block-closing-brace-empty-line-before]

[block-closing-brace-empty-line-before]: https://stylelint.io/user-guide/rules/block-closing-brace-empty-line-before

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/block-closing-brace-empty-line-before.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/block-closing-brace-empty-line-before.js)
