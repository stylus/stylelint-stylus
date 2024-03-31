# stylus/declaration-colon

> require or disallow declaration colons.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"never"`)
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

```styl
/* stylelint rules config: {"stylus/declaration-colon": "always"} */
a
  // ✓ GOOD
  color: red
  // ✗ BAD
  color red
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/declaration-colon": "never"} */
a
  // ✓ GOOD
  color red
  // ✗ BAD
  color: red
```

## :books: Further reading

- [Stylus - Features]

[Stylus - Features]: https://stylus-lang.com/#features

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/declaration-colon.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/declaration-colon.js)
