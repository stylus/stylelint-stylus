# stylus/at-rule-no-unknown

> disallow unknown at-rules.

- :gear: This rule is included in `"stylelint-plugin-stylus/recommended"` and `"stylelint-plugin-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports other than at-rules defined in the CSS specification and at-rules available in the Stylus standard.

## :wrench: Options

See [stylelint - at-rule-no-unknown - Options](https://stylelint.io/user-guide/rules/at-rule-no-unknown#options).

### `true`

```styl
// ✓ GOODs
@media (max-width: 960px) {}
@media (max-width: 960px)
  .foo
    color red
@import "reset.css"
@css {
  .foo {}
}
.foo
  @extend .bar

// ✗ BAD
@unknown {}
@unknown "foo";
@unknown
  .foo
    color red
```

## :couple: Related rules

- [at-rule-no-unknown]

[at-rule-no-unknown]: https://stylelint.io/user-guide/rules/at-rule-no-unknown

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/at-rule-no-unknown.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/at-rule-no-unknown.js)