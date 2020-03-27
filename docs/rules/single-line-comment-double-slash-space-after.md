# stylus/single-line-comment-double-slash-space-after

> require or disallow whitespace after the double-slash of single-line comments.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow whitespace after the double-slash of single-line comments.

## :wrench: Options

```json
{
  "stylus/single-line-comment-double-slash-space-after": ["always" | "never"]
}
```

- `"always"` ... Requires whitespace.
- `"never"` ... Disallows whitespace.

### `"always"`

```styl
// ✓ GOOD
// OK
//  OK

// ✗ BAD
//NG
```

### `"never"`

```styl
// ✓ GOOD
//OK

// ✗ BAD
// NG
//  NG
```

## :couple: Related rules

- [comment-whitespace-inside]

## :books: Further reading

- [Stylus - COMMENTS]

[comment-whitespace-inside]: https://stylelint.io/user-guide/rules/comment-whitespace-inside
[Stylus - COMMENTS]: https://stylus-lang.com/docs/comments.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/single-line-comment-double-slash-space-after.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/single-line-comment-double-slash-space-after.js)
