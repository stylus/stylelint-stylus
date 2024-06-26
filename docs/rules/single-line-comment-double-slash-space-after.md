# stylus/single-line-comment-double-slash-space-after

> require or disallow whitespace after the double-slash of single-line comments.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"always"`)
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
/* stylelint rules config: {"stylus/single-line-comment-double-slash-space-after": "always"} */
// ✓ GOOD
// OK
//  OK

// ✗ BAD
//NG
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/single-line-comment-double-slash-space-after": "never"} */
//✓ GOOD
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

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/single-line-comment-double-slash-space-after.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/single-line-comment-double-slash-space-after.js)
