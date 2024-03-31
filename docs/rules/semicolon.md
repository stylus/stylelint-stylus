# stylus/semicolon

> require or disallow semicolon.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"never"`)
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

```styl
/* stylelint rules config: {"stylus/semicolon": "always"} */
a
  // ✓ GOOD
  color red;
  // ✗ BAD
  color red
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/semicolon": "never"} */
a
  // ✓ GOOD
  color red
  // ✗ BAD
  color red;
```

## :couple: Related rules

- [declaration-block-trailing-semicolon]

## :books: Further reading

- [Stylus - Features]

[declaration-block-trailing-semicolon]: https://stylelint.io/user-guide/rules/declaration-block-trailing-semicolon
[Stylus - Features]: https://stylus-lang.com/#features

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/semicolon.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/semicolon.js)
