# stylus/single-line-comment-no-empty

> disallow empty single-line comments.

- :gear: This rule is included in `"stylelint-stylus/recommended"` and `"stylelint-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports empty single-line comments.

## :wrench: Options

```json
{
  "stylus/single-line-comment-no-empty": true
}
```

### `true`

```styl
/* stylelint rules config: {"stylus/single-line-comment-no-empty": true} */
// ✓ GOOD
// single line comment

// ✗ BAD
//
//  
```

## :couple: Related rules

- [comment-no-empty]

## :books: Further reading

- [Stylus - COMMENTS]

[comment-no-empty]: https://stylelint.io/user-guide/rules/comment-no-empty
[Stylus - COMMENTS]: https://stylus-lang.com/docs/comments.html

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-stylus/blob/main/lib/rules/single-line-comment-no-empty.js)
- [Test source](https://github.com/stylus/stylelint-stylus/blob/main/tests/lib/rules/single-line-comment-no-empty.js)
