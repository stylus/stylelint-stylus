# stylus/hash-object-property-comma

> require or disallow commas in hash object properties.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `["always",{"trailing":"never"}]`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow commas in [hash object] properties.

## :wrench: Options

```json
{
  "stylus/hash-object-property-comma": ["always" | "never",
    {
      "trailing": "always" | "never"
    }
  ]
}
```

- Primary Option
  - `"always"` ... Requires comma.
  - `"never"` ... Disallows comma.

- Secondary Option (optional)
  - `"trailing"` ... Defines the style apply to the trailing comma.

### `"always"`

```styl
/* stylelint rules config: {"stylus/hash-object-property-comma": "always"} */
// ✓ GOOD
foo = {
  bar: baz,
  baz: raz,
}
foo = { bar: baz, baz: raz, }

// ✗ BAD
foo = {
  bar: baz
  baz: raz
}
foo = { bar: baz, baz: raz }
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/hash-object-property-comma": "never"} */
// ✓ GOOD
foo = {
  bar: baz
  baz: raz
}
foo = { bar: baz, baz: raz }

// ✗ BAD
foo = {
  bar: baz,
  baz: raz
}
foo = { bar: baz, baz: raz, }
```

### `[ "always", { "trailing": "never" } ]`

```styl
/* stylelint rules config: {"stylus/hash-object-property-comma": ["always", { "trailing": "never" }]} */
// ✓ GOOD
foo = {
  bar: baz,
  baz: raz
}
foo = { bar: baz, baz: raz }

// ✗ BAD
foo = {
  bar: baz
  baz: raz
}
foo = {
  bar: baz,
  baz: raz,
}
foo = { bar: baz, baz: raz, }
```

## :books: Further reading

- [Stylus - HASHES]

[Stylus - HASHES]: https://stylus-lang.com/docs/hashes.html
[hash object]: https://stylus-lang.com/docs/hashes.html

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/hash-object-property-comma.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/hash-object-property-comma.js)
