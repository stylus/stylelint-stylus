# stylus/declaration-colon

> require or disallow declaration colons.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"never"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow declaration colons.

## :wrench: Options

```json
{
  "stylus/declaration-colon": ["always" | "never"]
}
```

- `"always"` ... Requires one colon.
- `"never"` ... Disallows colons.

### `"always"`

<stylelint-code-block fix :rules="{ 'stylus/declaration-colon': 'always' }">

```styl
a
  // ✓ GOOD
  color: red
  // ✗ BAD
  color red
```

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/declaration-colon': 'never' }">

```styl
a
  // ✓ GOOD
  color red
  // ✗ BAD
  color: red
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - Features]

[Stylus - Features]: https://stylus-lang.com/#features

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/declaration-colon.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/declaration-colon.js)
