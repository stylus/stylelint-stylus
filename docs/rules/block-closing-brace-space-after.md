# stylus/block-closing-brace-space-after

> require a single space or disallow whitespace after the closing brace of blocks.

## :book: Rule Details

This rule require a single space or disallow whitespace after the closing brace of blocks.

## :question: Why Not Use `stylelint` Rule

The [block-closing-brace-space-after] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit braces in Stylus.  
The `stylus/block-closing-brace-space-after` rule understands that can omit braces in Stylus.

## :wrench: Options

See [stylelint - block-closing-brace-space-after - Options](https://stylelint.io/user-guide/rules/block-closing-brace-space-after#options).

## :couple: Related rules

- [block-closing-brace-space-after]

[block-closing-brace-space-after]: https://stylelint.io/user-guide/rules/block-closing-brace-space-after

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/block-closing-brace-space-after.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/block-closing-brace-space-after.js)
