# stylus/at-extend-style

> enforces `@extend` style.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"@extend"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces [@extend] style.

## :wrench: Options

```json
{
  "stylus/at-extend-style": ["@extend" | "@extends"]
}
```

- `"@extend"` ... Requires `@extend` instead of `@extends`.
- `"@extends"` ... Requires `@extends` instead of `@extend`.

### `""@extend"`

<stylelint-code-block fix :rules="{ 'stylus/at-extend-style': '@extend' }">

```styl
a
  // ✓ GOOD
  @extend .foo;


a
  // ✗ BAD
  @extends .foo;
```

</stylelint-code-block>

### `"@extends"`

<stylelint-code-block fix :rules="{ 'stylus/at-extend-style': '@extends' }">

```styl
a
  // ✓ GOOD
  @extends .foo;


a
  // ✗ BAD
  @extend .foo;
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - @EXTEND]

[Stylus - @EXTEND]: https://stylus-lang.com/docs/extend.html
[@extend]: https://stylus-lang.com/docs/extend.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/at-extend-style.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/at-extend-style.js)
