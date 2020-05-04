# stylus/selector-list-comma-space-after

> require a single space or disallow whitespace after the commas of selector lists.

- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require a single space or disallow whitespace after the commas of selector lists.

## :question: Why Not Use `stylelint` Rule

The [selector-list-comma-space-after] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that can omit commas in Stylus.  
The `stylus/selector-list-comma-space-after` rule understands that can omit commas in Stylus.

## :wrench: Options

```json
{
  "stylus/selector-list-comma-space-after": ["always" | "never" | "always-single-line" | "never-single-line"]
}
```

## :couple: Related rules

- [selector-list-comma-space-after]

[selector-list-comma-space-after]: https://stylelint.io/user-guide/rules/selector-list-comma-space-after

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/selector-list-comma-space-after.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/selector-list-comma-space-after.js)
