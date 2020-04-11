# stylus/semicolon

> require or disallow semicolon.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"never"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow semicolons.

## :wrench: Options

```json
{
  "stylus/semicolon": ["always" | "never"]
}
```

- `"always"` ... Requires semicolon.
- `"never"` ... Disallows semicolons.

### `"always"`

<stylelint-code-block fix :rules="{ 'stylus/semicolon': 'always' }">

```styl
a
  // ✓ GOOD
  color red;
  // ✗ BAD
  color red
```

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/semicolon': 'never' }">

```styl
a
  // ✓ GOOD
  color red
  // ✗ BAD
  color red;
```

</stylelint-code-block>

## :couple: Related rules

- [declaration-block-trailing-semicolon]

## :books: Further reading

- [Stylus - Features]

[declaration-block-trailing-semicolon]: https://stylelint.io/user-guide/rules/declaration-block-trailing-semicolon
[Stylus - Features]: https://stylus-lang.com/#features

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/semicolon.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/semicolon.js)
