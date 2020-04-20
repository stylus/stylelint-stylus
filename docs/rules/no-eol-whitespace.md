# stylus/no-eol-whitespace

> disallow end-of-line whitespace.

- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow a leading zero for fractional numbers less than 1.

## :question: Why Not Use `stylelint` Rule

The [no-eol-whitespace] rule correctly report errors in Stylus, but error remains with autofix.  
This problem is that the core rules do not understand that can omit braces in Stylus.  
The `stylus/no-eol-whitespace` rule understands that can omit braces in Stylus.

## :wrench: Options

See [stylelint - no-eol-whitespace - Options](https://stylelint.io/user-guide/rules/no-eol-whitespace#options).

## :couple: Related rules

- [no-eol-whitespace]

[no-eol-whitespace]: https://stylelint.io/user-guide/rules/no-eol-whitespace

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/no-eol-whitespace.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/no-eol-whitespace.js)
