# stylus/pythonic

> enforces pythonic or brace style.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces pythonic or brace style.

## :wrench: Options

```json
{
  "stylus/pythonic": ["always" | "never", { "atblock": "always" | "never" }]
}
```

- Primary Option
  - `"always"` ... Requires pythonic style (i.e. indentation-based).
  - `"never"` ... Requires brace style.

- Secondary Option (optional)
  - `"atblock"` ... Define the style to apply with [@block].

### `"always"`

<stylelint-code-block fix :rules="{ 'stylus/pythonic': 'always' }">

```styl
// ✓ GOOD
.foo
  color: red;
bar =
  width: 20px;
  height: 20px;

// ✗ BAD
.foo {
  color: red;
}
bar = @block {
  width: 20px;
  height: 20px;
}
```

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/pythonic': 'never' }">

```styl
// ✓ GOOD
.foo {
  color: red;
}
bar = @block {
  width: 20px;
  height: 20px;
}

// ✗ BAD
.foo
  color: red;
bar =
  width: 20px;
  height: 20px;
```

</stylelint-code-block>

### `[ "always", { "atblock": "never" } ]`

<stylelint-code-block fix :rules="{ 'stylus/pythonic': ['always', { atblock: 'never' } ] }">

```styl
// ✓ GOOD
.foo
  color: red;
bar = @block {
  width: 20px;
  height: 20px;
}
// ✗ BAD
.foo {
  color: red;
}
bar =
  width: 20px;
  height: 20px;

```

</stylelint-code-block>

### `[ "never", { "atblock": "always" } ]`

<stylelint-code-block fix :rules="{ 'stylus/pythonic': [ 'never', { atblock: 'always' } ] }">

```styl
// ✓ GOOD
.foo {
  color: red;
}
bar =
  width: 20px;
  height: 20px;

// ✗ BAD
.foo
  color: red;
bar = @block {
  width: 20px;
  height: 20px;
}
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - SELECTORS - Indentation]
- [Stylus - Features]
- [Stylus - @BLOCK]

[Stylus - Features]: https://stylus-lang.com/#features
[Stylus - SELECTORS - Indentation]: https://stylus-lang.com/docs/selectors.html#indentation
[Stylus - @BLOCK]: https://stylus-lang.com/docs/block.html
[@block]: https://stylus-lang.com/docs/block.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/pythonic.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/pythonic.js)
