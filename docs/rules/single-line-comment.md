# stylus/single-line-comment

> enforces comment style where single-line comments are allowed.

- :gear: This rule is included in `"stylelint-stylus/standard"`. (options: `"always"`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces comment style where single-line comments are allowed.

## :wrench: Options

```json
{
  "stylus/single-line-comment": ["always" | "never"]
}
```

- `"always"` ... Requires single-line comments.
- `"never"` ... Disallows single-line comments.

### `"always"`

```styl
/* stylelint rules config: {"stylus/single-line-comment": "always"} */
// ✓ GOOD
// single line comment
.foo { // single line comment
}
.bar {
/* not eol comment */ }
/*
 * multi
 * line
 * comment
 */
/*! buffered */

/* ✗ BAD */
/* multi line comment, but a single line. */
/*
  multi-line comment, but the content is a single line.
*/
.foo { /* multi line comment, but a single line. */
}
```

### `"never"`

```styl
/* stylelint rules config: {"stylus/single-line-comment": "never"} */
/* ✓ GOOD */
/* multi line comment */
.foo { /* multi line comment */
}

// ✗ BAD
// single line comment
.foo { // single line comment
}
```

## :books: Further reading

- [Stylus - COMMENTS]

[Stylus - COMMENTS]: https://stylus-lang.com/docs/comments.html

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/single-line-comment.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/single-line-comment.js)
