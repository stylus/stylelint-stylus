# stylus/selector-type-no-unknown

> disallow unknown type selectors.

- :gear: This rule is included in `"stylelint-plugin-stylus/recommended"` and `"stylelint-plugin-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports unknown type selectors.

## :question: Why Not Use `stylelint` Rule

The [selector-type-no-unknown] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand selector of the Stylus.  
The `stylus/selector-type-no-unknown` rule understands selector of the Stylus.

## :wrench: Options

See [stylelint - selector-type-no-unknown - Options](https://stylelint.io/user-guide/rules/selector-type-no-unknown#options).

## :couple: Related rules

- [selector-type-no-unknown]

[selector-type-no-unknown]: https://stylelint.io/user-guide/rules/selector-type-no-unknown
[postcss-styl]: https://github.com/stylus/postcss-styl

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/lib/rules/selector-type-no-unknown.js)
- [Test source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/tests/lib/rules/selector-type-no-unknown.js)
