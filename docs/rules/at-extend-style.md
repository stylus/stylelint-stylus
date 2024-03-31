# stylus/at-extend-style

> enforces `@extend` style.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"@extend"`)
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

```styl
/* stylelint rules config: {"stylus/at-extend-style": "@extend"} */
a
  // ✓ GOOD
  @extend .foo;


a
  // ✗ BAD
  @extends .foo;
```

### `"@extends"`

```styl
/* stylelint rules config: {"stylus/at-extend-style": "@extends"} */
a
  // ✓ GOOD
  @extends .foo;


a
  // ✗ BAD
  @extend .foo;
```

## :books: Further reading

- [Stylus - @EXTEND]

[Stylus - @EXTEND]: https://stylus-lang.com/docs/extend.html
[@extend]: https://stylus-lang.com/docs/extend.html

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/at-extend-style.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/at-extend-style.js)
