# stylus/at-rule-no-unknown

> disallow unknown at-rules.

- :gear: This rule is included in `"stylelint-stylus/recommended"` and `"stylelint-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports other than at-rules defined in the CSS specification and at-rules available in the Stylus standard.

## :question: Why Not Use `stylelint` Rule

The [at-rule-no-unknown] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand at-rules of the Stylus.  
The `stylus/at-rule-no-unknown` rule understands at-rules of the Stylus.

## :wrench: Options

See [stylelint - at-rule-no-unknown - Options](https://stylelint.io/user-guide/rules/at-rule-no-unknown#options).

### `true`

```styl
/* stylelint rules config: {"stylus/at-rule-no-unknown": true} */
// ✓ GOOD
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

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/at-rule-no-unknown.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/at-rule-no-unknown.js)
