# stylus/selector-list-comma-newline-before

> require a newline or disallow whitespace before the commas of selector lists.

- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require a newline whitespace before the commas of selector lists.

## :question: Why Not Use `stylelint` Rule

The [selector-list-comma-newline-before] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit commas in Stylus.  
The `stylus/selector-list-comma-newline-before` rule understands that can omit commas in Stylus.

## :wrench: Options

```json
{
  "stylus/selector-list-comma-newline-before": ["always" | "always-multi-line" | "never-multi-line"]
}
```

## :couple: Related rules

- [selector-list-comma-newline-before]

[selector-list-comma-newline-before]: https://stylelint.io/user-guide/rules/selector-list-comma-newline-before

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/selector-list-comma-newline-before.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/selector-list-comma-newline-before.js)
