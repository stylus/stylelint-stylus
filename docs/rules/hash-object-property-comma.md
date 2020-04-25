# stylus/hash-object-property-comma

> require or disallow commas in hash object properties.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `["always",{"trailing":"never"}]`)
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

<stylelint-code-block fix :rules="{ 'stylus/hash-object-property-comma': 'always' }">

```styl
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

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/hash-object-property-comma': 'never' }">

```styl
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

</stylelint-code-block>

### `[ "always", { "trailing": "never" } ]`

<stylelint-code-block fix :rules="{ 'stylus/hash-object-property-comma': [ 'always', { trailing: 'never' } ] }">

```styl
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

</stylelint-code-block>

## :books: Further reading

- [Stylus - HASHES]

[Stylus - HASHES]: https://stylus-lang.com/docs/hashes.html
[hash object]: https://stylus-lang.com/docs/hashes.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/hash-object-property-comma.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/hash-object-property-comma.js)
