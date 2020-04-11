# stylus/single-line-comment-no-empty

> disallow empty single-line comments.

- :gear: This rule is included in `"stylelint-plugin-stylus/recommended"` and `"stylelint-plugin-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports empty single-line comments.

## :wrench: Options

```json
{
  "stylus/single-line-comment-no-empty": true
}
```

### `true`

<stylelint-code-block :rules="{ 'stylus/single-line-comment-no-empty': true }">

```styl
// ✓ GOOD
// single line comment

// ✗ BAD
//
//  
```

</stylelint-code-block>

## :couple: Related rules

- [comment-no-empty]

## :books: Further reading

- [Stylus - COMMENTS]

[comment-no-empty]: https://stylelint.io/user-guide/rules/comment-no-empty
[Stylus - COMMENTS]: https://stylus-lang.com/docs/comments.html

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/single-line-comment-no-empty.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/single-line-comment-no-empty.js)
