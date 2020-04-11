# stylus/selector-list-comma

> require or disallow selector list comma.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"never"`)
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

<stylelint-code-block fix :rules="{ 'stylus/selector-list-comma': 'always' }">

```styl
// ✓ GOOD
.foo,
.bar
  color red

// ✗ BAD
.foo
.bar
  color red
```

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/selector-list-comma': 'never' }">

```styl
// ✓ GOOD
.foo
.bar
  color red

// ✗ BAD
.foo,
.bar
  color red
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - SELECTORS - Rule Sets]
- [Stylus - Features]

[Stylus - Features]: https://stylus-lang.com/#features
[Stylus - SELECTORS - Rule Sets]: https://stylus-lang.com/docs/selectors.html#rule-sets

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/selector-list-comma.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/selector-list-comma.js)
