# stylus/no-at-require

> disallow `@require`, use `@import` instead.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `true`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces [@extend] style.

## :wrench: Options

```json
{
  "stylus/no-at-require": [true]
}
```

- `true` ... Disallow `@require`, use `@import` instead.

### `true`

```styl
/* stylelint rules config: {"stylus/no-at-require": true} */
// ✓ GOOD
@import './foo.styl'

// ✗ BAD
@require './foo.styl'
```

## :books: Further reading

- [Stylus - @IMPORT AND @REQUIRE]

[Stylus - @IMPORT AND @REQUIRE]: https://stylus-lang.com/docs/import.html

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/no-at-require.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/no-at-require.js)
