# stylus/media-feature-colon

> require or disallow media feature colons.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"never"`)
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

<stylelint-code-block fix :rules="{ 'stylus/media-feature-colon': 'always' }">

```styl
// ✓ GOOD
@media (min-width: 600px)
  padding 20px

// ✗ BAD
@media (min-width 600px)
  padding 20px
```

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/media-feature-colon': 'never' }">

```styl
// ✓ GOOD
@media (min-width 600px)
  padding 20px

// ✗ BAD
@media (min-width: 600px)
  padding 20px
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - Features]

[Stylus - Features]: https://stylus-lang.com/#features

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/media-feature-colon.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/media-feature-colon.js)
