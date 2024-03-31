# stylus/media-feature-colon

> require or disallow media feature colons.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"never"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow  media feature colons.

## :wrench: Options

```json
{
  "stylus/media-feature-colon": ["always" | "never"]
}
```

- `"always"` ... Requires one colon.
- `"never"` ... Disallows colons.

### `"always"`

```styl
/* stylelint rules config: {"stylus/media-feature-colon": "always"} */
// ✓ GOOD
@media (min-width: 600px)
  padding 20px

// ✗ BAD
@media (min-width 600px)
  padding 20px
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/media-feature-colon": "never"} */
// ✓ GOOD
@media (min-width 600px)
  padding 20px

// ✗ BAD
@media (min-width: 600px)
  padding 20px
```

## :books: Further reading

- [Stylus - Features]

[Stylus - Features]: https://stylus-lang.com/#features

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/media-feature-colon.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/media-feature-colon.js)
