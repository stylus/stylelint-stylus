# stylus/selector-list-comma

> require or disallow selector list comma.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"never"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow selector list comma.

## :wrench: Options

```json
{
  "stylus/selector-list-comma": ["always" | "never"]
}
```

- `"always"` ... Requires comma.
- `"never"` ... Disallows comma.

### `"always"`

```styl
/* stylelint rules config: {"stylus/selector-list-comma": "always"} */
// ✓ GOOD
.foo,
.bar
  color red

// ✗ BAD
.foo
.bar
  color red
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/selector-list-comma": "never"} */
// ✓ GOOD
.foo
.bar
  color red

// ✗ BAD
.foo,
.bar
  color red
```

## :books: Further reading

- [Stylus - SELECTORS - Rule Sets]
- [Stylus - Features]

[Stylus - Features]: https://stylus-lang.com/#features
[Stylus - SELECTORS - Rule Sets]: https://stylus-lang.com/docs/selectors.html#rule-sets

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/selector-list-comma.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/selector-list-comma.js)
