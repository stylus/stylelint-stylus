# stylus/single-line-comment

> enforces comment style where single-line comments are allowed.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `"always"`)
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

<stylelint-code-block fix :rules="{ 'stylus/single-line-comment': 'always' }">

```styl
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

</stylelint-code-block>

### `"never"`

<stylelint-code-block fix :rules="{ 'stylus/single-line-comment': 'never' }">

```styl
/* ✓ GOOD */
/* multi line comment */
.foo { /* multi line comment */
}

// ✗ BAD
// single line comment
.foo { // single line comment
}
```

</stylelint-code-block>

## :books: Further reading

- [Stylus - COMMENTS]

[Stylus - COMMENTS]: https://stylus-lang.com/docs/comments.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/single-line-comment.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/single-line-comment.js)
