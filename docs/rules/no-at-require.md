# stylus/no-at-require

> disallow `@require`, use `@import` instead.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `true`)
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

<stylelint-code-block fix :rules="{ 'stylus/no-at-require': true }">

```styl
// ✓ GOOD
@import './foo.styl'

// ✗ BAD
@require './foo.styl'
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - @IMPORT AND @REQUIRE]

[Stylus - @IMPORT AND @REQUIRE]: https://stylus-lang.com/docs/import.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/no-at-require.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/no-at-require.js)
